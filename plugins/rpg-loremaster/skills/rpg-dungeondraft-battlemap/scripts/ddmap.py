#!/usr/bin/env python3
"""ddmap — toolkit para gerar mapas .dungeondraft_map (Dungeondraft 1.2.0.1).

Formato por engenharia reversa; ver references/formato.md. Regra de ouro:
sempre construir sobre um scaffold salvo pelo próprio DD (assets/scaffold...).

Unidades: todas as APIs públicas recebem CÉLULAS (floats ok); 1 célula = 256 px.
Cores: "aarrggbb". Rotações: radianos.
"""
import json
import math
import os
import struct
import copy

CELL = 256.0
SUB = 64.0          # subcélula da caverna / ponto de splat
SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_SCAFFOLD = os.path.join(SKILL_DIR, 'assets', 'scaffold.dungeondraft_map')
PCK_INDEX = os.path.join(SKILL_DIR, 'assets', 'pck_index.txt')
FA_INDEX = os.path.join(SKILL_DIR, 'assets', 'fa_pack_index.txt')
DD_PCK = '/Applications/Dungeondraft.app/Contents/Resources/Dungeondraft.pck'


def _fa_table():
    """nome-sem-extensão -> path res:// completo do pack FA (se indexado)."""
    table = {}
    if os.path.exists(FA_INDEX):
        for line in open(FA_INDEX):
            line = line.strip()
            if '/textures/' not in line or line.endswith('.import'):
                continue
            base = os.path.splitext(os.path.basename(line))[0]
            table.setdefault(base, line)
    return table


FA = _fa_table()


def fa(name):
    """Path de um asset do FA Starter Pack pelo nome (sem extensão).

    Ex.: fa('Barrel_Wood_Dark_D_1x1'), fa('Wooden_Flooring_C_Light').
    O sufixo `_NxM` no nome dos objetos é o footprint em células.
    """
    if name in FA:
        return FA[name]
    hint = [k for k in FA if name.lower() in k.lower()][:6]
    raise KeyError(f'asset FA "{name}" não existe. Parecidos: {hint}')


# ---------------------------------------------------------------- serialização
def vec(cx, cy):
    return f'Vector2( {round(cx * CELL, 2)}, {round(cy * CELL, 2)} )'


def vec_px(x, y):
    return f'Vector2( {round(x, 2)}, {round(y, 2)} )'


def pool_bytes(b):
    return 'PoolByteArray( ' + ', '.join(str(x) for x in b) + ' )'


def pool_ints(v):
    return 'PoolIntArray( ' + ', '.join(str(x) for x in v) + ' )'


def pool_vec2(flat_px):
    return 'PoolVector2Array( ' + ', '.join(str(round(v, 2)) for v in flat_px) + ' )'


def cells_to_px(pts):
    """[(cx,cy),...] -> [x,y,x,y,...] em px."""
    flat = []
    for (cx, cy) in pts:
        flat.extend([cx * CELL, cy * CELL])
    return flat


