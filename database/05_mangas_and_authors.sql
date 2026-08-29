-- ============================================================
-- 05_mangas_and_authors.sql (v3 - corregido)
-- Requiere 01_authors.sql ejecutado antes.
--
-- CAMBIO respecto a la v2: se añade un UPDATE ... WHERE demographic IS NULL
-- justo después de cada INSERT. Esto es necesario porque el INSERT usa
-- WHERE NOT EXISTS (para ser idempotente por título) y por tanto NO toca
-- una fila que ya existiera de una ejecución anterior de este script (p.ej.
-- de la v1/v2, cuando demographic aún podía quedar en NULL). El UPDATE
-- garantiza que, exista ya la fila o se cree ahora, demographic termina
-- siempre con un valor y ninguna fila se queda en NULL.
--
-- Los mangas BL/yaoi se han clasificado como 'josei' (demografía real de
-- la revista japonesa en la que se serializan: Craft, Canna, Opera...),
-- aunque comercialmente algunas tiendas los etiqueten como 'shojo'.
--
-- *** AVISO: 'Link Click' es un manhua CHINO, no japonés. China no usa el
-- sistema de demografías por revista (shonen/shojo/seinen/josei) que sí
-- existe en Japón, así que no existe un dato oficial verificable por
-- internet. Se usa 'seinen' como valor provisional (tono adulto de la
-- obra); confirmaste que te parece correcto. ***
-- ============================================================

BEGIN;

-- Algo entre Nosotros
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Algo entre Nosotros', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Algo entre Nosotros')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Hagi') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'Algo entre Nosotros' AND demographic IS NULL;

-- Antiguos Alumnos
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Antiguos Alumnos', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Antiguos Alumnos')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Asumiko Nakamura') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'Antiguos Alumnos' AND demographic IS NULL;

-- Atelier of Witch Hat: Ed. Grimorio
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Atelier of Witch Hat: Ed. Grimorio', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Atelier of Witch Hat: Ed. Grimorio')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kamome Shirahama') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'Atelier of Witch Hat: Ed. Grimorio' AND demographic IS NULL;

-- Aunque no Pueda Hacer Magia
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Aunque no Pueda Hacer Magia', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Aunque no Pueda Hacer Magia')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'Aunque no Pueda Hacer Magia' AND demographic IS NULL;

-- Bakuman
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Bakuman', 'shonen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Bakuman')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;
UPDATE mangas SET demographic = 'shonen' WHERE title = 'Bakuman' AND demographic IS NULL;

-- Banana Fish
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Banana Fish', 'shojo'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Banana Fish')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Akimi Yoshida') AS a;
UPDATE mangas SET demographic = 'shojo' WHERE title = 'Banana Fish' AND demographic IS NULL;

-- Boy Meets Maria
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Boy Meets Maria', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Boy Meets Maria')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Peyo') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'Boy Meets Maria' AND demographic IS NULL;

-- Bungo Stray Dogs
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Bungo Stray Dogs', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Bungo Stray Dogs')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'Bungo Stray Dogs' AND demographic IS NULL;

-- Bungo Stray Dogs: Another Story
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Bungo Stray Dogs: Another Story', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Bungo Stray Dogs: Another Story')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa' UNION ALL SELECT id FROM authors WHERE name = 'Oyoyo') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'Bungo Stray Dogs: Another Story' AND demographic IS NULL;

-- Bungo Stray Dogs: Raku-gaki Techo
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Bungo Stray Dogs: Raku-gaki Techo', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Bungo Stray Dogs: Raku-gaki Techo')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'Bungo Stray Dogs: Raku-gaki Techo' AND demographic IS NULL;

-- Death Note: Black Edition
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Death Note: Black Edition', 'shonen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Death Note: Black Edition')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;
UPDATE mangas SET demographic = 'shonen' WHERE title = 'Death Note: Black Edition' AND demographic IS NULL;

-- El Arte de Atelier of Witch Hat
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'El Arte de Atelier of Witch Hat', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'El Arte de Atelier of Witch Hat')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kamome Shirahama') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'El Arte de Atelier of Witch Hat' AND demographic IS NULL;

-- El Dios y el Mensajero Incapaz de Volar
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'El Dios y el Mensajero Incapaz de Volar', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'El Dios y el Mensajero Incapaz de Volar')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Hagi') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'El Dios y el Mensajero Incapaz de Volar' AND demographic IS NULL;

-- En la Misma Clase
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'En la Misma Clase', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'En la Misma Clase')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Asumiko Nakamura') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'En la Misma Clase' AND demographic IS NULL;

-- Fullmetal Alchemist
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Fullmetal Alchemist', 'shonen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Fullmetal Alchemist')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;
UPDATE mangas SET demographic = 'shonen' WHERE title = 'Fullmetal Alchemist' AND demographic IS NULL;

-- Given
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Given', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Given')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'Given' AND demographic IS NULL;

-- IDOLISH7
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'IDOLISH7', 'shojo'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'IDOLISH7')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;
UPDATE mangas SET demographic = 'shojo' WHERE title = 'IDOLISH7' AND demographic IS NULL;

