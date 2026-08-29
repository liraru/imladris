-- ============================================================
-- 06_manga_volumes_and_authors.sql
-- Inserta los 259 tomos de manga (hoja 'Manga') y sus vínculos en
-- manga_volume_authors (Guión + Dibujo de CADA tomo, deduplicados).
-- Requiere 01_authors.sql, 02_editorials.sql y 05_mangas_and_authors.sql
-- ejecutados antes.
--
-- title del tomo: se reutiliza el título de la obra (el Excel no da un
-- título distinto por tomo).
-- volume_number: extraído de la columna 'Tomo' ('001' -> 1). Cuatro tomos
-- no siguen el formato numérico estándar (ediciones especiales/extras):
--   Los Apuntes de Vánitas 011 Special Edition -> volume_number = 11,
--     nota = 'Special Edition'
--   Given -> Links / Illustrations -> volume_number = NULL, la etiqueta
--     original se guarda en notes
--   Noragami -> Historias cortas -> volume_number = NULL, nota = 'Historias cortas'
-- reading_status se fija a 'not_started'. release_date, cover_image_url,
-- adquisition_date, start_date y finish_date no están en el Excel -> NULL.
-- ============================================================

BEGIN;

-- No. 6 - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'No. 6', (SELECT id FROM mangas WHERE title = 'No. 6'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Ivrea')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsuko Asano' UNION ALL SELECT id FROM authors WHERE name = 'Hinoki Kino') AS a;

-- No. 6 - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'No. 6', (SELECT id FROM mangas WHERE title = 'No. 6'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Ivrea')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsuko Asano' UNION ALL SELECT id FROM authors WHERE name = 'Hinoki Kino') AS a;

-- No. 6 - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'No. 6', (SELECT id FROM mangas WHERE title = 'No. 6'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Ivrea')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsuko Asano' UNION ALL SELECT id FROM authors WHERE name = 'Hinoki Kino') AS a;

-- No. 6 - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'No. 6', (SELECT id FROM mangas WHERE title = 'No. 6'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Ivrea')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsuko Asano' UNION ALL SELECT id FROM authors WHERE name = 'Hinoki Kino') AS a;

-- No. 6 - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'No. 6', (SELECT id FROM mangas WHERE title = 'No. 6'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Ivrea')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsuko Asano' UNION ALL SELECT id FROM authors WHERE name = 'Hinoki Kino') AS a;

-- No. 6 - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'No. 6', (SELECT id FROM mangas WHERE title = 'No. 6'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Ivrea')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsuko Asano' UNION ALL SELECT id FROM authors WHERE name = 'Hinoki Kino') AS a;

-- No. 6 - tomo 007
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'No. 6', (SELECT id FROM mangas WHERE title = 'No. 6'), 7, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Ivrea')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsuko Asano' UNION ALL SELECT id FROM authors WHERE name = 'Hinoki Kino') AS a;

-- No. 6 - tomo 008
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'No. 6', (SELECT id FROM mangas WHERE title = 'No. 6'), 8, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Ivrea')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsuko Asano' UNION ALL SELECT id FROM authors WHERE name = 'Hinoki Kino') AS a;

-- No. 6 - tomo 009
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'No. 6', (SELECT id FROM mangas WHERE title = 'No. 6'), 9, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Ivrea')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsuko Asano' UNION ALL SELECT id FROM authors WHERE name = 'Hinoki Kino') AS a;