# ---------------------------------------------------------------- mapa
class DDMap:
    """Compositor de mapas. Uso típico:

        m = DDMap(width=30, height=20)
        m.cave_room(5, 5, 3, 2.5); m.cave_corridor([(5,5),(12,8)], 1.0)
        m.walls_from_cave()
        w = m.add_wall([(2,2),(8,2),(8,6),(2,6)], loop=True, texture='wood')
        m.add_door(w, seg=0, t=0.5)
        m.save('~/Documents/Meu Mapa.dungeondraft_map')
    """

    def __init__(self, width, height, scaffold=DEFAULT_SCAFFOLD, seed='6a29ef83'):
        self.w, self.h = int(width), int(height)
        self.gw, self.gh = 4 * self.w + 3, 4 * self.h + 3
        self.doc = json.load(open(os.path.expanduser(scaffold)))
        self._node = 0
        world = self.doc['world']
        world['width'], world['height'] = self.w, self.h
        world['msi']['seed'] = seed
        self.doc['header']['editor_state']['camera_position'] = vec_px(
            self.w * CELL / 2, self.h * CELL / 2)
        self.doc['header']['editor_state']['current_level'] = 0
        base = world['levels'][sorted(world['levels'].keys())[0]]
        self._level_proto = self._blank_level(base)
        world['levels'] = {'0': copy.deepcopy(self._level_proto)}
        self.levels = world['levels']
        self.level = '0'                      # nível ativo
        self._grids = {'0': self._blank_grids()}
        self._tile_lookup = {'0': {}}

    # ------------------------------------------------------------ infra
    def nid(self):
        self._node += 1
        return format(self._node, 'x')

    def _blank_grids(self):
        return {
            'cave': [[0] * self.gw for _ in range(self.gh)],
            'entr': [[0] * self.gw for _ in range(self.gh)],
            'splat': bytearray([255, 0, 0, 0] * (4 * self.w * 4 * self.h)),
            'cells': [-1] * (self.w * self.h),
            'cell_colors': ['ffffffff'] * (self.w * self.h),
        }

    def _blank_level(self, base):
        lvl = copy.deepcopy(base)
        lvl['shapes'] = {'polygons': [], 'walls': []}
        lvl['patterns'] = []
        lvl['walls'] = []
        lvl['portals'] = []
        lvl['materials'] = {}
        lvl['paths'] = []
        lvl['objects'] = []
        lvl['lights'] = []
        lvl['roofs'] = {'shade': True, 'shade_contrast': 0.5,
                        'sun_direction': 45, 'roofs': []}
        lvl['texts'] = []
        lvl['texts_vis'] = True
        lvl['water'] = {'disable_border': False}
        lvl['cave'] = {
            'bitmap': '', 'ground_color': 'ff7a6c59',
            'wall_color': 'ff3d2c18', 'entrance_bitmap': '',
            'texture': 'res://textures/caves/colorable/floor.png',
        }
        lvl['terrain'] = {
            'enabled': True, 'expand_slots': False, 'smooth_blending': False,
            'texture_1': 'res://textures/terrain/terrain_dirt.png',
            'texture_2': 'res://textures/terrain/terrain_grass.png',
            'texture_3': 'res://textures/terrain/terrain_sand.png',
            'texture_4': 'res://textures/terrain/terrain_snow.png',
            'splat': '',
        }
        lvl['environment'] = {'baked_lighting': True,
                              'ambient_light': 'ffffffff'}
        return lvl

    def add_level(self, key, label):
        """Novo andar (key sequencial em string: '1', '2'...)."""
        self.levels[key] = copy.deepcopy(self._level_proto)
        self.levels[key]['label'] = label
        self._grids[key] = self._blank_grids()
        self._tile_lookup[key] = {}
        return key

    def use_level(self, key):
        self.level = key

    @property
    def L(self):
        return self.levels[self.level]

    @property
    def G(self):
        return self._grids[self.level]

    def ambient(self, color):
        self.L['environment']['ambient_light'] = color

    # ------------------------------------------------------------ caverna
    def _stamp(self, grid, cx, cy, rx, ry=None):
        ry = ry if ry is not None else rx
        sx, sy = cx * 4 + 1, cy * 4 + 1
        srx, sry = max(rx * 4, 0.6), max(ry * 4, 0.6)
        x0, x1 = max(0, int(sx - srx) - 1), min(self.gw - 1, int(sx + srx) + 1)
        y0, y1 = max(0, int(sy - sry) - 1), min(self.gh - 1, int(sy + sry) + 1)
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                if ((x - sx) / srx) ** 2 + ((y - sy) / sry) ** 2 <= 1.0:
                    grid[y][x] = 1

    def cave_room(self, cx, cy, rx, ry=None):
        """Câmara elíptica (raios em células)."""
        self._stamp(self.G['cave'], cx, cy, rx, ry)

    def cave_corridor(self, pts, r, wobble=0.25, wavelen=3.0, phase=0.0):
        """Corredor orgânico ligando waypoints [(cx,cy),...], raio r células."""
        for i in range(len(pts) - 1):
            (ax, ay), (bx, by) = pts[i], pts[i + 1]
            seg = math.hypot(bx - ax, by - ay) or 1e-6
            px, py = -(by - ay) / seg, (bx - ax) / seg
            steps = max(2, int(seg * 8))
            for s in range(steps + 1):
                t = s / steps
                off = wobble * math.sin((t * seg + phase) * 2 * math.pi / wavelen)
                self._stamp(self.G['cave'],
                            ax + (bx - ax) * t + px * off,
                            ay + (by - ay) * t + py * off, r)
            phase += seg

    def cave_entrance_at_edge(self, cx, cy, reach=2.5):
        """Marca boca de caverna perto da borda (centro aproximado em células)."""
        scx, scy = cx * 4 + 1, cy * 4 + 1
        margin = 9
        for y in range(self.gh):
            for x in range(self.gw):
                if not self.G['cave'][y][x]:
                    continue
                near_edge = (x < margin or x >= self.gw - margin or
                             y < margin or y >= self.gh - margin)
                if near_edge and math.hypot(x - scx, y - scy) < reach * 4 + 8:
                    self.G['entr'][y][x] = 1

    def cave_colors(self, ground, wall):
        self.L['cave']['ground_color'] = ground
        self.L['cave']['wall_color'] = wall

    def carved(self, x, y):
        g = self.G['cave']
        return 0 <= x < self.gw and 0 <= y < self.gh and g[y][x] == 1

    def walls_from_cave(self, texture='stone', color='ff605f58', eps=44.0):
        """Traça o contorno da caverna como paredes (bocas na borda ficam abertas)."""
        edges = {}
        for y in range(self.gh):
            for x in range(self.gw):
                if not self.G['cave'][y][x]:
                    continue
                if y - 1 >= 0 and not self.carved(x, y - 1):
                    edges.setdefault((x, y), []).append((x + 1, y))
                if x - 1 >= 0 and not self.carved(x - 1, y):
                    edges.setdefault((x, y + 1), []).append((x, y))
                if x + 1 < self.gw and not self.carved(x + 1, y):
                    edges.setdefault((x + 1, y), []).append((x + 1, y + 1))
                if y + 1 < self.gh and not self.carved(x, y + 1):
                    edges.setdefault((x + 1, y + 1), []).append((x, y + 1))
        pending = {p: list(d) for p, d in edges.items()}
        indeg = {}
        for p, dl in pending.items():
            for d in dl:
                indeg[d] = indeg.get(d, 0) + 1
        out = []
        while any(pending.values()):
            loose = [p for p, dl in pending.items()
                     if dl and indeg.get(p, 0) < len(dl)]
            start = loose[0] if loose else next(
                p for p, dl in pending.items() if dl)
            chain, cur = [start], start
            while pending.get(cur):
                nxt = pending[cur].pop(0)
                indeg[nxt] = indeg.get(nxt, 1) - 1
                chain.append(nxt)
                cur = nxt
                if cur == start:
                    break
            simp = _douglas_peucker(chain, eps / SUB)
            if len(simp) < 2:
                continue
            loop = simp[0] == simp[-1]
            coords = simp[:-1] if loop else simp
            flat = []
            for (gx, gy) in coords:
                flat.extend([(gx - 1) * SUB, (gy - 1) * SUB])
            out.append(self._wall_node(flat, texture, color, loop, shadow=True))
        self.L['walls'].extend(out)
        return out

    # ------------------------------------------------------------ paredes/portais
    def _wall_node(self, flat_px, texture, color, loop, shadow):
        if not texture.startswith('res://'):
            texture = f'res://textures/walls/{texture}.png'
        return {
            'points': pool_vec2(flat_px),
            'texture': texture,
            'color': color,
            'loop': loop,
            'type': 0,
            'joint': 0,
            'normalize_uv': False,
            'shadow': shadow,
            'node_id': self.nid(),
            'portals': [],
        }

    def add_wall(self, pts, texture='stone', color='ff605f58', loop=False,
                 shadow=True):
        """Parede por pontos em células. Retorna o nó (p/ pendurar portas)."""
        w = self._wall_node(cells_to_px(pts), texture, color, loop, shadow)
        self.L['walls'].append(w)
        return w

    def add_room(self, x, y, rw, rh, texture='stone', color='ff605f58',
                 floor=None, floor_color='ffffffff'):
        """Sala retangular: parede em loop + piso opcional (tileset)."""
        w = self.add_wall([(x, y), (x + rw, y), (x + rw, y + rh), (x, y + rh)],
                          texture=texture, color=color, loop=True)
        if floor:
            self.paint_tiles(x, y, rw, rh, floor, floor_color)
        return w

    def _portal_node(self, wall, seg, t, texture, radius_px, closed):
        pts = [float(v) for v in
               wall['points'][wall['points'].index('(') + 1:
                              wall['points'].rindex(')')].split(',')]
        P = [(pts[i], pts[i + 1]) for i in range(0, len(pts), 2)]
        n = len(P)
        a = P[seg % n]
        b = P[(seg + 1) % n]
        dx, dy = b[0] - a[0], b[1] - a[1]
        seglen = math.hypot(dx, dy) or 1e-6
        ux, uy = dx / seglen, dy / seglen
        px_, py_ = a[0] + dx * t, a[1] + dy * t
        # wall_distance NÃO é px: é point_index + fração (0..1) do segmento
        # (Wall.ReanchorPortal: wd = idx + dist/seglen)
        return {
            'position': vec_px(px_, py_),
            'rotation': round(math.atan2(dy, dx), 4),
            'scale': 'Vector2( 1, 1 )',
            'direction': vec_px(ux, uy),
            'texture': f'res://textures/portals/{texture}.png'
                       if not texture.startswith('res://') else texture,
            'radius': round(radius_px, 2),
            'point_index': seg % n,
            'wall_id': wall['node_id'],
            'wall_distance': round((seg % n) + t, 4),
            'closed': closed,
            'node_id': self.nid(),
        }

    def add_door(self, wall, seg, t, texture='door_01', width_cells=1.0,
                 closed=True):
        """Porta no segmento `seg` da parede, em t∈(0,1) ao longo dele."""
        p = self._portal_node(wall, seg, t, texture, width_cells * CELL / 2,
                              closed)
        wall['portals'].append(p)
        return p

    def add_window(self, wall, seg, t, texture='window_01', width_cells=0.8):
        return self.add_door(wall, seg, t, texture, width_cells, closed=True)

    def add_freestanding_portal(self, cx, cy, rotation=0.0, texture='door_01',
                                width_cells=1.0, closed=False):
        """Arco/portal sem parede (level.portals)."""
        p = {
            'position': vec(cx, cy),
            'rotation': round(rotation, 4),
            'scale': 'Vector2( 1, 1 )',
            'direction': vec_px(math.cos(rotation), math.sin(rotation)),
            'texture': f'res://textures/portals/{texture}.png',
            'radius': round(width_cells * CELL / 2, 2),
            'point_index': 0,
            'wall_id': '0',
            'wall_distance': 0,
            'closed': closed,
            'node_id': self.nid(),
        }
        self.L['portals'].append(p)
        return p

    # ------------------------------------------------------------ piso
    def _lookup_idx(self, tileset):
        if not tileset.startswith('res://'):
            tileset = f'res://textures/tilesets/{tileset}.png'
        lk = self._tile_lookup[self.level]
        if tileset not in lk:
            lk[tileset] = str(len(lk))
        return int(lk[tileset])

    def paint_tiles(self, x, y, rw, rh, tileset, color='ffffffff'):
        """Piso por células inteiras no retângulo [x,x+rw)×[y,y+rh)."""
        idx = self._lookup_idx(tileset)
        for cy in range(int(y), int(y + rh)):
            for cx in range(int(x), int(x + rw)):
                if 0 <= cx < self.w and 0 <= cy < self.h:
                    self.G['cells'][cy * self.w + cx] = idx
                    self.G['cell_colors'][cy * self.w + cx] = color

    def tiles_from_cave(self, tileset='simple/tileset_cave', color='ffffffff'):
        """Piso nas células tocadas pela caverna (redundância visual útil)."""
        idx = self._lookup_idx(tileset)
        for cy in range(self.h):
            for cx in range(self.w):
                sx, sy = cx * 4 + 1, cy * 4 + 1
                if any(self.carved(sx + dx, sy + dy)
                       for dx in (0, 1) for dy in (0, 1)):
                    self.G['cells'][cy * self.w + cx] = idx
                    self.G['cell_colors'][cy * self.w + cx] = color

    def add_floor_pattern(self, rect_or_pts, texture, color='ffffffff',
                          layer=-100, tex_rotation=0):
        """Piso por pattern (alternativa robusta aos tiles). rect (x,y,w,h) ou
        polígono [(cx,cy)..]; texture = path res:// (use fa('Wooden_...')).

        layer -100 = abaixo dos objetos (100). Em 200 o piso COBRE a mobília
        (incidente real: mesa sumiu embaixo do assoalho)."""
        if isinstance(rect_or_pts, tuple) and len(rect_or_pts) == 4:
            x, y, rw, rh = rect_or_pts
            pts = [(x, y), (x + rw, y), (x + rw, y + rh), (x, y + rh)]
        else:
            pts = rect_or_pts
        return self.add_pattern(pts, color=color, texture=texture,
                                layer=layer, tex_rotation=tex_rotation)

    def add_pattern(self, pts, color='ffffffff', texture=None, layer=200,
                    outline=False, tex_rotation=0):
        """Polígono de piso livre (tapete, laje). pts em células."""
        node = {
            'position': 'Vector2( 0, 0 )',
            'shape_rotation': 0,
            'scale': 'Vector2( 1, 1 )',
            'points': pool_vec2(cells_to_px(pts)),
            'layer': layer,
            'color': color,
            'outline': outline,
            'node_id': self.nid(),
        }
        if texture:
            node['texture'] = (texture if texture.startswith('res://')
                               else f'res://textures/tilesets/{texture}.png')
            node['rotation'] = tex_rotation
        self.L['patterns'].append(node)
        return node

    # ------------------------------------------------------------ terreno
    def terrain_textures(self, t1=None, t2=None, t3=None, t4=None):
        """Troca os 4 canais (nomes curtos: 'grass' → terrain_grass)."""
        for i, t in enumerate((t1, t2, t3, t4), start=1):
            if t:
                self.L['terrain'][f'texture_{i}'] = (
                    t if t.startswith('res://')
                    else f'res://textures/terrain/terrain_{t}.png')

    def paint_terrain(self, channel, pts_or_rect, feather=1.0):
        """Pinta canal 1–4 do splat. pts_or_rect: (x,y,w,h) ou polígono [(cx,cy)..]."""
        sw, sh = 4 * self.w, 4 * self.h
        if isinstance(pts_or_rect, tuple) and len(pts_or_rect) == 4:
            x, y, rw, rh = pts_or_rect
            poly = [(x, y), (x + rw, y), (x + rw, y + rh), (x, y + rh)]
        else:
            poly = pts_or_rect
        spoly = [(px * 4, py * 4) for (px, py) in poly]
        xs = [p[0] for p in spoly]
        ys = [p[1] for p in spoly]
        x0, x1 = max(0, int(min(xs)) - 1), min(sw - 1, int(max(xs)) + 1)
        y0, y1 = max(0, int(min(ys)) - 1), min(sh - 1, int(max(ys)) + 1)
        ch = channel - 1
        splat = self.G['splat']
        for sy in range(y0, y1 + 1):
            for sx in range(x0, x1 + 1):
                if _point_in_poly(sx + 0.5, sy + 0.5, spoly):
                    base = (sy * sw + sx) * 4
                    for c in range(4):
                        splat[base + c] = 255 if c == ch else 0

    # ------------------------------------------------------------ água
    def add_water(self, pts, is_open=False, deep='ff19384e',
                  shallow='ff317c8c', blend=96.0):
        """Corpo d'água. Fechado (lago) = polígono; aberto (rio) = linha central.

        EXPERIMENTAL: na primeira vez num mundo novo, gere um teste_agua e
        confirme no DD antes de usar em mapa grande.
        """
        child = {
            'ref': self._node + 1000,
            'polygon': pool_vec2(cells_to_px(pts)),
            'join': 1, 'end': 0 if not is_open else 4,
            'is_open': bool(is_open),
            'deep_color': deep, 'shallow_color': shallow,
            'blend_distance': blend,
            'children': [],
        }
        tree = self.L['water'].get('tree')
        if not tree:
            tree = {
                'ref': 0, 'polygon': 'PoolVector2Array(  )',
                'join': 1, 'end': 0, 'is_open': False,
                'deep_color': deep, 'shallow_color': shallow,
                'blend_distance': blend, 'children': [],
            }
            self.L['water']['tree'] = tree
        tree['children'].append(child)
        return child

    # ------------------------------------------------------------ nós simples
    def add_object(self, texture, cx, cy, rot=0.0, scale=1.0, color=None,
                   layer=100, shadow=False, mirror=False, block_light=False):
        if not texture.startswith('res://'):
            texture = f'res://textures/objects/{texture}.png'
        o = {
            'position': vec(cx, cy),
            'rotation': round(rot, 4),
            'scale': f'Vector2( {scale}, {scale} )',
            'mirror': mirror,
            'texture': texture,
            'layer': layer,
            'shadow': shadow,
            'block_light': block_light,
            'node_id': self.nid(),
        }
        if color:
            o['custom_color'] = color
        self.L['objects'].append(o)
        return o

    def add_light(self, cx, cy, range_cells=3.0, intensity=0.8,
                  color='ffffc170', shadows=True, texture='soft'):
        node = {
            'position': vec(cx, cy),
            'rotation': 0,
            'range': round(range_cells, 2),
            'intensity': round(intensity, 2),
            'color': color,
            'texture': f'res://textures/lights/{texture}.png',
            'shadows': shadows,
            'node_id': self.nid(),
        }
        self.L['lights'].append(node)
        return node

    def add_path(self, pts, texture='cobble', width_px=48.0, layer=100,
                 smoothness=1, fade_in=False, fade_out=False, loop=False):
        """Estrada/trilha/escada/cerca. pts em células; texture curto ou res://."""
        if not texture.startswith('res://'):
            texture = f'res://textures/paths/{texture}.png'
        x0, y0 = pts[0]
        rel = []
        for (x, y) in pts:
            rel.extend([round((x - x0) * CELL, 2), round((y - y0) * CELL, 2)])
        node = {
            'position': vec(x0, y0),
            'rotation': 0,
            'scale': 'Vector2( 1, 1 )',
            'edit_points': pool_vec2(rel),
            'smoothness': smoothness,
            'texture': texture,
            'width': width_px,
            'layer': layer,
            'fade_in': fade_in,
            'fade_out': fade_out,
            'grow': False,
            'shrink': False,
            'loop': loop,
            'node_id': self.nid(),
        }
        self.L['paths'].append(node)
        return node

    def add_stairs(self, pts, material='stone', width_px=192.0):
        return self.add_path(pts, f'stairs_{material}', width_px, smoothness=0)

    def add_text(self, text, cx, cy, size=48, color='ffffffff',
                 bg='00000000', border='00000000'):
        node = {
            'text': text,
            'position': vec(cx, cy),
            'font_name': '',
            'font_size': size,
            'font_color': color,
            'box_shape': 0,
            'box_border_width': 0,
            'box_background_color': bg,
            'box_border_color': border,
            'node_id': self.nid(),
        }
        self.L['texts'].append(node)
        return node

    def add_roof(self, pts, style='plank_wood', width_px=256.0, rtype=0):
        """Telhado sobre polígono (células). EXPERIMENTAL — teste antes."""
        node = {
            'position': 'Vector2( 0, 0 )',
            'rotation': 0,
            'scale': 'Vector2( 1, 1 )',
            'points': pool_vec2(cells_to_px(pts)),
            'texture': f'res://textures/roofs/{style}/tiles.png',
            'width': width_px,
            'type': rtype,
            'node_id': self.nid(),
        }
        self.L['roofs']['roofs'].append(node)
        return node

    # ------------------------------------------------------------ validação/saída
    def _flush_arrays(self):
        for key, g in self._grids.items():
            lvl = self.levels[key]
            lvl['cave']['bitmap'] = pool_bytes(_pack_bits(g['cave']))
            lvl['cave']['entrance_bitmap'] = pool_bytes(_pack_bits(g['entr']))
            lvl['terrain']['splat'] = pool_bytes(g['splat'])
            lvl['tiles'] = {
                'cells': pool_ints(g['cells']),
                'colors': list(g['cell_colors']),
                'lookup': {v: k for k, v in self._tile_lookup[key].items()},
            }
        self.doc['world']['next_node_id'] = format(self._node + 10, 'x')
        self.doc['world']['next_prefab_id'] = '0'

    def validate(self):
        """Erros estruturais + texturas inexistentes. Retorna lista de problemas."""
        self._flush_arrays()
        problems = []
        idx = _load_pck_index()
        seen_ids = set()

        def scan(o, path=''):
            if isinstance(o, dict):
                if 'node_id' in o:
                    if o['node_id'] in seen_ids:
                        problems.append(
                            f'node_id duplicado: {o["node_id"]} em {path}')
                    seen_ids.add(o['node_id'])
                for k, v in o.items():
                    scan(v, f'{path}/{k}')
            elif isinstance(o, list):
                for i, v in enumerate(o):
                    scan(v, f'{path}[{i}]')
            elif isinstance(o, str) and o.startswith('res://'):
                if o.startswith('res://packs/'):
                    if FA and o.startswith('res://packs/FA30DDXY/') and \
                            o not in set(FA.values()):
                        problems.append(f'textura FA inexistente: {o} em {path}')
                    return
                if idx and o not in idx:
                    problems.append(f'textura inexistente: {o} em {path}')
        scan(self.doc)
        for t in ('header', 'world', 'mod'):
            if t not in self.doc:
                problems.append(f'top-level ausente: {t}')
        for key, lvl in self.levels.items():
            for w in lvl['walls']:
                if 'portals' not in w:
                    problems.append(f'parede sem chave portals (nível {key})')
            exp = ((self.gw * self.gh) + 7) // 8
            got = lvl['cave']['bitmap'].count(',') + 1
            if got != exp:
                problems.append(
                    f'cave bitmap nível {key}: {got} bytes, esperado {exp}')
        return problems

    def save(self, path):
        problems = self.validate()
        if problems:
            raise ValueError('Mapa inválido:\n' + '\n'.join(problems))
        path = os.path.expanduser(path)
        with open(path, 'w') as fh:
            json.dump(self.doc, fh, indent='\t', ensure_ascii=False)
        return path

    def ascii_preview(self, step=2):
        """Caverna+paredes em ASCII pra inspeção rápida (nível ativo)."""
        canvas = [[' '] * self.gw for _ in range(self.gh)]
        for y in range(self.gh):
            for x in range(self.gw):
                if self.G['cave'][y][x]:
                    canvas[y][x] = '.'
        for w in self.L['walls']:
            pts = [float(v) for v in
                   w['points'][w['points'].index('(') + 1:
                               w['points'].rindex(')')].split(',')]
            P = [(pts[i] / SUB + 1, pts[i + 1] / SUB + 1)
                 for i in range(0, len(pts), 2)]
            if w['loop']:
                P.append(P[0])
            for i in range(len(P) - 1):
                (ax, ay), (bx, by) = P[i], P[i + 1]
                steps = int(max(abs(bx - ax), abs(by - ay))) + 1
                for s in range(steps + 1):
                    t = s / steps
                    x = int(round(ax + (bx - ax) * t))
                    y = int(round(ay + (by - ay) * t))
                    if 0 <= x < self.gw and 0 <= y < self.gh:
                        canvas[y][x] = '#'
        # max-pooling por bloco step×step (senão paredes de 1px somem)
        out = []
        for by in range(0, self.gh, step):
            row = []
            for bx in range(0, self.gw, step):
                block = [canvas[y][x]
                         for y in range(by, min(by + step, self.gh))
                         for x in range(bx, min(bx + step, self.gw))]
                row.append('#' if '#' in block else
                           ('.' if '.' in block else ' '))
            out.append(''.join(row))
        return '\n'.join(out)


