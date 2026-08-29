-- ============================================================
-- 04_books_and_authors.sql
-- Inserta los 288 libros de la hoja 'Novela' junto con sus relaciones
-- en book_authors (tabla puente). Requiere haber ejecutado antes
-- 01_authors.sql, 02_editorials.sql y 03_book_series.sql.
--
-- Cada INSERT usa un CTE (WITH ... RETURNING id) para encadenar la creación
-- del libro con la de sus vínculos en book_authors en una sola sentencia.
-- No es idempotente por título (el catálogo puede tener títulos repetidos
-- legítimos con distinta editorial/edición), así que antes de re-ejecutar
-- este script comprueba que no lo hayas corrido ya, o hazlo dentro de una
-- transacción que puedas revertir (BEGIN; ... ROLLBACK;).
--
-- Campos sin dato en el Excel (release_date, cover_image_url,
-- adquisition_date, start_date, finish_date) se dejan en NULL.
-- reading_status se fija a 'not_started' (no hay columna de progreso en el
-- Excel; el seguimiento de lectura vive en 'yearly_readings').
-- book_genres no se rellena: el Excel no tiene columna de género.
-- ============================================================

BEGIN;

-- El Testamento Maya (Steve Alten)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Testamento Maya', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Grijalbo'), (SELECT id FROM book_series WHERE title = 'El Testamento Maya'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Steve Alten') AS a;

-- La Resurrección Maya (Steve Alten)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Resurrección Maya', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Grijalbo'), (SELECT id FROM book_series WHERE title = 'El Testamento Maya'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Steve Alten') AS a;

-- Assassin's Creed (Oliver Bowden)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Assassin''s Creed', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'La Esfera de los Libros'), (SELECT id FROM book_series WHERE title = 'Assassin''s Creed'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Oliver Bowden') AS a;

-- Ángeles y demonios (Dan Brown)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ángeles y demonios', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Umbriel'), (SELECT id FROM book_series WHERE title = 'Robert Langdon'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Dan Brown') AS a;

-- El Código DaVinci (Dan Brown)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Código DaVinci', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Umbriel'), (SELECT id FROM book_series WHERE title = 'Robert Langdon'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Dan Brown') AS a;

-- El Símbolo Perdido (Dan Brown)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Símbolo Perdido', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Booket'), (SELECT id FROM book_series WHERE title = 'Robert Langdon'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Dan Brown') AS a;

-- Inferno (Dan Brown)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Inferno', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Planeta'), (SELECT id FROM book_series WHERE title = 'Robert Langdon'), 4)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Dan Brown') AS a;

-- Origen (Dan Brown)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Origen', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Planeta'), (SELECT id FROM book_series WHERE title = 'Robert Langdon'), 5)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Dan Brown') AS a;

-- La Conspiración (Dan Brown)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Conspiración', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Umbriel'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Dan Brown') AS a;

-- La Fortaleza Digital (Dan Brown)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Fortaleza Digital', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Umbriel'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Dan Brown') AS a;

-- Alicia en el País de las Maravillas y a Través del Espejo (Lewis Carrol)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Alicia en el País de las Maravillas y a Través del Espejo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Alianza Editorial'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Lewis Carrol') AS a;

-- Los Juegos del Hambre (Suzanne Collins)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Los Juegos del Hambre', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'Los Juegos del Hambre'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Suzanne Collins') AS a;

-- En Llamas (Suzanne Collins)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('En Llamas', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'Los Juegos del Hambre'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Suzanne Collins') AS a;

-- Sinsajo (Suzanne Collins)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Sinsajo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'Los Juegos del Hambre'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Suzanne Collins') AS a;

-- Sherlock Holmes: Estudio en Escarlata (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Sherlock Holmes: Estudio en Escarlata', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'Sherlock Holmes'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- Sherlock Holmes: Novelas (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Sherlock Holmes: Novelas', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Penguin Clásicos'), (SELECT id FROM book_series WHERE title = 'Sherlock Holmes'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- Sherlock Holmes: Relatos 1 (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Sherlock Holmes: Relatos 1', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Penguin Clásicos'), (SELECT id FROM book_series WHERE title = 'Sherlock Holmes'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- Sherlock Holmes: Relatos 2 (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Sherlock Holmes: Relatos 2', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Penguin Clásicos'), (SELECT id FROM book_series WHERE title = 'Sherlock Holmes'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- The Sherlock Holmes Complete Collection (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Sherlock Holmes Complete Collection', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Vintage Classics'), (SELECT id FROM book_series WHERE title = 'Sherlock Holmes'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- The Case Files of Sherlock Holmes (autor desconocido)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Case Files of Sherlock Holmes', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Andre Deutsch'), (SELECT id FROM book_series WHERE title = 'Sherlock Holmes'), NULL)
  RETURNING id
)
SELECT 1; -- sin autor conocido en el Excel: no se crea ningún vínculo en book_authors

-- La Biblioteca de los Muertos (Glenn Cooper)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Biblioteca de los Muertos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'La Biblioteca de los Muertos'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Glenn Cooper') AS a;

-- El Fin de los Escribas (Glenn Cooper)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Fin de los Escribas', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'La Biblioteca de los Muertos'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Glenn Cooper') AS a;

-- El Violinista de Praga (Michael Crane)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Violinista de Praga', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Michael Crane') AS a;

-- El Hombre en el Castillo (Phillip K. Dick)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Hombre en el Castillo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Booket'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Phillip K. Dick') AS a;

-- Grandes Esperanzas (Charles Dickens)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Grandes Esperanzas', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Penguin Clásicos'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Charles Dickens') AS a;

-- Los Papeles Póstumos del Club Pitwick (Charles Dickens)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Los Papeles Póstumos del Club Pitwick', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Penguin Clásicos'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Charles Dickens') AS a;