-- IDOLiSH7 - Re:member - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'IDOLiSH7 - Re:member', (SELECT id FROM mangas WHERE title = 'IDOLiSH7 - Re:member'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'JP', (SELECT id FROM editorials WHERE name = 'Hakusensha')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;

-- IDOLiSH7 - Re:member - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'IDOLiSH7 - Re:member', (SELECT id FROM mangas WHERE title = 'IDOLiSH7 - Re:member'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'JP', (SELECT id FROM editorials WHERE name = 'Hakusensha')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;

-- IDOLiSH7 - Re:member - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'IDOLiSH7 - Re:member', (SELECT id FROM mangas WHERE title = 'IDOLiSH7 - Re:member'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'JP', (SELECT id FROM editorials WHERE name = 'Hakusensha')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;

-- IDOLISH7 - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'IDOLISH7', (SELECT id FROM mangas WHERE title = 'IDOLISH7'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'ECC')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;

-- IDOLISH7 - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'IDOLISH7', (SELECT id FROM mangas WHERE title = 'IDOLISH7'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'ECC')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;

-- IDOLISH7 - TRIGGER - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'IDOLISH7 - TRIGGER', (SELECT id FROM mangas WHERE title = 'IDOLISH7 - TRIGGER'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'ECC')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Bunta Tsushimi' UNION ALL SELECT id FROM authors WHERE name = 'Arina Tanemura') AS a;

-- SOLANIN integral - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'SOLANIN integral', (SELECT id FROM mangas WHERE title = 'SOLANIN integral'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Inio Asano') AS a;

-- Los Apuntes de Vánitas - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Los Apuntes de Vánitas - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Los Apuntes de Vánitas - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Los Apuntes de Vánitas - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Los Apuntes de Vánitas - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Los Apuntes de Vánitas - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Los Apuntes de Vánitas - tomo 007
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 7, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Los Apuntes de Vánitas - tomo 008
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 8, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Los Apuntes de Vánitas - tomo 009
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 9, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Los Apuntes de Vánitas - tomo 010
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 10, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Los Apuntes de Vánitas - tomo 011
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 11, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Los Apuntes de Vánitas - tomo 011 Special Edition
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Los Apuntes de Vánitas', (SELECT id FROM mangas WHERE title = 'Los Apuntes de Vánitas'), 11, 'not_started', NULL, NULL, NULL, NULL, NULL, 'Special Edition', 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Qualia bajo la Nieve - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Qualia bajo la Nieve', (SELECT id FROM mangas WHERE title = 'Qualia bajo la Nieve'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- Aunque no Pueda Hacer Magia - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Aunque no Pueda Hacer Magia', (SELECT id FROM mangas WHERE title = 'Aunque no Pueda Hacer Magia'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- Un Extraño a la Orilla del Mar - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Un Extraño a la Orilla del Mar', (SELECT id FROM mangas WHERE title = 'Un Extraño a la Orilla del Mar'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- Un Extraño en Primavera - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Un Extraño en Primavera', (SELECT id FROM mangas WHERE title = 'Un Extraño en Primavera'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- Un Extraño en Primavera - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Un Extraño en Primavera', (SELECT id FROM mangas WHERE title = 'Un Extraño en Primavera'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- Un Extraño en Primavera - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Un Extraño en Primavera', (SELECT id FROM mangas WHERE title = 'Un Extraño en Primavera'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- Un Extraño en Primavera - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Un Extraño en Primavera', (SELECT id FROM mangas WHERE title = 'Un Extraño en Primavera'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- Un Extraño en Primavera - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Un Extraño en Primavera', (SELECT id FROM mangas WHERE title = 'Un Extraño en Primavera'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- Un Extraño en Primavera - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Un Extraño en Primavera', (SELECT id FROM mangas WHERE title = 'Un Extraño en Primavera'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kanna Kii') AS a;

-- You Are in the Blue Summer - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'You Are in the Blue Summer', (SELECT id FROM mangas WHERE title = 'You Are in the Blue Summer'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Nagisa Furuya') AS a;

-- Banana Fish - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Banana Fish', (SELECT id FROM mangas WHERE title = 'Banana Fish'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Panini Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Akimi Yoshida') AS a;

-- Bakuman - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 007
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 7, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 008
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 8, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 009
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 9, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 010
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 10, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 011
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 11, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 012
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 12, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 013
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 13, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 014
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 14, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 015
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 15, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 016
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 16, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 017
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 17, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 018
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 18, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 019
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 19, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Bakuman - tomo 020
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bakuman', (SELECT id FROM mangas WHERE title = 'Bakuman'), 20, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Soul Eater - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 007
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 7, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 008
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 8, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 009
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 9, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 010
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 10, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 011
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 11, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 012
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 12, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 013
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 13, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 014
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 14, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 015
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 15, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 016
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 16, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 017
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 17, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 018
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 18, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 019
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 19, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 020
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 20, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 021
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 21, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 022
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 22, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 023
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 23, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 024
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 24, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Soul Eater - tomo 025
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Soul Eater', (SELECT id FROM mangas WHERE title = 'Soul Eater'), 25, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Atsushi Ohkubo') AS a;

-- Pandora Hearts - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen Press')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 007
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 7, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 008
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 8, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 009
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 9, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen Press')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 010
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 10, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 011
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 11, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 012
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 12, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 013
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 13, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 014
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 14, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 015
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 15, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 016
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 16, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 017
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 17, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 018
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 18, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 019
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 19, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 020
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 20, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 021
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 21, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 022
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 22, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 023
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 23, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Pandora Hearts - tomo 024
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Pandora Hearts', (SELECT id FROM mangas WHERE title = 'Pandora Hearts'), 24, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Jun Mochizuki') AS a;

-- Wind Breaker - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 007
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 7, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 008
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 8, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 009
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 9, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 010
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 10, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 011
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 11, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 012
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 12, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 013
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 13, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 014
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 14, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Wind Breaker - tomo 015
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Wind Breaker', (SELECT id FROM mangas WHERE title = 'Wind Breaker'), 15, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Distrito Manga')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Satoru Nii') AS a;

-- Given - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Given - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Given - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Given - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Given - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Given - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Given - tomo 007
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), 7, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Given - tomo 008
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), 8, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Given - tomo 009
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), 9, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Given - tomo 010
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), 10, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Given - tomo Links
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), NULL, 'not_started', NULL, NULL, NULL, NULL, NULL, 'Links', 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Given - tomo Illustrations
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Given', (SELECT id FROM mangas WHERE title = 'Given'), NULL, 'not_started', NULL, NULL, NULL, NULL, NULL, 'Illustrations', 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Natsuki Kizu') AS a;