# ---------------------------------------------------------------- util
def _pack_bits(grid):
    bits = []
    for row in grid:
        bits.extend(row)
    out = bytearray((len(bits) + 7) // 8)
    for i, b in enumerate(bits):
        if b:
            out[i >> 3] |= 1 << (i & 7)
    return out


def _douglas_peucker(chain, eps):
    if len(chain) < 3:
        return chain
    closed = chain[0] == chain[-1]
    pts = chain[:-1] if closed else chain[:]

    def dp(points):
        if len(points) < 3:
            return points
        (ax, ay), (bx, by) = points[0], points[-1]
        dx, dy = bx - ax, by - ay
        norm = math.hypot(dx, dy) or 1.0
        idx, dmax = 0, 0.0
        for i in range(1, len(points) - 1):
            px, py = points[i]
            d = abs((px - ax) * dy - (py - ay) * dx) / norm
            if d > dmax:
                idx, dmax = i, d
        if dmax > eps:
            return dp(points[:idx + 1])[:-1] + dp(points[idx:])
        return [points[0], points[-1]]

    out = dp(pts)
    if closed:
        out.append(out[0])
    return out


def _point_in_poly(x, y, poly):
    inside = False
    n = len(poly)
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]
        xj, yj = poly[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            inside = not inside
        j = i
    return inside


_PCK_CACHE = None


def _load_pck_index():
    """Set de paths res:// válidos. Usa assets/pck_index.txt; refaz do pck se preciso."""
    global _PCK_CACHE
    if _PCK_CACHE is not None:
        return _PCK_CACHE
    paths = set()
    src = PCK_INDEX
    if not os.path.exists(src) and os.path.exists(DD_PCK):
        lines = []
        with open(DD_PCK, 'rb') as f:
            f.read(4 + 16 + 64)
            count = struct.unpack('<i', f.read(4))[0]
            for _ in range(count):
                plen = struct.unpack('<i', f.read(4))[0]
                lines.append(
                    f.read(plen).decode('utf-8', 'replace').rstrip('\x00'))
                f.read(32)
        open(src, 'w').write('\n'.join(lines))
    if os.path.exists(src):
        for line in open(src):
            line = line.strip()
            paths.add(line)
            if line.endswith('.import'):
                paths.add(line[:-7])
    _PCK_CACHE = paths
    return paths
