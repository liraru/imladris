-- ============================================================

-- 02_editorials.sql (v2 - corregido)

-- Inserta las editoriales del Excel MÁS 3 editoriales nuevas detectadas

-- al resolver libros que no tenían editorial en el Excel original.

-- Idempotente: usa WHERE NOT EXISTS por nombre.

--

-- CAMBIOS respecto a la v1:

--  - 'Lonely Planet' -> US (propiedad de Red Ventures, Nashville, desde 2020)

--  - 'Tianwen Kadokawa' -> CN (joint venture con sede en Chengdu, China)

--  - NUEVAS: 'Roca Editorial' (ES), 'Letras de Plata' (ES), 'Lumen' (ES)

--    -- se necesitan para 03_book_series.sql y 04_books_and_authors.sql

-- ============================================================



INSERT INTO editorials (name, country, website, logo)
SELECT '3A Network', 'JP', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = '3A Network');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Al Margen - Sajalín editores', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Al Margen - Sajalín editores');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Alfaguara', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Alfaguara');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Alianza Editorial', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Alianza Editorial');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Anagrama', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Anagrama');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Anaya', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Anaya');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Andre Deutsch', 'GB', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Andre Deutsch');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Berenice', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Berenice');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Blackie Books', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Blackie Books');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Bloomsbury', 'GB', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Bloomsbury');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Booket', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Booket');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Candaya', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Candaya');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Canongate', 'GB', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Canongate');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Chidori Books', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Chidori Books');

INSERT INTO editorials (name, country, website, logo)
SELECT 'DeBolsillo', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'DeBolsillo');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Distrito Manga', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Distrito Manga');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Diábolo Ediciones', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Diábolo Ediciones');

INSERT INTO editorials (name, country, website, logo)
SELECT 'ECC', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'ECC');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Ediciones Sajalín', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Ediciones Sajalín');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Editorial B', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Editorial B');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Galaxia', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Galaxia');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Gracewing', 'GB', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Gracewing');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Granta', 'GB', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Granta');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Grijalbo', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Grijalbo');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Hakusensha', 'JP', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Hakusensha');

INSERT INTO editorials (name, country, website, logo)
SELECT 'HarperCollins', 'US', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'HarperCollins');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Impedimenta', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Impedimenta');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Ivrea', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Ivrea');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Kadokawa Shoten', 'JP', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Kadokawa Shoten');

INSERT INTO editorials (name, country, website, logo)
SELECT 'La Esfera de los Libros', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'La Esfera de los Libros');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Letras de Plata', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Letras de Plata');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Lonely Planet', 'US', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Lonely Planet');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Lumen', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Lumen');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Milky Way Ediciones', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Milky Way Ediciones');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Minotauro', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Minotauro');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Norma Editorial', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Norma Editorial');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Panini Manga', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Panini Manga');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Penguin', 'GB', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Penguin');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Penguin Clásicos', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Penguin Clásicos');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Planeta', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Planeta');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Prion', 'GB', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Prion');

INSERT INTO editorials (name, country, website, logo)
SELECT 'RBA', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'RBA');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Roca Editorial', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Roca Editorial');

INSERT INTO editorials (name, country, website, logo)
SELECT 'SM', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'SM');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Salamandra', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Salamandra');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Santillana', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Santillana');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Satori Ediciones', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Satori Ediciones');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Seven Seas', 'US', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Seven Seas');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Suma', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Suma');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Tianwen Kadokawa', 'CN', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Tianwen Kadokawa');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Tomodomo', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Tomodomo');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Tusquets Editores', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Tusquets Editores');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Umbriel', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Umbriel');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Vintage', 'GB', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Vintage');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Vintage Classics', 'GB', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Vintage Classics');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Whizz Hard Books', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Whizz Hard Books');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Xerais', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Xerais');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Yen ON', 'US', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Yen ON');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Yen Press', 'US', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Yen Press');

-- ============================================================
-- 02b_editorials_extra.sql
-- Editoriales adicionales para completar el editorial_id de los 17 libros
-- que no tenían editorial en el Excel. Ejecutar DESPUÉS de 02_editorials.sql
-- (y antes de 07_update_book_editorials.sql). Idempotente.
-- ============================================================

INSERT INTO editorials (name, country, website, logo)
SELECT 'Amazon KDP', 'US', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Amazon KDP');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Austral', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Austral');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Hermida Editores', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Hermida Editores');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Libros del Asteroide', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Libros del Asteroide');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Macmillan', 'GB', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Macmillan');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Montena', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Montena');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Plutón Ediciones', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Plutón Ediciones');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Quaterni', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Quaterni');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Sans Soleil Ediciones', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Sans Soleil Ediciones');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Susaeta', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Susaeta');

INSERT INTO editorials (name, country, website, logo)
SELECT 'Trotta Editorial', 'ES', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM editorials WHERE name = 'Trotta Editorial');
