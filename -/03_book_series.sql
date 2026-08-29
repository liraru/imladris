-- ============================================================

-- 03_book_series.sql (v2 - corregido)

-- Requiere haber ejecutado 02_editorials.sql (v2) antes.

--

-- CAMBIOS respecto a la v1:

--  - 'La Bella Salvaje' -> editorial_id ahora apunta a 'Roca Editorial'

--    (antes NULL, sin dato en el Excel)

--  - 'La Librería Morisaki' -> editorial_id ahora apunta a 'Letras de Plata'

--    (antes NULL, sin dato en el Excel)

-- Resto de series sin cambios respecto a la v1 (ver esa versión para el

-- criterio de 'editorial más frecuente' en series con varias editoriales).

-- ============================================================



INSERT INTO book_series (title, editorial_id)
SELECT '1Q85', (SELECT id FROM editorials WHERE name = 'Tusquets Editores')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = '1Q85');

INSERT INTO book_series (title, editorial_id)
SELECT '1Q86', (SELECT id FROM editorials WHERE name = 'Tusquets Editores')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = '1Q86');

INSERT INTO book_series (title, editorial_id)
SELECT '1Q87', (SELECT id FROM editorials WHERE name = 'Tusquets Editores')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = '1Q87');

INSERT INTO book_series (title, editorial_id)
SELECT 'Ahriel', (SELECT id FROM editorials WHERE name = 'Minotauro')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Ahriel');

INSERT INTO book_series (title, editorial_id)
SELECT 'Assassin''s Creed', (SELECT id FROM editorials WHERE name = 'La Esfera de los Libros')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Assassin''s Creed');

INSERT INTO book_series (title, editorial_id)
SELECT 'Ballad of Sword and Wine (Qiang Jin Jiu)', (SELECT id FROM editorials WHERE name = 'Seven Seas')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Ballad of Sword and Wine (Qiang Jin Jiu)');

INSERT INTO book_series (title, editorial_id)
SELECT 'Bungo Stray Dogs: Light novels', (SELECT id FROM editorials WHERE name = 'Yen ON')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels');

INSERT INTO book_series (title, editorial_id)
SELECT 'Catherine Velis', (SELECT id FROM editorials WHERE name = 'DeBolsillo')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Catherine Velis');

INSERT INTO book_series (title, editorial_id)
SELECT 'Cormoran Strike', (SELECT id FROM editorials WHERE name = 'Booket')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Cormoran Strike');

INSERT INTO book_series (title, editorial_id)
SELECT 'El Cementerio de los Libros Olvidados', (SELECT id FROM editorials WHERE name = 'Planeta')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'El Cementerio de los Libros Olvidados');

INSERT INTO book_series (title, editorial_id)
SELECT 'El Portador de la Luz', (SELECT id FROM editorials WHERE name = 'DeBolsillo')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'El Portador de la Luz');

INSERT INTO book_series (title, editorial_id)
SELECT 'El Señor de los Anillos', (SELECT id FROM editorials WHERE name = 'Minotauro')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'El Señor de los Anillos');

INSERT INTO book_series (title, editorial_id)
SELECT 'El Testamento Maya', (SELECT id FROM editorials WHERE name = 'Grijalbo')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'El Testamento Maya');

INSERT INTO book_series (title, editorial_id)
SELECT 'El Ángel de la Noche', (SELECT id FROM editorials WHERE name = 'DeBolsillo')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'El Ángel de la Noche');

INSERT INTO book_series (title, editorial_id)
SELECT 'Genshin Impact Artbook', (SELECT id FROM editorials WHERE name = 'Tianwen Kadokawa')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Genshin Impact Artbook');

INSERT INTO book_series (title, editorial_id)
SELECT 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi)', (SELECT id FROM editorials WHERE name = 'Seven Seas')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi)');

INSERT INTO book_series (title, editorial_id)
SELECT 'Guardian (Zhen Hun)', (SELECT id FROM editorials WHERE name = 'Seven Seas')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Guardian (Zhen Hun)');

INSERT INTO book_series (title, editorial_id)
SELECT 'Harry Potter', (SELECT id FROM editorials WHERE name = 'Salamandra')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Harry Potter');