-- Algo entre Nosotros - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Algo entre Nosotros', (SELECT id FROM mangas WHERE title = 'Algo entre Nosotros'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hagi') AS a;

-- El Dios y el Mensajero Incapaz de Volar - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'El Dios y el Mensajero Incapaz de Volar', (SELECT id FROM mangas WHERE title = 'El Dios y el Mensajero Incapaz de Volar'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hagi') AS a;

-- Link Click - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Link Click', (SELECT id FROM mangas WHERE title = 'Link Click'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Li Haoling') AS a;

-- Link Click - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Link Click', (SELECT id FROM mangas WHERE title = 'Link Click'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Li Haoling') AS a;

-- Link Click - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Link Click', (SELECT id FROM mangas WHERE title = 'Link Click'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Li Haoling') AS a;

-- Link Click - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Link Click', (SELECT id FROM mangas WHERE title = 'Link Click'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Li Haoling') AS a;

-- Link Click - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Link Click', (SELECT id FROM mangas WHERE title = 'Link Click'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Li Haoling') AS a;

-- Link Click - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Link Click', (SELECT id FROM mangas WHERE title = 'Link Click'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Li Haoling') AS a;

-- Puedo Oír el Sol - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Puedo Oír el Sol', (SELECT id FROM mangas WHERE title = 'Puedo Oír el Sol'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Yuki Fumino') AS a;

-- Puedo Oír el Sol - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Puedo Oír el Sol', (SELECT id FROM mangas WHERE title = 'Puedo Oír el Sol'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Yuki Fumino') AS a;

-- Puedo Oír el Sol - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Puedo Oír el Sol', (SELECT id FROM mangas WHERE title = 'Puedo Oír el Sol'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Yuki Fumino') AS a;

-- Puedo Oír el Sol - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Puedo Oír el Sol', (SELECT id FROM mangas WHERE title = 'Puedo Oír el Sol'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Yuki Fumino') AS a;

-- Puedo Oír el Sol - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Puedo Oír el Sol', (SELECT id FROM mangas WHERE title = 'Puedo Oír el Sol'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Yuki Fumino') AS a;

-- Puedo Oír el Sol - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Puedo Oír el Sol', (SELECT id FROM mangas WHERE title = 'Puedo Oír el Sol'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Yuki Fumino') AS a;

-- Puedo Oír el Sol - tomo 007
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Puedo Oír el Sol', (SELECT id FROM mangas WHERE title = 'Puedo Oír el Sol'), 7, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Yuki Fumino') AS a;

-- Puedo Oír el Sol - tomo 008
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Puedo Oír el Sol', (SELECT id FROM mangas WHERE title = 'Puedo Oír el Sol'), 8, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Yuki Fumino') AS a;

-- Puedo Oír el Sol - tomo 009
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Puedo Oír el Sol', (SELECT id FROM mangas WHERE title = 'Puedo Oír el Sol'), 9, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Yuki Fumino') AS a;

-- Antiguos Alumnos - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Antiguos Alumnos', (SELECT id FROM mangas WHERE title = 'Antiguos Alumnos'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tomodomo')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Asumiko Nakamura') AS a;

-- Antiguos Alumnos - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Antiguos Alumnos', (SELECT id FROM mangas WHERE title = 'Antiguos Alumnos'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tomodomo')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Asumiko Nakamura') AS a;