-- Nuestro Amigo Común (Charles Dickens)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Nuestro Amigo Común', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Penguin Clásicos'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Charles Dickens') AS a;

-- Oliver Twist (Charles Dickens)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Oliver Twist', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Penguin Clásicos'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Charles Dickens') AS a;

-- La Catedral del Mar (Ildefonso Falcones)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Catedral del Mar', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Grijalbo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Ildefonso Falcones') AS a;

-- La Mano de Fátima (Ildefonso Falcones)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Mano de Fátima', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Ildefonso Falcones') AS a;

-- Los Pilares de la Tierra (Ken Follet)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Los Pilares de la Tierra', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'Los Pilares de la Tierra'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Ken Follet') AS a;

-- El Canto del Cuco (Robert Galbraith)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Canto del Cuco', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Booket'), (SELECT id FROM book_series WHERE title = 'Cormoran Strike'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Robert Galbraith') AS a;

-- Alas de Fuego (Laura Gallego)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Alas de Fuego', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Minotauro'), (SELECT id FROM book_series WHERE title = 'Ahriel'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Laura Gallego') AS a;

-- Alas Negras (Laura Gallego)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Alas Negras', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Minotauro'), (SELECT id FROM book_series WHERE title = 'Ahriel'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Laura Gallego') AS a;

-- La Resistencia (Laura Gallego)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Resistencia', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'SM'), (SELECT id FROM book_series WHERE title = 'Memorias de Idhún'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Laura Gallego') AS a;

-- Tríada (Laura Gallego)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Tríada', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'SM'), (SELECT id FROM book_series WHERE title = 'Memorias de Idhún'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Laura Gallego') AS a;

-- Panteón (Laura Gallego)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Panteón', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'SM'), (SELECT id FROM book_series WHERE title = 'Memorias de Idhún'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Laura Gallego') AS a;

-- How to Stop Time (Matt Haig)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('How to Stop Time', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Canongate'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Matt Haig') AS a;

-- El Laberinto de la Rosa (Titania Hardie)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Laberinto de la Rosa', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Suma'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Titania Hardie') AS a;

-- El Castillo Ambulante (Diana Jones Wynne)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Castillo Ambulante', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Berenice'), (SELECT id FROM book_series WHERE title = 'Howl'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Diana Jones Wynne') AS a;

-- El Sol bajo la Seda (Eric Marchal)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Sol bajo la Seda', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Eric Marchal') AS a;

-- The Child in Time (Ian McEwan)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Child in Time', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Vintage'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Ian McEwan') AS a;

-- El Ocho (Katherine Neville)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Ocho', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'Catherine Velis'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Katherine Neville') AS a;

-- El Fuego (Katherine Neville)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Fuego', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'Catherine Velis'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Katherine Neville') AS a;

-- Luces del Norte (Phillip Pullman)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Luces del Norte', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Editorial B'), (SELECT id FROM book_series WHERE title = 'La Materia Oscura'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Phillip Pullman') AS a;

-- La Daga (Phillip Pullman)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Daga', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Editorial B'), (SELECT id FROM book_series WHERE title = 'La Materia Oscura'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Phillip Pullman') AS a;

-- El Catalejo Lacado (Phillip Pullman)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Catalejo Lacado', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Editorial B'), (SELECT id FROM book_series WHERE title = 'La Materia Oscura'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Phillip Pullman') AS a;

-- El Nombre del Viento (Patrick Rothfuss)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Nombre del Viento', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'La Crónica del Asesino de Reyes'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Patrick Rothfuss') AS a;

-- El Temor de un Hombre Sabio (Patrick Rothfuss)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Temor de un Hombre Sabio', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'La Crónica del Asesino de Reyes'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Patrick Rothfuss') AS a;

-- La Música del Silencio (Patrick Rothfuss)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Música del Silencio', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Patrick Rothfuss') AS a;

-- Harry Potter and the Philosopher's Stone (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter and the Philosopher''s Stone', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Ed. Especial Ravenclaw', 'EN', (SELECT id FROM editorials WHERE name = 'Bloomsbury'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y La Piedra Filosofal (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y La Piedra Filosofal', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y la Cámara de los Secretos (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y la Cámara de los Secretos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y el Prisionero de Azkaban (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y el Prisionero de Azkaban', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y el Cáliz de Fuego (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y el Cáliz de Fuego', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 4)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y la Órden del Fénix (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y la Órden del Fénix', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 5)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y el Misterio del Príncipe (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y el Misterio del Príncipe', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 6)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y las Reliquias de la Muerte (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y las Reliquias de la Muerte', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 7)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- La Sombra del Viento (Carlos Ruíz Zafón)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Sombra del Viento', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Planeta'), (SELECT id FROM book_series WHERE title = 'El Cementerio de los Libros Olvidados'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Carlos Ruíz Zafón') AS a;

-- El Juego del Ángel (Carlos Ruíz Zafón)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Juego del Ángel', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Planeta'), (SELECT id FROM book_series WHERE title = 'El Cementerio de los Libros Olvidados'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Carlos Ruíz Zafón') AS a;

-- Frankenstein (Mary Shelley)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Frankenstein', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Anaya'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mary Shelley') AS a;

-- La Isla del Tesoro (Robert Louis Stevenson)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Isla del Tesoro', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Penguin Clásicos'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Robert Louis Stevenson') AS a;

-- Harry Potter y el Legado Maldito (John Tiffany)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y el Legado Maldito', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Tiffany' UNION ALL SELECT id FROM authors WHERE name = 'Jack Thorne') AS a;