-- IDOLISH7 - TRIGGER
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'IDOLISH7 - TRIGGER', 'shojo'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'IDOLISH7 - TRIGGER')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;
UPDATE mangas SET demographic = 'shojo' WHERE title = 'IDOLISH7 - TRIGGER' AND demographic IS NULL;

-- IDOLiSH7 - Re:member
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'IDOLiSH7 - Re:member', 'shojo'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'IDOLiSH7 - Re:member')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;
UPDATE mangas SET demographic = 'shojo' WHERE title = 'IDOLiSH7 - Re:member' AND demographic IS NULL;

-- Kitchen of Witch Hat
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Kitchen of Witch Hat', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Kitchen of Witch Hat')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kamome Shirahama' UNION ALL SELECT id FROM authors WHERE name = 'Hiromi Sato') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'Kitchen of Witch Hat' AND demographic IS NULL;

-- Link Click  -- *** PROVISIONAL, ver AVISO arriba, confirmado por el usuario ***
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Link Click', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Link Click')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Li Haoling') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'Link Click' AND demographic IS NULL;

-- Los Apuntes de Vánitas
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Los Apuntes de Vánitas', 'shonen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Los Apuntes de Vánitas')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;
UPDATE mangas SET demographic = 'shonen' WHERE title = 'Los Apuntes de Vánitas' AND demographic IS NULL;

-- No. 6
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'No. 6', 'shojo'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'No. 6')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Atsuko Asano' UNION ALL SELECT id FROM authors WHERE name = 'Hinoki Kino') AS a;
UPDATE mangas SET demographic = 'shojo' WHERE title = 'No. 6' AND demographic IS NULL;

-- Noragami
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Noragami', 'shonen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Noragami')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;
UPDATE mangas SET demographic = 'shonen' WHERE title = 'Noragami' AND demographic IS NULL;

-- Pandora Hearts
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Pandora Hearts', 'shonen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Pandora Hearts')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;
UPDATE mangas SET demographic = 'shonen' WHERE title = 'Pandora Hearts' AND demographic IS NULL;

-- Puedo Oír el Sol
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Puedo Oír el Sol', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Puedo Oír el Sol')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Yuki Fumino') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'Puedo Oír el Sol' AND demographic IS NULL;

-- Qualia bajo la Nieve
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Qualia bajo la Nieve', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Qualia bajo la Nieve')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'Qualia bajo la Nieve' AND demographic IS NULL;

-- SOLANIN integral
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'SOLANIN integral', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'SOLANIN integral')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Inio Asano') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'SOLANIN integral' AND demographic IS NULL;

-- Senpai
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Senpai', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Senpai')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Bikke') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'Senpai' AND demographic IS NULL;

-- Seven Days
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Seven Days', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Seven Days')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Venio Tachibana') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'Seven Days' AND demographic IS NULL;

-- Sherlock: El Banquero Ciego
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Sherlock: El Banquero Ciego', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Sherlock: El Banquero Ciego')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Steven Moffat' UNION ALL SELECT id FROM authors WHERE name = 'Mark Gatiss' UNION ALL SELECT id FROM authors WHERE name = 'Jay') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'Sherlock: El Banquero Ciego' AND demographic IS NULL;

-- Sherlock: El Gran Juego
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Sherlock: El Gran Juego', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Sherlock: El Gran Juego')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Steven Moffat' UNION ALL SELECT id FROM authors WHERE name = 'Mark Gatiss' UNION ALL SELECT id FROM authors WHERE name = 'Jay') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'Sherlock: El Gran Juego' AND demographic IS NULL;

-- Sherlock: Estudio en Rosa
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Sherlock: Estudio en Rosa', 'seinen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Sherlock: Estudio en Rosa')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Steven Moffat' UNION ALL SELECT id FROM authors WHERE name = 'Mark Gatiss' UNION ALL SELECT id FROM authors WHERE name = 'Jay') AS a;
UPDATE mangas SET demographic = 'seinen' WHERE title = 'Sherlock: Estudio en Rosa' AND demographic IS NULL;

-- Soul Eater
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Soul Eater', 'shonen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Soul Eater')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;
UPDATE mangas SET demographic = 'shonen' WHERE title = 'Soul Eater' AND demographic IS NULL;

-- Un Extraño a la Orilla del Mar
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Un Extraño a la Orilla del Mar', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Un Extraño a la Orilla del Mar')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'Un Extraño a la Orilla del Mar' AND demographic IS NULL;

-- Un Extraño en Primavera
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Un Extraño en Primavera', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Un Extraño en Primavera')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'Un Extraño en Primavera' AND demographic IS NULL;

-- Wind Breaker
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Wind Breaker', 'shonen'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Wind Breaker')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;
UPDATE mangas SET demographic = 'shonen' WHERE title = 'Wind Breaker' AND demographic IS NULL;

-- You Are in the Blue Summer
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'You Are in the Blue Summer', 'josei'
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'You Are in the Blue Summer')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Nagisa Furuya') AS a;
UPDATE mangas SET demographic = 'josei' WHERE title = 'You Are in the Blue Summer' AND demographic IS NULL;

COMMIT;
