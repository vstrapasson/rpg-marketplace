# Catálogo de assets default do Dungeondraft

Tudo aqui existe no `Dungeondraft.pck` 1.2.0.1 (índice completo: `assets/pck_index.txt`
— valide SEMPRE contra ele antes de gravar). Prefixos: objetos
`res://textures/objects/<família>/<nome>.png`; os demais indicados em cada seção.
Packs do usuário: `res://packs/<ID>/textures/...` (só se o pack estiver ativo).

## Paredes — `res://textures/walls/<nome>.png`
stone (ff605f58) · stone_09 · stone_12 · wood (ff705e4b) · wood_02..04 ·
cobble (ff7c7c7c) · concrete · battlements · null (invisível, bloqueia visão)

## Portas/janelas — `res://textures/portals/<nome>.png`
door_00..13, door_16..21 · portcullis_01..02 · threshold_01 (soleira) · window_01..16

## Tilesets (piso por célula) — `res://textures/tilesets/<nome>.png`
simple/tileset_{brick_basketweave, brick_running, brick_worn, carpet, cave, cobble,
concrete, concrete_large, concrete_slab, cut_stone, diamond, diamond_2, herringbone,
ornate, plank_45, roman_tiles, roman_worn, sewers, straw, wood_damaged,
wood_interlaced, worn_cobble} · smart/tileset_wood_vertical · smart_double/tileset_stone

## Terrenos (splat) — `res://textures/terrain/terrain_<nome>.png`
cracked_earth, dirt, dry_grass, grass, gravel, limestone, moss, rocky, sand,
sandstone, snow, swamp, void

## Paths — `res://textures/paths/<nome>.png`
Estradas: cobble, stone, stone_09, stone_12, concrete · Escadas: stairs_stone,
stairs_stone_2, stairs_wood, stairs_wood_2 · Bordas: cliff (penhasco!), battlements ·
Cercas: log_fence, stone_fence_01..05, bone_fence_01 · Outros: rail, rail_(without_ties),
rope, rope_(thick), chain, blood_trail, shadow_(flat) (sombra/arraste/profundidade),
path_black_line, path_blender_01..04 (transições de terreno)

## Luzes — `res://textures/lights/<nome>.png`
soft (suave, padrão) · point (dura) · fragments (tremida/quebrada)

## Telhados — `res://textures/roofs/<estilo>/tiles.png`
diamond_slate_gray, flat_clay_red, plank_mossy, plank_wood, round_slate_brown,
round_slate_gray, scale_stone, thatched (sapê)

## Caverna — fixo
floor: `res://textures/caves/colorable/floor.png` (wall derivado automaticamente)

## Patterns
Sem texturas dedicadas: omita `texture` para preenchimento de cor sólida (`color`),
ou aponte para um tileset. Bom para tapetes, lajes, áreas de destaque.

## Famílias de objetos (92) — `res://textures/objects/<família>/<nome>.png`

Convenções: sufixos `_01..NN` (intervalo compactado abaixo); maioria ~256 px/célula
na escala 1. Objetos "colorable" aceitam `custom_color`.