-- La Comunidad del Anillo (John Ronald Reuel Tolkien)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Comunidad del Anillo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Minotauro'), (SELECT id FROM book_series WHERE title = 'El Señor de los Anillos'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Ronald Reuel Tolkien') AS a;

-- Las Dos Torres (John Ronald Reuel Tolkien)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Las Dos Torres', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Minotauro'), (SELECT id FROM book_series WHERE title = 'El Señor de los Anillos'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Ronald Reuel Tolkien') AS a;

-- El Retorno del Rey (John Ronald Reuel Tolkien)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Retorno del Rey', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Minotauro'), (SELECT id FROM book_series WHERE title = 'El Señor de los Anillos'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Ronald Reuel Tolkien') AS a;

-- Cuentos Inconclusos de Númenor y la Tierra Media (John Ronald Reuel Tolkien)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Cuentos Inconclusos de Númenor y la Tierra Media', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Minotauro'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Ronald Reuel Tolkien') AS a;

-- O Hobbit (John Ronald Reuel Tolkien)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('O Hobbit', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Xerais'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Ronald Reuel Tolkien') AS a;

-- El Silmarillion (John Ronald Reuel Tolkien)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Silmarillion', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Minotauro'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Ronald Reuel Tolkien') AS a;

-- La Mujer de las Nueve Lunas (Carmen Torres Ripa)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Mujer de las Nueve Lunas', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Carmen Torres Ripa') AS a;

-- El Camino de las Sombras (Brent Weeks)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Camino de las Sombras', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'El Ángel de la Noche'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Brent Weeks') AS a;

-- Al Filo de las Sombras (Brent Weeks)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Al Filo de las Sombras', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'El Ángel de la Noche'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Brent Weeks') AS a;

-- Más allá de las Sombras (Brent Weeks)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Más allá de las Sombras', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'El Ángel de la Noche'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Brent Weeks') AS a;

-- La Sal de la Tierra (Daniel Wolf)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Sal de la Tierra', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'Saga de la familia Fleury'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Daniel Wolf') AS a;

-- La Luz de la Tierra (Daniel Wolf)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Luz de la Tierra', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'Saga de la familia Fleury'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Daniel Wolf') AS a;

-- El Oro del Mar (Daniel Wolf)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Oro del Mar', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'Saga de la familia Fleury'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Daniel Wolf') AS a;

-- La Plaga del Cielo (Daniel Wolf)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Plaga del Cielo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'Saga de la familia Fleury'), 4)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Daniel Wolf') AS a;

-- The Wit and Wisdom of Sherlock Holmes (autor desconocido)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Wit and Wisdom of Sherlock Holmes', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Prion'), NULL, NULL)
  RETURNING id
)
SELECT 1; -- sin autor conocido en el Excel: no se crea ningún vínculo en book_authors

-- Sabikui Bisco vol. 1 (Shinji Cobkubo)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Sabikui Bisco vol. 1', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Sabikui Bisco'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Shinji Cobkubo') AS a;

-- Sabikui Bisco vol. 2: Blood Pressure! Super Monk Kelshinha (Shinji Cobkubo)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Sabikui Bisco vol. 2: Blood Pressure! Super Monk Kelshinha', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Sabikui Bisco'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Shinji Cobkubo') AS a;

-- Sabikui Bisco vol. 3: Urban Life-style "Tokyo" (Shinji Cobkubo)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Sabikui Bisco vol. 3: Urban Life-style "Tokyo"', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Sabikui Bisco'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Shinji Cobkubo') AS a;

-- Rimas y Leyendas (Gustavo Adolfo Becquer)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Rimas y Leyendas', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Gustavo Adolfo Becquer') AS a;

-- Convenience Store Woman (Sayaka Murata)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Convenience Store Woman', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Granta'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sayaka Murata') AS a;

-- Ready Player One (Ernest Cline)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ready Player One', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Anagrama'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Ernest Cline') AS a;

-- La Noche y su Luna (Piper C.J.)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Noche y su Luna', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Alfaguara'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Piper C.J.') AS a;

-- Los Herederos de la Tierra (Ildefonso Falcones)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Los Herederos de la Tierra', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Ildefonso Falcones') AS a;

-- Hielo y Plata (Alena Pons)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Hielo y Plata', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Blackie Books'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Alena Pons') AS a;

-- Os Dóus de Sempre (Alfonso R. Castelao)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Os Dóus de Sempre', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'GL', (SELECT id FROM editorials WHERE name = 'Galaxia'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Alfonso R. Castelao') AS a;

-- A Nosa Cinza (Xavier Alcalá)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('A Nosa Cinza', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'GL', (SELECT id FROM editorials WHERE name = 'Galaxia'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Xavier Alcalá') AS a;

-- No. 6 (Atsuko Asano)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('No. 6', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Atsuko Asano') AS a;

-- Heaven Official Blessing (Tian Guan Ci Fu) vol. 1 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Heaven Official Blessing (Tian Guan Ci Fu) vol. 1', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Heaven Official Blessing (Tian Guan Ci Fu)'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Heaven Official Blessing (Tian Guan Ci Fu) vol. 2 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Heaven Official Blessing (Tian Guan Ci Fu) vol. 2', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Heaven Official Blessing (Tian Guan Ci Fu)'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Heaven Official Blessing (Tian Guan Ci Fu) vol. 3 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Heaven Official Blessing (Tian Guan Ci Fu) vol. 3', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Heaven Official Blessing (Tian Guan Ci Fu)'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Heaven Official Blessing (Tian Guan Ci Fu) vol. 4 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Heaven Official Blessing (Tian Guan Ci Fu) vol. 4', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Heaven Official Blessing (Tian Guan Ci Fu)'), 4)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Heaven Official Blessing (Tian Guan Ci Fu) vol. 5 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Heaven Official Blessing (Tian Guan Ci Fu) vol. 5', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Heaven Official Blessing (Tian Guan Ci Fu)'), 5)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Heaven Official Blessing (Tian Guan Ci Fu) vol. 6 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Heaven Official Blessing (Tian Guan Ci Fu) vol. 6', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Heaven Official Blessing (Tian Guan Ci Fu)'), 6)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Heaven Official Blessing (Tian Guan Ci Fu) vol. 7 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Heaven Official Blessing (Tian Guan Ci Fu) vol. 7', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Heaven Official Blessing (Tian Guan Ci Fu)'), 7)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Heaven Official Blessing (Tian Guan Ci Fu) vol. 8 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Heaven Official Blessing (Tian Guan Ci Fu) vol. 8', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Heaven Official Blessing (Tian Guan Ci Fu)'), 8)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 1 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 1', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi)'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 2 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 2', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi)'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 3 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 3', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi)'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 4 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 4', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi)'), 4)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 5 (Mo Xiang Tong Xiu)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 5', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi)'), 5)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mo Xiang Tong Xiu') AS a;

