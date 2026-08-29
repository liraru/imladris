-- ============================================================
-- 05_mangas_and_authors.sql
-- Inserta las obras de manga únicas (columna 'Manga') junto con sus autores
-- (Guión + Dibujo, deduplicados) en la tabla puente manga_authors.
-- Requiere 01_authors.sql ejecutado antes.
--
-- NOTA: 'demographic' (shonen/shojo/seinen/josei/kodomo) no existe en el
-- Excel, se deja en NULL. Si la columna demographic es NOT NULL en tu
-- esquema real, tendrás que rellenarla a mano o relajar la restricción
-- antes de ejecutar este script.
--
-- Se asume que el guión/dibujo es el mismo en todos los tomos de una obra
-- (se toma de la primera fila de cada manga en el Excel).
-- ============================================================

BEGIN;

-- Algo entre Nosotros
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Algo entre Nosotros', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Algo entre Nosotros')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Hagi') AS a;

-- Antiguos Alumnos
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Antiguos Alumnos', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Antiguos Alumnos')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Asumiko Nakamura') AS a;

-- Atelier of Witch Hat: Ed. Grimorio
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Atelier of Witch Hat: Ed. Grimorio', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Atelier of Witch Hat: Ed. Grimorio')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kamome Shirahama') AS a;

-- Aunque no Pueda Hacer Magia
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Aunque no Pueda Hacer Magia', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Aunque no Pueda Hacer Magia')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- Bakuman
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Bakuman', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Bakuman')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Banana Fish
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Banana Fish', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Banana Fish')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Akimi Yoshida') AS a;

-- Boy Meets Maria
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Boy Meets Maria', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Boy Meets Maria')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Peyo') AS a;

-- Bungo Stray Dogs
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Bungo Stray Dogs', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Bungo Stray Dogs')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs: Another Story
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Bungo Stray Dogs: Another Story', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Bungo Stray Dogs: Another Story')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa' UNION ALL SELECT id FROM authors WHERE name = 'Oyoyo') AS a;

-- Bungo Stray Dogs: Raku-gaki Techo
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Bungo Stray Dogs: Raku-gaki Techo', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Bungo Stray Dogs: Raku-gaki Techo')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Death Note: Black Edition
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Death Note: Black Edition', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Death Note: Black Edition')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- El Arte de Atelier of Witch Hat
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'El Arte de Atelier of Witch Hat', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'El Arte de Atelier of Witch Hat')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kamome Shirahama') AS a;

-- El Dios y el Mensajero Incapaz de Volar
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'El Dios y el Mensajero Incapaz de Volar', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'El Dios y el Mensajero Incapaz de Volar')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Hagi') AS a;

-- En la Misma Clase
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'En la Misma Clase', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'En la Misma Clase')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Asumiko Nakamura') AS a;

-- Fullmetal Alchemist
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Fullmetal Alchemist', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Fullmetal Alchemist')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Given
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Given', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Given')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- IDOLISH7
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'IDOLISH7', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'IDOLISH7')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;

-- IDOLISH7 - TRIGGER
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'IDOLISH7 - TRIGGER', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'IDOLISH7 - TRIGGER')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;

-- IDOLiSH7 - Re:member
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'IDOLiSH7 - Re:member', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'IDOLiSH7 - Re:member')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;

-- Kitchen of Witch Hat
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Kitchen of Witch Hat', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Kitchen of Witch Hat')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kamome Shirahama' UNION ALL SELECT id FROM authors WHERE name = 'Hiromi Sato') AS a;

-- Link Click
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Link Click', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Link Click')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Li Haoling') AS a;

-- Los Apuntes de Vánitas
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Los Apuntes de Vánitas', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Los Apuntes de Vánitas')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- No. 6
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'No. 6', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'No. 6')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Atsuko Asano' UNION ALL SELECT id FROM authors WHERE name = 'Hinoki Kino') AS a;

-- Noragami
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Noragami', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Noragami')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Pandora Hearts
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Pandora Hearts', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Pandora Hearts')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Puedo Oír el Sol
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Puedo Oír el Sol', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Puedo Oír el Sol')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Yuki Fumino') AS a;

-- Qualia bajo la Nieve
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Qualia bajo la Nieve', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Qualia bajo la Nieve')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- SOLANIN integral
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'SOLANIN integral', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'SOLANIN integral')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Inio Asano') AS a;

-- Senpai
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Senpai', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Senpai')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Bikke') AS a;

-- Seven Days
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Seven Days', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Seven Days')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Venio Tachibana') AS a;

-- Sherlock: El Banquero Ciego
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Sherlock: El Banquero Ciego', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Sherlock: El Banquero Ciego')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Steven Moffat' UNION ALL SELECT id FROM authors WHERE name = 'Mark Gatiss' UNION ALL SELECT id FROM authors WHERE name = 'Jay') AS a;

-- Sherlock: El Gran Juego
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Sherlock: El Gran Juego', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Sherlock: El Gran Juego')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Steven Moffat' UNION ALL SELECT id FROM authors WHERE name = 'Mark Gatiss' UNION ALL SELECT id FROM authors WHERE name = 'Jay') AS a;

-- Sherlock: Estudio en Rosa
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Sherlock: Estudio en Rosa', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Sherlock: Estudio en Rosa')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Steven Moffat' UNION ALL SELECT id FROM authors WHERE name = 'Mark Gatiss' UNION ALL SELECT id FROM authors WHERE name = 'Jay') AS a;

-- Soul Eater
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Soul Eater', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Soul Eater')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Un Extraño a la Orilla del Mar
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Un Extraño a la Orilla del Mar', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Un Extraño a la Orilla del Mar')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- Un Extraño en Primavera
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Un Extraño en Primavera', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Un Extraño en Primavera')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- Wind Breaker
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'Wind Breaker', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'Wind Breaker')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- You Are in the Blue Summer
WITH new_manga AS (
  INSERT INTO mangas (title, demographic)
  SELECT 'You Are in the Blue Summer', NULL
  WHERE NOT EXISTS (SELECT 1 FROM mangas WHERE title = 'You Are in the Blue Summer')
  RETURNING id
)
INSERT INTO manga_authors (manga_id, author_id)
SELECT new_manga.id, a.id FROM new_manga, (SELECT id FROM authors WHERE name = 'Nagisa Furuya') AS a;

COMMIT;