- `activities/administration/` (37): atlas_globe_01..02, atlas_globe_gigant_03, book_01..06, candle_01..02, candle_holder_02, cloth_01..02, envelope_01..03, inker, map_01, map_table_02, map_table_big_01, paper_01..05, scroll_01..07, scroll_bowl_01..04
- `activities/bathing/` (4): bathtub_01..02, chair_bath, soap
- `activities/cooking/` (21): cutting_boards, food_carrot_05, food_chicleg_02, food_fish_01, food_greens_04, food_leek_05, food_onion_06..07, food_roots_08, oven_01..02, pan, pig_roast, pizza, potatoes, spit_roast_01..02 …
- `activities/dining/` (24): berries, big_bowl_01..05, bottle_01, cup, food_bread_01..02, food_meat_leg_03, fork, knife_01..02, pitcher, plate_01..02, saucer_01..04, spoon
- `activities/farming/` (13): beet_01..04, cabbage_01..04, root_01..03, scarecrow_01..02
- `activities/logging/` (5): log_cutter, log_pile_01..04
- `activities/mining/` (4): mine_cart_02, plank_01..02
- `activities/smithing/` (19): anvil, bellows_big, bellows_small, blacksmith_tool_01, blacksmith_tool_05_anvil, chisel, coal_bag, design_table_01..02, forge_small_01..02, furnace, grinding_wheel, hammer, mandrel, metal_bar …
- `camp/` (28): camp_bed_01..04, camp_mat_01..02, campfire_01..08, carnival_tent_01..03, hammock_01..05, tent_01..06
- `characters/seafolk/` (11): seafolk_01..11, seafolk _09..10
- `clutter/boulders/` (20): boulder_01..20
- `clutter/cavern/` (21): cave_crystals_01..10, cave_hole_01..05, stalagmites_01..06
- `clutter/clothing/` (1): sailor_hat_01
- `clutter/cobwebs/` (28): cocoon_01..02, spider_01..02, spider_dead_01..02, spider_egg_01, spiderweb_01..21
- `clutter/floor/` (26): broken_glass_01..07, broken_pottery_01..11, floor_cloth_01..05, toy_01..03
- `clutter/games/` (15): cards_01..11, chess_01..04
- `clutter/lava_rocks/` (10): rock_lava_01..10
- `clutter/rubble/` (16): rubble_01..16
- `clutter/tools/` (6): broom_01..02, pitchfork, rope_01..02, shovel
- `clutter/water/` (32): drowned_body_01..02, floating_log_01..04, flotsam_01..04, water_bottle, water_circle_01..05, waterfall_01, waterfall_color_02..09, waterfall_wave_color_10..16
- `corpses/` (16): corpse_01..16
- `creatures/` (26): bird_nest_01..05, egg_01..04, egg_big_01..04, mouse, pigeon_01..03, raven_01..04, roe_01..05
- `creatures/aquatic/` (17): fish_silhiettes, fish_underwater_01..02, fish_underwater_eel_01..02, fish_underwater_school_01..03, fish_underwater_shark_01..02, fish_underwater_whale_01, kraken_head, kraken_tentacle_01..05
- `creatures/domesticated/` (5): cat_01, cow_01, ox_01, pig_01, sheep_01
- `crime/` (4): gallows, guillotine, hanging_cage_01..02
- `decor/dungeon/` (63): bone_pile_02..06, coffin_01..06, corpse_01..02, dragon_skull_01..06, gem_pile_01..05, gold_pile_01..06, knight_01..02, monster_bones_01..06, mummy_01..02, sarcophagus_01..04, skeleton_01..08, skeleton_grave_01..04, skeleton_horse, skull_01..02 …
- `decor/floor/` (18): bear_rug, big_vase_01..02, carpet_01..06, rug_boar, rug_cow_01..02, rug_fox, rug_lizard, rug_sheep, rug_wolf, tiger_rug, vase
- `decor/gargoyles/` (8): gargoyle_01..08
- `decor/instruments/` (7): flute, harp, lute, lyre_01..02, organ, piano
- `decor/lighting/` (9): bowl_lamp_01..02, chandelier_01..02, lantern_01..02, torch_01, wall_torch_01..02
- `decor/statues/` (76): gargoyle_01..08, statue_01..08, statue__wood_08, statue_animal_stone_01..10, statue_animal_wood_01..10, statue_gargoyle_stone_01..03, statue_gargoyle_wood_01..03, statue_stone_01..13, statue_wood_01..20
- `decor/wall/` (14): deer_head, moose_head, picture_frame_01..02, trophy_boar_head, trophy_dragon_head, trophy_falcon_stand, trophy_fox_head, trophy_lizard_head, trophy_monster_head, trophy_rhino_head, trophy_skull_stand, trophy_tiger_head, trophy_wolf_head
- `dwarven_set/` (39): barrel_forge_01, dwarven_anvil, dwarven_armchair_01, dwarven_bed_double_01, dwarven_bed_single_01, dwarven_big_table_01..02, dwarven_closet_01, dwarven_forge, dwarven_hammer, dwarven_horisontal_saw, dwarven_sarcophagus, dwarven_shelf_01, dwarven_shield_rack, dwarven_suit_of_armor …
- `elven_set/` (30): elven_bed_01..02, elven_bench_01..02, elven_boat_01..02, elven_bridge_01, elven_chair_01..03, elven_harp, elven_pond, elven_rotonda, elven_sarcophagus, elven_stairs_01..02, elven_statue_01, elven_table_01..02, elven_throne_01, elven_well …
- `environment/` (48): ash_pile_01..05, burned_wood_01..04, dirt_pile_01..10, fire_01..08, smoke_01..06, snow_01..15
- `furniture/beds/` (26): bed_01..14, cradle, egypt_bed_01..02, egypt_pillow_01..02, pillow_01..07
- `furniture/broken/` (27): armchair_broken_01..03, bed_broken_01..02, chair_broken_01..05, chairleg_broken, pillar_broken_01..13, table_broken_01..03
- `furniture/chairs/` (52): arm_chair_01..05, armchair_02..03, bar_chair, bench_01..16, chair_01..05, egypt_chair_01..03, egypt_sofa_01..03, ottoman_01, round_chair_01..02, sofa_01..04, sofa_corner_01..02, sofa_sattee_01..02, throne_01..08
- `furniture/desks/` (4): desk_01..02, open_desk_01..02
- `furniture/storage/` (26): bookshelf_corner_01..09, chest_01, chest_open_01..02, merchant_shelf_01..05, small_chest_01..04, wardrobe_01..05
- `furniture/tables/` (35): bar_table, egypt_table_01..03, end_table_01..02, round_table_01..04, small_table_01..10, table_corner_stone_01..08, table_corner_wood_01..07
- `graveyard/` (22): funeral_pyre_01..04, grave_01..11, gravestone_01..07
- `hardware/gears/` (10): gears_01..10
- `hardware/toilets/` (6): toilet_01..06
- `hazards/` (28): bear_trap_01..02, blade_01..06, floor_spikes_01..02, hole_01, monster_01, pit_01, spike_pit_dungeon_01, spike_pit_wood_02, statue_trap_01..02, statue_trap_flames_01..03, tar_pit_01..06, toxic_gas_01, wall_spikes_01..02, wall_trap_01
- `infrastructure/grates/` (8): grate_01..08
- `infrastructure/pipes/` (9): pipe_01..09
- `machines/` (13): ballista_01..03, counterweight_crane, crane_01, elevator_01, machine_01, manual_conveyor, manual_conveyor_platform, mortar_01, portcullis_winch, pulley_lift, water_wheel_01
- `magic/` (27): altar_01..05, cauldron_01..04, magic_portal_01..04, standing_portal_01..05, sum_circle_01..09
- `military/blood/` (14): blood_water_stain_01..14
- `military/defense/` (6): barried_wood_01, barrier_sandbag_01..04, cheval_de_frise_01
- `military/gear/` (2): shield_01..02
- `military/machines/` (5): ballista_02, mangonel, mangonel_big, trebuchet
- `military/training/` (8): bowl_w_arrows, bowl_w_swords, target_01..06
- `military/weapons/` (17): arrow_01, arrow_tip, bow_01..02, cannon_01..02, cannonball_01..03, crossbow, sword_01..05, weapon_shelf_01..02
- `more_trees/` (33): aspen_01..04, birch_01..04, eucalyptus_01..04, j_maple_01..04, maple_tree_colorable_01..03, mossy_trunks_01..06, oak_01..04, tree_flower_01..04
- `object_ruin_debris/` (16): debris_01..15, debris_04-1
- `ships/` (46): anchor_01..03, bowsprit_01..03, capstan_01..02, hatch_01..05, mast_01..19, sail_driver_01, sail_jib_large_01..02, sail_jib_small_01..03, sail_lateen_01..06, sail_square_01..02
- `spiritual/totems/` (6): totem_01..02, totem_broken_01..04
- `stable/` (21): hay, hay_floor_01..03, hay_pile, horse_01..06, stable_01..04, trough_barn_02..04, trough_stable_02
- `statues/` (25): statue_01..25
- `structures/` (18): bucket, fireplace_01..04, flag_stand_01..05, road_sign_01..04, trap_door_01..02, well_01..02
- `structures/bridges/` (20): bridge01_downend, bridge01_middle1, bridge01_middle2, bridge01_upend, bridge02_downend, bridge02_middle1, bridge02_middle2, bridge02_upend, bridge03, bridge04, bridge05, bridge06, bridge07_corner, bridge07_middle …
- `structures/chimneys/` (6): chimney_01..06
- `structures/doors/` (37): door_00..21, fallen_door_01..14, portcullis_01..02, threshold_01
- `structures/fountains/` (12): birdbath_01..03, fountain_01..09
- `structures/garden/` (3): flower_bed_01..03
- `structures/ladders/` (5): ladder_01..05
- `structures/pillars/` (42): pillar_stone_23..42, pillar_wood_01..22
- `structures/stairs/` (29): small_steps_01, stairs_09..14, stairs_down_01..02, stairs_end_01..04, stairs_round_03..10, stairs_square_05..08, stairs_up_01..04
- `structures/sundials/` (5): sundial_01..05
- `structures/windows/` (22): window_01..16, window_15_roof, window_16_roof_stainedglass, window_17_roof, window_18_roof, window_19_broken, window_20_broken
- `supplies/barrels/` (8): barrel_01..05, giant_barrel_01..03
- `supplies/cages/` (9): cage_03..09, cage_dog_kennel_01..02
- `supplies/crates/` (10): crate_01..04, fruit_box_01..06
- `supplies/sacks/` (17): grain-sack_01..02, sack_01..15
- `swamp/` (56): mangrove_stomps_01..07, mangrove_tree_01..09, swamp_branch_01..03, swamp_flower_01..07, swamp_moss_01..07, swamp_puddle_01..10, swamp_rocks_01..06, water_stain_01..07
- `tools_alchemy/` (33): alchemy_furnace_01, alchemy_table_01..02, alchemy_tool_01..04, alembic_01..07, alembic_retort_flask_01, crystal_ball_01, crystal_generator_01, glass_case_01..02, herbs_01..06, mandragora_root_01, mixing_bowl_01, mixing_plate_01, mortar_and_pestle_, notes_01 …
- `traps/` (14): alchemical_gas_canister, animal_trap, gas_vent_trap, heavy_machinery_trap, hidden_magic_rune_trap, magic_animal_trap, mine_01..02, pressure_plate_01..02, spear_trap_01..02, statue_needle_trap, trap_trigger
- `vegetation/aquatic/` (11): reeds_01..05, waterlily_01..06
- `vegetation/fallen/` (20): dead_leaves_01..05, leaves_01..04, log_01..05, wood_burned_01..06
- `vegetation/ferns/` (6): fern_01..06
- `vegetation/flowers/` (5): flowers_01..05
- `vegetation/grass/` (26): grass_01..26
- `vegetation/mushrooms/` (19): magic_mushrooms_01..14, mushrooms_01..05
- `vegetation/roots/` (18): exposed_roots_01..10, exposed_roots_big_01..08
- `vegetation/shrubs/` (18): bush_flower_01..05, bush_green_simple_01..13
- `vegetation/thorns/` (19): thorns_01..19
- `vegetation/trees/` (33): autumn_tree_01..04, cherry_tree_01..03, dead_tree_01..03, palm_tree_01..03, pine_tree_01..04, stump_01..05, tree_big_green_01..03, tree_branch_01..03, tree_green_simple_01..04, tree_massive_green_01
- `vegetation/vines/` (13): tendrils_01..13
- `vehicles/` (12): boat_sail_01..04, cart_01..03, paddle, rowboat_01..02, wagon_wreckage_01..02
- `wizard_set/` (33): alchemy_table, arcane_clock, arcane_summoning_circle_01..03, arcane_summoning_circle_glow_01..03, brazier_01..02, cage_01..02, candle_clusters_01..04, celestial_model, celestial_rug, chained_grimoire, crystal_ball, fire_01..02, magical_brazier_01..02, mana_orb_01..02 …
## Pack Forgotten Adventures (FA30DDXY) — PRIORIZAR