-- Remnants of Filth (YUWU) vol. 1 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Remnants of Filth (YUWU) vol. 1', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Remnants of Filth (YUWU)'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- Remnants of Filth (YUWU) vol. 2 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Remnants of Filth (YUWU) vol. 2', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Remnants of Filth (YUWU)'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- Remnants of Filth (YUWU) vol. 3 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Remnants of Filth (YUWU) vol. 3', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Remnants of Filth (YUWU)'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- Remnants of Filth (YUWU) vol. 4 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Remnants of Filth (YUWU) vol. 4', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Remnants of Filth (YUWU)'), 4)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- Remnants of Filth (YUWU) vol. 5 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Remnants of Filth (YUWU) vol. 5', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Remnants of Filth (YUWU)'), 5)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- Remnants of Filth (YUWU) vol. 6 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Remnants of Filth (YUWU) vol. 6', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Remnants of Filth (YUWU)'), 6)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- Remnants of Filth (YUWU) vol. 7 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Remnants of Filth (YUWU) vol. 7', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Remnants of Filth (YUWU)'), 7)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- Japón con Jamón (Nekojitablog)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Japón con Jamón', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Norma Editorial'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Nekojitablog') AS a;

-- Minna no Nihongo (3A Corporation)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Minna no Nihongo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'JP', (SELECT id FROM editorials WHERE name = '3A Network'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = '3A Corporation') AS a;

-- KOI: Manual Básico de Japonés (Yoko Nakazawa)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('KOI: Manual Básico de Japonés', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Yoko Nakazawa') AS a;

-- Sugoi: Japonés para Viajeros (Takeshi Hirano)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Sugoi: Japonés para Viajeros', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Takeshi Hirano') AS a;

-- Lo Mejor de Japón (VVAA)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Lo Mejor de Japón', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Lonely Planet'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'VVAA') AS a;

-- Cuentos (Edgar Allan Poe)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Cuentos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Edgar Allan Poe') AS a;

-- La Tienda de Antigüedades (Charles Dickens)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Tienda de Antigüedades', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Blackie Books'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Charles Dickens') AS a;

-- Crimen y Castigo (Fiódor Dostoievski)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Crimen y Castigo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Fiódor Dostoievski') AS a;

-- Relatos (Edgar Allan Poe)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Relatos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Edgar Allan Poe') AS a;

-- El Escarabajo de Oro (Edgar Allan Poe)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Escarabajo de Oro', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Anaya'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Edgar Allan Poe') AS a;

-- El Principito (Antonine de Saint-Exupéry)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Principito', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Antonine de Saint-Exupéry') AS a;

-- 1984 (George Orwell)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('1984', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'George Orwell') AS a;

-- Don Quijote de la Mancha (Miguel de Cervantes)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Don Quijote de la Mancha', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Santillana'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Miguel de Cervantes') AS a;

-- Viaje al Centro de la Tierra (Julio Verne)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Viaje al Centro de la Tierra', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Julio Verne') AS a;

-- De la Tierra a la Luna (Julio Verne)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('De la Tierra a la Luna', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Julio Verne') AS a;

-- La Vuelta al Mundo en Ochenta Días (Julio Verne)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Vuelta al Mundo en Ochenta Días', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Julio Verne') AS a;

-- El Viejo y el Mar (Ernest Hemingway)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Viejo y el Mar', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Ernest Hemingway') AS a;

-- A Christmas Carol (Charles Dickens)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('A Christmas Carol', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Charles Dickens') AS a;

-- La Luz que no Puedes Ver (Anthony Doerr)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Luz que no Puedes Ver', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Anthony Doerr') AS a;

-- El Prisma Negro (Brent Weeks)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Prisma Negro', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'El Portador de la Luz'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Brent Weeks') AS a;

-- La Daga de la Ceguera (Brent Weeks)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Daga de la Ceguera', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'El Portador de la Luz'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Brent Weeks') AS a;

-- El Ojo Fragmentado (Brent Weeks)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Ojo Fragmentado', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'El Portador de la Luz'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Brent Weeks') AS a;

-- Forjada en la Tormenta (David B. Gil)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Forjada en la Tormenta', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'David B. Gil') AS a;

-- Ocho Millones de Dioses (David B. Gil)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ocho Millones de Dioses', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'David B. Gil') AS a;

-- El Guerrero a la Sombra del Cerezo (David B. Gil)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Guerrero a la Sombra del Cerezo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'David B. Gil') AS a;

-- Your name (Makoto Shinkai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Your name', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Planeta'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Makoto Shinkai') AS a;

-- El Libro de la Oscuridad (Phillip Pullman)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Libro de la Oscuridad', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, (SELECT id FROM book_series WHERE title = 'La Bella Salvaje'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Phillip Pullman') AS a;

