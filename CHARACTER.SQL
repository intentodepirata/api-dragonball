1	Planeta Namek	imagen_namek.jpg	0	Planeta natal de los Namekianos. Escenario de importantes batallas y la obtención de las Dragon Balls de Namek.	
2	Planeta Tierra	imagen_tierra.jpg	0	El hogar de los terrícolas y los Guerreros Z. Ha sido atacado en varias ocasiones por enemigos poderosos.	
3	Planeta Vegeta	imagen_vegeta.jpg	1	Planeta natal de los Saiyans, destruido por Freezer. Anteriormente conocido como Planeta Plant.	
4	Planeta Freezer No. 79	imagen_planeta_freezer.jpg	1	Planeta artificial utilizado por Freezer como base de operaciones y centro de clonación.	
5	Planeta Kanassa	imagen_kanassa.jpg	1	Planeta habitado por los Kanassans y conocido por la lucha entre Bardock y los habitantes del planeta.	
6	Planeta Monmar	imagen_monmar.jpg	0	Planeta donde Gohan y Krillin encontraron las Dragon Balls para revivir a sus amigos durante la Saga de Namek.	
7	Planeta Yardrat	imagen_yardrat.jpg	0	Planeta de la técnica Instant Transmission, aprendida por Goku durante su estancia.	
8	Planeta Namek Explorado	imagen_namek_explorado.jpg	0	Otro planeta Namek que se exploró en busca de Dragon Balls adicionales durante la Saga de Namek.	
9	Planeta Mogo Mogo	imagen_mogo_mogo.jpg	0	Planeta donde Goku se enfrentó a Pikkon en el Otro Mundo.	
10	Planeta Yardrat Secundario	imagen_yardrat_secundario.jpg	0	Otro planeta Yardrat mencionado en la serie.	
11	Planeta del Kaiō del Norte	imagen_planeta_kai.jpg	0	Planeta sagrado donde reside el Kaio del Norte.	
12	Planeta del Gran Kaio	imagen_planeta_gran_kai.jpg	0	Planeta donde reside el Gran Kaio, maestro del Kaio del Norte.	
13	Planeta Makyo	imagen_planeta_makyo.jpg	0	Planeta donde se encuentra la Gran Estrella Malvada y Garlic Jr.	
14	Planeta Babari	imagen_planeta_babari.jpg	0	Planeta habitado por los Babari, donde Tarble, el hermano de Vegeta, se refugió.	
15	Planeta de los Tsufur	imagen_planeta_tsufur.jpg	0	Planeta natal de los Tsufur, la raza a la que pertenecía el Dr. Raichi.	
16	Planeta desconocido	imagen_planeta_tsufur.jpg	0	Sin informacion.	
					