O GM prefere estes aos default. Índice completo: `assets/fa_pack_index.txt`
(833 arquivos). Use o helper `fa('Nome_Sem_Extensao')` do ddmap — ele resolve o
path e valida (KeyError com sugestões se errar o nome).

- **Objetos (323, em `[FA] Asset Testing/`):** o sufixo `_NxM` é o footprint em
  células (ex. `Bar_Wood_Light_A1_5x1` = balcão de 5 células). Cobrem taverna
  (Bar_*, Table_*, Chair_*, Keg_*), cozinha, ferraria, biblioteca, masmorra
  (Cage_*, Brazier_*), acampamento (Campfire_*_Lit, Tent_*), pontes
  (Bridge01..08 — 06 é a de pedra), árvores com copas 8x9+, e 64 coloráveis
  (`colorable/`, aceitam custom_color).
- **Patterns (30):** pisos prontos — `Wooden_Flooring_C_Light`,
  `Large_Flagstone_A_02`, `Cave_Floor_A`, `Grass_A_03`, `Dirt_A_01`,
  `Rug_Texture_A`, `Water_Still_A_01` (pisos SEMPRE em layer -100 — em 200 cobrem a mobília) — e overlays de desgaste
  (`Wood_Damage_Overlay_*`). **Prefira patterns a tiles para piso** (tiles
  têm bug de render em investigação; patterns são o caminho confirmado).
- **Paths (20):** `Stairs_Wood_Light_A_Path`, `Cliff_Stone_Slate_A1..4`,
  `Carpet_*`, `Footprints_Path` (pegadas!), `Palisade_*`.
- **Tilesets (5):** Stone_Tiles/Square/Cracked, Wooden_Flooring_H/M_Light.

Mapas que usam FA exigem o pack ativo no DD do usuário (manifest no scaffold já
o referencia).