-- Beyond the Wand (Tom Felton)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Beyond the Wand', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Penguin'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Tom Felton') AS a;

-- Mi Vecino Miyazaki (Álvaro Lopez)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Mi Vecino Miyazaki', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Diábolo Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Álvaro Lopez' UNION ALL SELECT id FROM authors WHERE name = 'Marta García') AS a;

-- The Husky and his White Cat Shizun vol. 1 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Husky and his White Cat Shizun vol. 1', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- The Husky and his White Cat Shizun vol. 2 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Husky and his White Cat Shizun vol. 2', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- The Husky and his White Cat Shizun vol. 3 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Husky and his White Cat Shizun vol. 3', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- The Husky and his White Cat Shizun vol. 4 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Husky and his White Cat Shizun vol. 4', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)'), 4)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- The Husky and his White Cat Shizun vol. 5 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Husky and his White Cat Shizun vol. 5', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)'), 5)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- The Husky and his White Cat Shizun vol. 6 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Husky and his White Cat Shizun vol. 6', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)'), 6)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- The Husky and his White Cat Shizun vol. 7 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Husky and his White Cat Shizun vol. 7', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)'), 7)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- The Husky and his White Cat Shizun vol. 8 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Husky and his White Cat Shizun vol. 8', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)'), 8)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- The Husky and his White Cat Shizun vol. 9 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Husky and his White Cat Shizun vol. 9', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)'), 9)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- The Husky and his White Cat Shizun vol. 10 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Husky and his White Cat Shizun vol. 10', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)'), 10)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- The Husky and his White Cat Shizun vol. 11 (Rou Bao Bu Chi Rou)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Husky and his White Cat Shizun vol. 11', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)'), 11)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Rou Bao Bu Chi Rou') AS a;

-- Genshin Impact Artbook: Mondstadt and Liyue (miHoYo / HoYoverse)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Genshin Impact Artbook: Mondstadt and Liyue', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, NULL, (SELECT id FROM editorials WHERE name = 'Tianwen Kadokawa'), (SELECT id FROM book_series WHERE title = 'Genshin Impact Artbook'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'miHoYo / HoYoverse') AS a;

-- Genshin Impact Artbook: Inazuma (miHoYo / HoYoverse)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Genshin Impact Artbook: Inazuma', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, NULL, (SELECT id FROM editorials WHERE name = 'Tianwen Kadokawa'), (SELECT id FROM book_series WHERE title = 'Genshin Impact Artbook'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'miHoYo / HoYoverse') AS a;

-- Genshin Impact Artbook: Sumeru (miHoYo / HoYoverse)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Genshin Impact Artbook: Sumeru', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, NULL, (SELECT id FROM editorials WHERE name = 'Tianwen Kadokawa'), (SELECT id FROM book_series WHERE title = 'Genshin Impact Artbook'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'miHoYo / HoYoverse') AS a;

-- Thousand Autumns vol. 1 (Meng Xi Shi)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Thousand Autumns vol. 1', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Thousand Autumns (Qian Qiu)'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Meng Xi Shi') AS a;

-- Thousand Autumns vol. 2 (Meng Xi Shi)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Thousand Autumns vol. 2', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Thousand Autumns (Qian Qiu)'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Meng Xi Shi') AS a;

-- Thousand Autumns vol. 3 (Meng Xi Shi)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Thousand Autumns vol. 3', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Thousand Autumns (Qian Qiu)'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Meng Xi Shi') AS a;

-- Thousand Autumns vol. 4 (Meng Xi Shi)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Thousand Autumns vol. 4', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Thousand Autumns (Qian Qiu)'), 4)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Meng Xi Shi') AS a;

-- Thousand Autumns vol. 5 (Meng Xi Shi)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Thousand Autumns vol. 5', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Thousand Autumns (Qian Qiu)'), 5)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Meng Xi Shi') AS a;

-- Guardian vol. 1 (priest)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Guardian vol. 1', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Guardian (Zhen Hun)'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'priest') AS a;

-- Guardian vol. 2 (priest)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Guardian vol. 2', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Guardian (Zhen Hun)'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'priest') AS a;

-- Guardian vol. 3 (priest)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Guardian vol. 3', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Guardian (Zhen Hun)'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'priest') AS a;

-- Ballad of Sword and Wine vol. 1 (Tang Jiu Qing)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ballad of Sword and Wine vol. 1', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Ballad of Sword and Wine (Qiang Jin Jiu)'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Tang Jiu Qing') AS a;

-- Ballad of Sword and Wine vol. 2 (Tang Jiu Qing)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ballad of Sword and Wine vol. 2', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Ballad of Sword and Wine (Qiang Jin Jiu)'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Tang Jiu Qing') AS a;

-- Ballad of Sword and Wine vol. 3 (Tang Jiu Qing)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ballad of Sword and Wine vol. 3', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Ballad of Sword and Wine (Qiang Jin Jiu)'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Tang Jiu Qing') AS a;

-- Ballad of Sword and Wine vol. 4 (Tang Jiu Qing)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ballad of Sword and Wine vol. 4', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Ballad of Sword and Wine (Qiang Jin Jiu)'), 4)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Tang Jiu Qing') AS a;

-- Ballad of Sword and Wine vol. 5 (Tang Jiu Qing)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ballad of Sword and Wine vol. 5', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Ballad of Sword and Wine (Qiang Jin Jiu)'), 5)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Tang Jiu Qing') AS a;

-- Ballad of Sword and Wine vol. 6 (Tang Jiu Qing)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ballad of Sword and Wine vol. 6', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Ballad of Sword and Wine (Qiang Jin Jiu)'), 6)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Tang Jiu Qing') AS a;