INSERT IGNORE INTO characters (name, maxKi, race, gender, age, description, image, originPlanetId, affiliation)
VALUES
  ('Goku', 10000, 'SAIYAN', 'MALE', '36', 'El protagonista de la serie, conocido por su gran poder y personalidad amigable.', 'imagen_goku.jpg', 3, 'Z FIGHTER'),
  ('Vegeta', 9000, 'SAIYAN', 'MALE', '48', 'Príncipe de los Saiyans, inicialmente un villano, pero luego se une a los Z Fighters.', 'imagen_vegeta.jpg', 3, 'Z FIGHTER'),
  ('Piccolo', 5000, 'NAMEKIAN', 'MALE', '27', 'Un Namekian guerrero y protector de la Tierra.', 'imagen_piccolo.jpg', 1, 'Z FIGHTER'),
  ('Bulma', 50, 'HUMAN', 'FEMALE', '50', 'Genio científico y amiga de Goku.', 'imagen_bulma.jpg', 2, 'Z FIGHTER'),
 ('Freezer', 50000, 'FRIEZA_RACE', 'MALE', 'Unknown', 'Freezer es el tirano espacial y el principal antagonista de la saga de Freezer.', 'imagen_freezer.jpg', 16, 'RED_RIBBON_ARMY'),
  ('Zarbon', 2500, 'OTHER', 'MALE', "Unknown", 'Zarbon es uno de los secuaces de Freezer y un luchador poderoso.', 'imagen_zarbon.jpg', 16, 'RED_RIBBON_ARMY'),
  ('Dodoria', 3000, 'OTHER', 'MALE', "Unknown", 'Dodoria es otro secuaz de Freezer conocido por su brutalidad.', 'imagen_dodoria.jpg', 16, 'RED_RIBBON_ARMY'),
  ('Ginyu Force', 8000, 'OTHER', 'MALE', "Unknown", 'La Ginyu Force es un equipo de élite de mercenarios que trabaja para Freezer.', 'imagen_ginyu_force.jpg', 16, 'RED_RIBBON_ARMY'),
  ('Celula', 1500000, 'ANDROID', 'MALE', "Unknown", 'Creado a partir de células de guerreros poderosos.', 'imagen_cell.jpg', 2, 'OTHER'),
  ('Gohan', 5000, 'SAIYAN', 'MALE', '18', 'Hijo de Goku, un poderoso luchador.', 'imagen_gohan.jpg', 2, 'Z FIGHTER'),
  ('Krillin', 100, 'HUMAN', 'MALE', '42', 'Amigo cercano de Goku y guerrero valiente.', 'imagen_krillin.jpg', 2, 'Z FIGHTER'),
  ('Tien Shinhan', 5000, 'HUMAN', 'MALE', '33', 'Maestro de las artes marciales y miembro de los Z Fighters.', 'imagen_tien.jpg', 2, 'Z FIGHTER'),
  ('Yamcha', 2000, 'HUMAN', 'MALE', '28', 'Luchador que solía ser un bandido del desierto.', 'imagen_yamcha.jpg', 2, 'Z FIGHTER'),
  ('Chi-Chi', 20, 'HUMAN', 'FEMALE', '46', 'Esposa de Goku y madre de Gohan.', 'imagen_chi_chi.jpg', 2, 'Z FIGHTER'),
  ('Goten', 4000, 'SAIYAN', 'MALE', '17', 'Hijo menor de Goku.', 'imagen_goten.jpg', 2, 'Z FIGHTER'),
  ('Trunks', 4500, 'SAIYAN', 'MALE', '18', 'Hijo de Vegeta y Bulma.', 'imagen_trunks.jpg', 2, 'Z FIGHTER'),
  ('Master Roshi', 300, 'HUMAN', 'MALE', '354', 'Maestro de artes marciales y mentor de Goku.', 'imagen_master_roshi.jpg', 2, 'Z FIGHTER'),
  ('Bardock', 8000, 'SAIYAN', 'MALE', "Unknown", 'Padre de Goku y un guerrero Saiyan.', 'imagen_bardock.jpg', 3, 'Z FIGHTER'),
  ('Launch', 30, 'HUMAN', 'FEMALE', '25', 'Personaje que sufre cambios de personalidad al estornudar.', 'imagen_launch.jpg', 2, 'Z FIGHTER'),
  ('Mr. Satan', 0, 'HUMAN', 'MALE', '45', 'Luchador humano famoso por llevarse el mérito de las victorias de los Guerreros Z.', 'imagen_mr_satan.jpg', 2, 'OTHER'),
  ('Dende', 5, 'NAMEKIAN', 'MALE', '15', 'Sucesor de Piccolo como el nuevo Namekian protector de la Tierra.', 'imagen_dende.jpg', 1, 'Z FIGHTER'),
  ('Android 17', 3000, 'ANDROID', 'MALE', "Unknown", 'Android 17 es un poderoso androide que participa en el Torneo de Cell.', 'imagen_android_17.jpg', 16, 'OTHER'),
  ('Android 16', 5000, 'ANDROID', 'MALE', "Unknown", 'Android 16 es un androide gigante conocido por su amor a la naturaleza y la vida.', 'imagen_android_16.jpg', 16, 'OTHER'),
  ('Android 19', 400, 'ANDROID', 'MALE', "Unknown", 'Android 19 es uno de los androides creados por el Dr. Gero.', 'imagen_android_19.jpg', 16, 'RED_RIBBON_ARMY'),
  ('Android 20 (Dr. Gero)', '800', 'ANDROID', 'MALE', "Unknown", 'Dr. Gero es el científico loco que creó a los androides 17, 18 y 19.', 'imagen_dr_gero.jpg', 16, 'RED_RIBBON_ARMY'),
  ('Android 13', 2500, 'ANDROID', 'MALE', "Unknown", 'Android 13 es un androide peligroso que aparece en la película "El Regreso de Cooler".', 'imagen_android_13.jpg', 16, 'OTHER'),
  ('Android 14', 2000, 'ANDROID', 'MALE', "Unknown", 'Android 14 es otro androide que aparece en la misma película que Android 13.', 'imagen_android_14.jpg', 16, 'OTHER'),
  ('Android 15', 1500, 'ANDROID', 'MALE', "Unknown", 'Android 15 es otro androide que aparece en la misma película que Android 13.', 'imagen_android_15.jpg', 16, 'OTHER'),
  ('Nail', 8000, 'NAMEKIAN', 'MALE', "Unknown", 'Namekian guerrero que se fusionó con Piccolo para aumentar su poder.', 'imagen_nail.jpg', 1, 'Z FIGHTER'),
  ('Raditz', 1200, 'SAIYAN', 'MALE', "Unknown", 'Hermano mayor de Goku y villano.', 'imagen_raditz.jpg', 3, 'OTHER'),
  ('Babidi', 30000, 'Majin', 'MALE', "Unknown", 'Mago malvado que controla a Majin Buu.', 'imagen_babidi.jpg', 14, 'OTHER'),
  ('Majin Buu', 100000, 'Majin', 'MALE', "Unknown", 'Antiguo villano y poderoso ser destruyente y regenerativo.', 'imagen_majin_buu.jpg', 14, 'OTHER'),
  ('Beerus ', 30000, 'OTHER', 'MALE', "Unknown", 'Beerus es el Dios de la Destrucción del Universo 7.', 16, 'OTHER'),
  ('Whis ', 40000, 'OTHER', 'MALE', "Unknown", 'Whis es el ángel que sirve al Dios de la Destrucción Beerus.', 16, 'OTHER'),
  ('Zeno ', 100000, 'OTHER', 'MALE', "Unknown", 'Zeno es el ser supremo del multiverso y tiene un poder abrumador.', 16, 'OTHER'),
  ('Kaioshin Supremo Kaio', 15000, 'OTHER', 'MALE', "Unknown", 'Los Kaioshin son los dioses protectores del Universo y supervisan la creación.', 17, 'OTHER'),
  ('Kibito', 6000, 'OTHER', 'MALE', "Unknown", 'Kibito es un asistente de los Kaioshin.', 17, 'OTHER'),
  ('Kaioshin Anciano', 20000, 'OTHER', 'MALE', "Unknown", 'El Kaioshin Anciano es el líder de los Kaioshin.', 17, 'OTHER'),
  ('Gowasu', 9000, 'OTHER', 'MALE', "Unknown", 'Gowasu es un Kaioshin que aparece en Dragon Ball Super.', 17, 'OTHER'),
  ('Jiren', 35000, 'OTHER', 'MALE', "Unknown", 'Jiren es un poderoso luchador del Universo 11 y uno de los oponentes más formidables en el torneo.', 'imagen_jiren.jpg', 16, 'OTHER'),
  ('Toppo', 28000, 'OTHER', 'MALE', "Unknown", 'Toppo es otro guerrero del Universo 11 que participa en el torneo.', 'imagen_toppo.jpg', 16, 'OTHER'),
  ('Dyspo', 22000, 'OTHER', 'MALE', "Unknown", 'Dyspo es un miembro del equipo del Universo 11 conocido por su velocidad.', 'imagen_dyspo.jpg', 16, 'OTHER'),
  ('Belmod ', 28000, 'OTHER', 'MALE', "Unknown", 'Belmod es el Dios de la Destrucción del Universo 11 y supervisor del torneo.', 'imagen_belmod.jpg', 16, 'OTHER'),
  ('Marcarita ', 30000, 'OTHER', 'FEMALE', "Unknown", 'Marcarita es el Ángel del Universo 11 y guía de Toppo.', 'imagen_marcarita.jpg', 16, 'OTHER'),
  ('Vermoud ', 27000, 'OTHER', 'MALE', "Unknown", 'Vermoud es el Dios de la Destrucción del Universo 11 anterior a Belmod.', 'imagen_vermoud.jpg', 16, 'OTHER'),
  ('Grand Priest ', 60000, 'OTHER', 'MALE', "Unknown", 'El Gran Sacerdote es el supervisor del torneo y uno de los seres más poderosos.', 'imagen_grand_priest.jpg', 16, 'OTHER');