-- En la Misma Clase - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'En la Misma Clase', (SELECT id FROM mangas WHERE title = 'En la Misma Clase'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tomodomo')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Asumiko Nakamura') AS a;

-- En la Misma Clase - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'En la Misma Clase', (SELECT id FROM mangas WHERE title = 'En la Misma Clase'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tomodomo')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Asumiko Nakamura') AS a;

-- En la Misma Clase - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'En la Misma Clase', (SELECT id FROM mangas WHERE title = 'En la Misma Clase'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tomodomo')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Asumiko Nakamura') AS a;

-- Seven Days - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Seven Days', (SELECT id FROM mangas WHERE title = 'Seven Days'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tomodomo')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Venio Tachibana') AS a;

-- Seven Days - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Seven Days', (SELECT id FROM mangas WHERE title = 'Seven Days'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tomodomo')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Venio Tachibana') AS a;

-- Senpai - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Senpai', (SELECT id FROM mangas WHERE title = 'Senpai'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tomodomo')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Bikke') AS a;

-- Boy Meets Maria - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Boy Meets Maria', (SELECT id FROM mangas WHERE title = 'Boy Meets Maria'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Peyo') AS a;

-- Noragami - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 007
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 7, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 008
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 8, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 009
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 9, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 010
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 10, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 011
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 11, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 012
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 12, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 013
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 13, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 014
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 14, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 015
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 15, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 016
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 16, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 017
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 17, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 018
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 18, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 019
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 19, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 020
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 20, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 021
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 21, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 022
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 22, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 023
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 23, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 024
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 24, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 025
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 25, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 026
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 26, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo 027
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), 27, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Noragami - tomo Historias cortas
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Noragami', (SELECT id FROM mangas WHERE title = 'Noragami'), NULL, 'not_started', NULL, NULL, NULL, NULL, NULL, 'Historias cortas', 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Adachitoka') AS a;

-- Fullmetal Alchemist - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 007
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 7, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 008
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 8, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 009
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 9, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 010
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 10, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 011
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 11, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 012
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 12, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 013
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 13, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 014
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 14, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 015
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 15, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 016
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 16, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 017
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 17, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 018
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 18, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 019
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 19, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 020
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 20, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 021
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 21, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 022
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 22, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 023
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 23, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 024
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 24, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 025
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 25, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 026
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 26, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Fullmetal Alchemist - tomo 027
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Fullmetal Alchemist', (SELECT id FROM mangas WHERE title = 'Fullmetal Alchemist'), 27, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Hiromu Arokawa') AS a;

-- Atelier of Witch Hat: Ed. Grimorio - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Atelier of Witch Hat: Ed. Grimorio', (SELECT id FROM mangas WHERE title = 'Atelier of Witch Hat: Ed. Grimorio'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kamome Shirahama') AS a;

-- Atelier of Witch Hat: Ed. Grimorio - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Atelier of Witch Hat: Ed. Grimorio', (SELECT id FROM mangas WHERE title = 'Atelier of Witch Hat: Ed. Grimorio'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kamome Shirahama') AS a;

-- Atelier of Witch Hat: Ed. Grimorio - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Atelier of Witch Hat: Ed. Grimorio', (SELECT id FROM mangas WHERE title = 'Atelier of Witch Hat: Ed. Grimorio'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kamome Shirahama') AS a;

-- Atelier of Witch Hat: Ed. Grimorio - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Atelier of Witch Hat: Ed. Grimorio', (SELECT id FROM mangas WHERE title = 'Atelier of Witch Hat: Ed. Grimorio'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kamome Shirahama') AS a;

-- El Arte de Atelier of Witch Hat - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'El Arte de Atelier of Witch Hat', (SELECT id FROM mangas WHERE title = 'El Arte de Atelier of Witch Hat'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kamome Shirahama') AS a;

-- Bungo Stray Dogs - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 007
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 7, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 008
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 8, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 009
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 9, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 010
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 10, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 011
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 11, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 012
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 12, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 013
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 13, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 014
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 14, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 015
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 15, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 016
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 16, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 017
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 17, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 018
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 18, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 019
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 19, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 020
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 20, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 021
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 21, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs - tomo 022
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs'), 22, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Bungo Stray Dogs: Another Story - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs: Another Story', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs: Another Story'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen Press')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa' UNION ALL SELECT id FROM authors WHERE name = 'Oyoyo') AS a;