-- Ballad of Sword and Wine vol. 7 (Tang Jiu Qing)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ballad of Sword and Wine vol. 7', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Ballad of Sword and Wine (Qiang Jin Jiu)'), 7)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Tang Jiu Qing') AS a;

-- Ballad of Sword and Wine vol. 8 (Tang Jiu Qing)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ballad of Sword and Wine vol. 8', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Seven Seas'), (SELECT id FROM book_series WHERE title = 'Ballad of Sword and Wine (Qiang Jin Jiu)'), 8)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Tang Jiu Qing') AS a;

-- Osamu Dazai's Entrance Exam (Kafka Asagiri)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Osamu Dazai''s Entrance Exam', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kafka Asagiri') AS a;

-- Osamu Dazai and the Dark Era (Kafka Asagiri)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Osamu Dazai and the Dark Era', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kafka Asagiri') AS a;

-- The Untold Origins of the Detective Agency (Kafka Asagiri)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Untold Origins of the Detective Agency', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kafka Asagiri') AS a;

-- 55 minutes (Kafka Asagiri)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('55 minutes', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels'), 4)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kafka Asagiri') AS a;

-- Dead Apple (Kafka Asagiri)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Dead Apple', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels'), 5)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kafka Asagiri') AS a;

-- Beast (Kafka Asagiri)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Beast', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels'), 6)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kafka Asagiri') AS a;

-- Dazai, Chuuya, Age Fifteen (Kafka Asagiri)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Dazai, Chuuya, Age Fifteen', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels'), 7)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kafka Asagiri') AS a;

-- Stormbringer (Kafka Asagiri)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Stormbringer', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels'), 8)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kafka Asagiri') AS a;

-- The Day I took in Dazai (Kafka Asagiri)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Day I took in Dazai', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels'), 9)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kafka Asagiri') AS a;

-- Bungo Stray Dogs: Novel Version (Kafka Asagiri)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Bungo Stray Dogs: Novel Version', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kafka Asagiri') AS a;

-- Another Story (Kafka Asagiri)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Another Story', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Yen ON'), (SELECT id FROM book_series WHERE title = 'Bungo Stray Dogs: Light novels'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kafka Asagiri') AS a;

-- Heike Monogatari (autor desconocido)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Heike Monogatari', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
SELECT 1; -- sin autor conocido en el Excel: no se crea ningún vínculo en book_authors

-- El Dragón, Rashomon y otros cuentos (Akutagawa Ryunosuke)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Dragón, Rashomon y otros cuentos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Akutagawa Ryunosuke') AS a;

-- Kokoro (Natsume Soseki)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Kokoro', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Impedimenta'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Natsume Soseki') AS a;

-- El Señor de los Anillos (John Ronald Reuel Tolkien)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Señor de los Anillos', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Ilustrado por el autor', 'ES', (SELECT id FROM editorials WHERE name = 'Minotauro'), (SELECT id FROM book_series WHERE title = 'El Señor de los Anillos'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Ronald Reuel Tolkien') AS a;

-- The Fellowship of the Ring (John Ronald Reuel Tolkien)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Fellowship of the Ring', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'HarperCollins'), (SELECT id FROM book_series WHERE title = 'The Lord of the Rings'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Ronald Reuel Tolkien') AS a;

-- The Two Towers (John Ronald Reuel Tolkien)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Two Towers', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'HarperCollins'), (SELECT id FROM book_series WHERE title = 'The Lord of the Rings'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Ronald Reuel Tolkien') AS a;

-- The Return of the King (John Ronald Reuel Tolkien)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Return of the King', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'HarperCollins'), (SELECT id FROM book_series WHERE title = 'The Lord of the Rings'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Ronald Reuel Tolkien') AS a;

-- The Lord of the Rings: A Reader's Companion (Wayne G. Hammond)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Lord of the Rings: A Reader''s Companion', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'HarperCollins'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Wayne G. Hammond' UNION ALL SELECT id FROM authors WHERE name = 'Christina Scull') AS a;

-- El Hobbit (John Ronald Reuel Tolkien)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Hobbit', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Booket'), (SELECT id FROM book_series WHERE title = 'The Lord of the Rings'), 0)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'John Ronald Reuel Tolkien') AS a;