INSERT INTO book_series (title, editorial_id)
SELECT 'Heaven Official Blessing (Tian Guan Ci Fu)', (SELECT id FROM editorials WHERE name = 'Seven Seas')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Heaven Official Blessing (Tian Guan Ci Fu)');

INSERT INTO book_series (title, editorial_id)
SELECT 'Howl', (SELECT id FROM editorials WHERE name = 'Berenice')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Howl');

INSERT INTO book_series (title, editorial_id)
SELECT 'La Bella Salvaje', (SELECT id FROM editorials WHERE name = 'Roca Editorial')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'La Bella Salvaje');

INSERT INTO book_series (title, editorial_id)
SELECT 'La Biblioteca de los Muertos', (SELECT id FROM editorials WHERE name = 'DeBolsillo')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'La Biblioteca de los Muertos');

INSERT INTO book_series (title, editorial_id)
SELECT 'La Crónica del Asesino de Reyes', (SELECT id FROM editorials WHERE name = 'DeBolsillo')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'La Crónica del Asesino de Reyes');

INSERT INTO book_series (title, editorial_id)
SELECT 'La Librería Morisaki', (SELECT id FROM editorials WHERE name = 'Letras de Plata')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'La Librería Morisaki');

INSERT INTO book_series (title, editorial_id)
SELECT 'La Materia Oscura', (SELECT id FROM editorials WHERE name = 'Editorial B')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'La Materia Oscura');

INSERT INTO book_series (title, editorial_id)
SELECT 'La Muerte del Comendador', (SELECT id FROM editorials WHERE name = 'Tusquets Editores')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'La Muerte del Comendador');

INSERT INTO book_series (title, editorial_id)
SELECT 'Los Juegos del Hambre', (SELECT id FROM editorials WHERE name = 'RBA')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Los Juegos del Hambre');

INSERT INTO book_series (title, editorial_id)
SELECT 'Los Pilares de la Tierra', (SELECT id FROM editorials WHERE name = 'DeBolsillo')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Los Pilares de la Tierra');

INSERT INTO book_series (title, editorial_id)
SELECT 'Memorias de Idhún', (SELECT id FROM editorials WHERE name = 'SM')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Memorias de Idhún');

INSERT INTO book_series (title, editorial_id)
SELECT 'Remnants of Filth (YUWU)', (SELECT id FROM editorials WHERE name = 'Seven Seas')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Remnants of Filth (YUWU)');

INSERT INTO book_series (title, editorial_id)
SELECT 'Robert Langdon', (SELECT id FROM editorials WHERE name = 'Planeta')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Robert Langdon');

INSERT INTO book_series (title, editorial_id)
SELECT 'Sabikui Bisco', (SELECT id FROM editorials WHERE name = 'Yen ON')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Sabikui Bisco');

INSERT INTO book_series (title, editorial_id)
SELECT 'Saga de la familia Fleury', (SELECT id FROM editorials WHERE name = 'DeBolsillo')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Saga de la familia Fleury');

INSERT INTO book_series (title, editorial_id)
SELECT 'Sherlock Holmes', (SELECT id FROM editorials WHERE name = 'Penguin Clásicos')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Sherlock Holmes');

INSERT INTO book_series (title, editorial_id)
SELECT 'Taberna Kamogawa', (SELECT id FROM editorials WHERE name = 'DeBolsillo')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Taberna Kamogawa');

INSERT INTO book_series (title, editorial_id)
SELECT 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)', (SELECT id FROM editorials WHERE name = 'Seven Seas')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)');

INSERT INTO book_series (title, editorial_id)
SELECT 'The Lord of the Rings', (SELECT id FROM editorials WHERE name = 'HarperCollins')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'The Lord of the Rings');

INSERT INTO book_series (title, editorial_id)
SELECT 'The Sherlock Holmes Collection', (SELECT id FROM editorials WHERE name = 'RBA')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'The Sherlock Holmes Collection');

INSERT INTO book_series (title, editorial_id)
SELECT 'Thousand Autumns (Qian Qiu)', (SELECT id FROM editorials WHERE name = 'Seven Seas')
WHERE NOT EXISTS (SELECT 1 FROM book_series WHERE title = 'Thousand Autumns (Qian Qiu)');