-- Bungo Stray Dogs: Raku-gaki Techo - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Bungo Stray Dogs: Raku-gaki Techo', (SELECT id FROM mangas WHERE title = 'Bungo Stray Dogs: Raku-gaki Techo'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'JP', (SELECT id FROM editorials WHERE name = 'Kadokawa Shoten')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kafka Asagiri' UNION ALL SELECT id FROM authors WHERE name = 'Sango Harukawa') AS a;

-- Death Note: Black Edition - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Death Note: Black Edition', (SELECT id FROM mangas WHERE title = 'Death Note: Black Edition'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Death Note: Black Edition - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Death Note: Black Edition', (SELECT id FROM mangas WHERE title = 'Death Note: Black Edition'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Death Note: Black Edition - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Death Note: Black Edition', (SELECT id FROM mangas WHERE title = 'Death Note: Black Edition'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Death Note: Black Edition - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Death Note: Black Edition', (SELECT id FROM mangas WHERE title = 'Death Note: Black Edition'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Death Note: Black Edition - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Death Note: Black Edition', (SELECT id FROM mangas WHERE title = 'Death Note: Black Edition'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Death Note: Black Edition - tomo 006
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Death Note: Black Edition', (SELECT id FROM mangas WHERE title = 'Death Note: Black Edition'), 6, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Tsugumi Ohba' UNION ALL SELECT id FROM authors WHERE name = 'Takeshi Obata') AS a;

-- Sherlock: Estudio en Rosa - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Sherlock: Estudio en Rosa', (SELECT id FROM mangas WHERE title = 'Sherlock: Estudio en Rosa'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Steven Moffat' UNION ALL SELECT id FROM authors WHERE name = 'Mark Gatiss' UNION ALL SELECT id FROM authors WHERE name = 'Jay') AS a;

-- Sherlock: El Banquero Ciego - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Sherlock: El Banquero Ciego', (SELECT id FROM mangas WHERE title = 'Sherlock: El Banquero Ciego'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Steven Moffat' UNION ALL SELECT id FROM authors WHERE name = 'Mark Gatiss' UNION ALL SELECT id FROM authors WHERE name = 'Jay') AS a;

-- Sherlock: El Gran Juego - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Sherlock: El Gran Juego', (SELECT id FROM mangas WHERE title = 'Sherlock: El Gran Juego'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Steven Moffat' UNION ALL SELECT id FROM authors WHERE name = 'Mark Gatiss' UNION ALL SELECT id FROM authors WHERE name = 'Jay') AS a;

-- Kitchen of Witch Hat - tomo 001
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Kitchen of Witch Hat', (SELECT id FROM mangas WHERE title = 'Kitchen of Witch Hat'), 1, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kamome Shirahama' UNION ALL SELECT id FROM authors WHERE name = 'Hiromi Sato') AS a;

-- Kitchen of Witch Hat - tomo 002
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Kitchen of Witch Hat', (SELECT id FROM mangas WHERE title = 'Kitchen of Witch Hat'), 2, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kamome Shirahama' UNION ALL SELECT id FROM authors WHERE name = 'Hiromi Sato') AS a;

-- Kitchen of Witch Hat - tomo 003
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Kitchen of Witch Hat', (SELECT id FROM mangas WHERE title = 'Kitchen of Witch Hat'), 3, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kamome Shirahama' UNION ALL SELECT id FROM authors WHERE name = 'Hiromi Sato') AS a;

-- Kitchen of Witch Hat - tomo 004
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Kitchen of Witch Hat', (SELECT id FROM mangas WHERE title = 'Kitchen of Witch Hat'), 4, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kamome Shirahama' UNION ALL SELECT id FROM authors WHERE name = 'Hiromi Sato') AS a;

-- Kitchen of Witch Hat - tomo 005
WITH new_volume AS (
  INSERT INTO manga_volumes (
    title, manga_id, volume_number, reading_status, release_date,
    cover_image_url, adquisition_date, start_date, finish_date, notes,
    language, editorial_id
  )
  SELECT 'Kitchen of Witch Hat', (SELECT id FROM mangas WHERE title = 'Kitchen of Witch Hat'), 5, 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Milky Way Ediciones')
  RETURNING id
)
INSERT INTO manga_volume_authors (manga_volume_id, author_id)
SELECT new_volume.id, a.id FROM new_volume, (SELECT id FROM authors WHERE name = 'Kamome Shirahama' UNION ALL SELECT id FROM authors WHERE name = 'Hiromi Sato') AS a;

COMMIT;