-- Underground (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Underground', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- 1Q84 (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('1Q84', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), (SELECT id FROM book_series WHERE title = '1Q85'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- 1Q85 (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('1Q85', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), (SELECT id FROM book_series WHERE title = '1Q86'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- 1Q86 (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('1Q86', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), (SELECT id FROM book_series WHERE title = '1Q87'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- El Fin del Mundo y un Despiadado País de las Maravillas (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Fin del Mundo y un Despiadado País de las Maravillas', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- La Crónica del Pájaro que Da Cuerda al Mundo (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Crónica del Pájaro que Da Cuerda al Mundo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- Tokio Blues. Norwegian Wood (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Tokio Blues. Norwegian Wood', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- Después del Terremoto (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Después del Terremoto', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- Primera Persona del Singular (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Primera Persona del Singular', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- Los Años de Peregrinación del Mundo sin Color (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Los Años de Peregrinación del Mundo sin Color', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- After Dark (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('After Dark', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- La Muerte del Comendador (Haruki Murakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Muerte del Comendador', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Tusquets Editores'), (SELECT id FROM book_series WHERE title = 'La Muerte del Comendador'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Haruki Murakami') AS a;

-- Harry Potter y La Piedra Filosofal (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y La Piedra Filosofal', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y la Cámara de los Secretos (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y la Cámara de los Secretos', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y el Prisionero de Azkaban (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y el Prisionero de Azkaban', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y el Cáliz de Fuego (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y el Cáliz de Fuego', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 4)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y la Órden del Fénix (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y la Órden del Fénix', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 5)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y el Misterio del Príncipe (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y el Misterio del Príncipe', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 6)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y las Reliquias de la Muerte (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y las Reliquias de la Muerte', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 7)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y La Piedra Filosofal (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y La Piedra Filosofal', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Minalima', 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y la Cámara de los Secretos (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y la Cámara de los Secretos', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Minalima', 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Harry Potter y el Prisionero de Azkaban (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Harry Potter y el Prisionero de Azkaban', 'not_started', NULL, NULL, NULL, NULL, NULL, 'Minalima', 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), 3)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Los Cuentos de Beedle el Bardo (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Los Cuentos de Beedle el Bardo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Quidditch a Través de los Tiempos (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Quidditch a Través de los Tiempos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Whizz Hard Books'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Animales Fantásticos y Dónde Encontrarlos (J. K. Rowling)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Animales Fantásticos y Dónde Encontrarlos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), (SELECT id FROM book_series WHERE title = 'Harry Potter'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'J. K. Rowling') AS a;

-- Estudio en Escarlata (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Estudio en Escarlata', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- El Signo de los Cuatro (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Signo de los Cuatro', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- Escándalo en Bohemia (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Escándalo en Bohemia', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- Estrella de Plata (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Estrella de Plata', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- El Carbunclo Azul (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Carbunclo Azul', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- El Problema Final (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Problema Final', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- El Sabueso de los Baskerville (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Sabueso de los Baskerville', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- La Casa Vacía (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Casa Vacía', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- El Enigma de la Mesa de Juego (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Enigma de la Mesa de Juego', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- El Vestido de la Reina (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Vestido de la Reina', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- El Pabellón Wisteria (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Pabellón Wisteria', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- El Valle del Terror (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Valle del Terror', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- La Piedra de Mazarino (Sir Arthur Conan Doyle)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Piedra de Mazarino', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'RBA'), (SELECT id FROM book_series WHERE title = 'The Sherlock Holmes Collection'), NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sir Arthur Conan Doyle') AS a;

-- El Santo del Monte Koya (Izumi Kyoka)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Santo del Monte Koya', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Izumi Kyoka') AS a;

-- Sobre el Dragón del Abismo (Izumi Kyoka)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Sobre el Dragón del Abismo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Izumi Kyoka') AS a;

-- El Futón (Tayama Katai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Futón', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Tayama Katai') AS a;

-- El Gorrión de Java (Natsume Soseki)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Gorrión de Java', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Natsume Soseki') AS a;

-- Daisuke (Natsume Soseki)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Daisuke', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Impedimenta'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Natsume Soseki') AS a;

-- Soy un Gato (Natsume Soseki)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Soy un Gato', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Impedimenta'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Natsume Soseki') AS a;

-- Kokoro (Natsume Soseki)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Kokoro', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Natsume Soseki') AS a;

-- El Signo de los Tiempos (Oda Sakunosuke)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Signo de los Tiempos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Oda Sakunosuke') AS a;

-- Sobre la Decadencia (Sakaguchi Ango)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Sobre la Decadencia', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sakaguchi Ango') AS a;

-- Tormenta de Flores (Osamu Dazai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Tormenta de Flores', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Osamu Dazai') AS a;

-- Indigno de Ser Humano (Osamu Dazai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Indigno de Ser Humano', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Osamu Dazai') AS a;

-- Indigno de Ser Humano (Osamu Dazai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Indigno de Ser Humano', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Al Margen - Sajalín editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Osamu Dazai') AS a;

-- Ocho Escenas de Tokio (Osamu Dazai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Ocho Escenas de Tokio', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Al Margen - Sajalín editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Osamu Dazai') AS a;

-- El Declive (Osamu Dazai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Declive', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Al Margen - Sajalín editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Osamu Dazai') AS a;

-- Repudiados (Osamu Dazai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Repudiados', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Al Margen - Sajalín editores'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Osamu Dazai') AS a;

-- La Caja de Pandora (Osamu Dazai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Caja de Pandora', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Ediciones Sajalín'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Osamu Dazai') AS a;

-- Cuentos de Cabecera (Osamu Dazai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Cuentos de Cabecera', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Osamu Dazai') AS a;

-- Recuerdos (Osamu Dazai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Recuerdos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Osamu Dazai') AS a;

-- La Felicidad de la Familia (Osamu Dazai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Felicidad de la Familia', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Candaya'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Osamu Dazai') AS a;

-- The Poems of Nakahara Chuuya (Chuuya Nakahara)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('The Poems of Nakahara Chuuya', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', (SELECT id FROM editorials WHERE name = 'Gracewing'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Chuuya Nakahara') AS a;

-- Abrazado a las Estrellas (Chuuya Nakahara)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Abrazado a las Estrellas', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Chuuya Nakahara') AS a;

-- Triste y Bello (Chuuya Nakahara)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Triste y Bello', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Chuuya Nakahara') AS a;

-- Rashomon y otros relatos históricos (Akutagawa Ryunosuke)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Rashomon y otros relatos históricos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Akutagawa Ryunosuke') AS a;

-- El Tabaco y el Diablo (Akutagawa Ryunosuke)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Tabaco y el Diablo', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Akutagawa Ryunosuke') AS a;

-- Vida de un Idiota (Akutagawa Ryunosuke)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Vida de un Idiota', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Akutagawa Ryunosuke') AS a;

-- Crímenes selectos (Edogawa Ranpo)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Crímenes selectos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Edogawa Ranpo') AS a;

-- Musashino (Kunikida Doppo)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Musashino', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Chidori Books'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kunikida Doppo') AS a;

-- El Tren Nocturno de la Vía Láctea (Miyazawa Kenji)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Tren Nocturno de la Vía Láctea', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Miyazawa Kenji') AS a;

-- Juventud (Mori Ogai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Juventud', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Mori Ogai') AS a;

-- El Vuelo del Ave Fénix (Akiko Yosano)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Vuelo del Ave Fénix', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Akiko Yosano') AS a;

-- El Elogio de la Sombra (Juniichiro Tanizaki)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Elogio de la Sombra', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Juniichiro Tanizaki') AS a;

-- Un Día de Nieve (Higuchi Ichiyo)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Un Día de Nieve', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Higuchi Ichiyo') AS a;

-- Crónicas del Gato Viajero (Hiro Arikawa)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Crónicas del Gato Viajero', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Hiro Arikawa') AS a;

-- El Pequeño Estudio de los Recuerdos Perdidos (Sanaka Hiiragi)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Pequeño Estudio de los Recuerdos Perdidos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Grijalbo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sanaka Hiiragi') AS a;

-- De Pronto Oigo la Voz del Agua (Hiromi Kawakami)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('De Pronto Oigo la Voz del Agua', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Alfaguara'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Hiromi Kawakami') AS a;

-- ¿Cómo vives? (Genzaburo Yoshino)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('¿Cómo vives?', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Genzaburo Yoshino') AS a;

-- La Luz del Norte (Hideo Yokohama)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('La Luz del Norte', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Salamandra'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Hideo Yokohama') AS a;

-- Si Pudiera Cambiarlos (autor desconocido)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Si Pudiera Cambiarlos', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
SELECT 1; -- sin autor conocido en el Excel: no se crea ningún vínculo en book_authors

-- Un Lugar Desconocido (Seicho Matsumoto)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Un Lugar Desconocido', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Seicho Matsumoto') AS a;

-- El Castillo de Arena (Seicho Matsumoto)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Castillo de Arena', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Seicho Matsumoto') AS a;

-- Antes de que se enfríe el café (Toshikazu Kawaguchi)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Antes de que se enfríe el café', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Toshikazu Kawaguchi') AS a;

-- El gato que amaba los libros (Sosuke Natsukawa)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El gato que amaba los libros', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Sosuke Natsukawa') AS a;

-- Los Misterios de la Taberna Kamogawa (Hisashi Kashiwai)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Los Misterios de la Taberna Kamogawa', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'DeBolsillo'), (SELECT id FROM book_series WHERE title = 'Taberna Kamogawa'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Hisashi Kashiwai') AS a;

-- Mis días en la librería Morisaki (Satoshi Yagisawa)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Mis días en la librería Morisaki', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, (SELECT id FROM book_series WHERE title = 'La Librería Morisaki'), 1)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Satoshi Yagisawa') AS a;

-- Una velada en la librería Morisaki (Satoshi Yagisawa)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Una velada en la librería Morisaki', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, (SELECT id FROM book_series WHERE title = 'La Librería Morisaki'), 2)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Satoshi Yagisawa') AS a;

-- Los sueños de la primavera (Teru Miyamoto)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Los sueños de la primavera', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Teru Miyamoto') AS a;

-- Territorio de Luz (Yuko Tsushima)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Territorio de Luz', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Impedimenta'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Yuko Tsushima') AS a;

-- El lenguaje de las flores (Alex Pler)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El lenguaje de las flores', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Alex Pler') AS a;

-- Folk tales of Japan (Kyota Ko)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Folk tales of Japan', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'EN', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Kyota Ko') AS a;

-- Kokoro (Lafcadio Hearn)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Kokoro', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Lafcadio Hearn') AS a;

-- Cien aspectos de la luna (Yoshitoshi)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Cien aspectos de la luna', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Yoshitoshi') AS a;

-- Kanjiru; La magia de los Kanji (Takeshi Hirano)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Kanjiru; La magia de los Kanji', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Takeshi Hirano') AS a;

-- Shiawase-do (Alex Pler)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Shiawase-do', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Alex Pler') AS a;

-- Mitos y leyendas de Japón (Frederick Hadland Davis)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Mitos y leyendas de Japón', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Frederick Hadland Davis') AS a;

-- Cuentos tradicionales de Japón (Richard Gordon Smith)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Cuentos tradicionales de Japón', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Richard Gordon Smith') AS a;

-- Kojiki: Crónicas de antiguos hechos de Japón (autor desconocido)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Kojiki: Crónicas de antiguos hechos de Japón', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
SELECT 1; -- sin autor conocido en el Excel: no se crea ningún vínculo en book_authors

-- Cuentos de un pasado lejano (VVAA)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Cuentos de un pasado lejano', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'VVAA') AS a;

-- El Código del Samurai (Inazo Nitobe)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El Código del Samurai', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', NULL, NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Inazo Nitobe') AS a;

-- El río sabe tu nombre (Jihyun Yun)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('El río sabe tu nombre', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Minotauro'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Jihyun Yun') AS a;

-- Misteláneas Primaverales (Natsume Soseki)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Misteláneas Primaverales', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Natsume Soseki') AS a;

-- Cuentos ilustrados japoneses (Teresa Pierce Williston)
WITH new_book AS (
  INSERT INTO books (
    title, reading_status, release_date, cover_image_url, adquisition_date,
    start_date, finish_date, notes, language, editorial_id, serie_id, serie_volume
  )
  VALUES ('Cuentos ilustrados japoneses', 'not_started', NULL, NULL, NULL, NULL, NULL, NULL, 'ES', (SELECT id FROM editorials WHERE name = 'Satori Ediciones'), NULL, NULL)
  RETURNING id
)
INSERT INTO book_authors (book_id, author_id)
SELECT new_book.id, a.id FROM new_book, (SELECT id FROM authors WHERE name = 'Teresa Pierce Williston') AS a;

COMMIT;
