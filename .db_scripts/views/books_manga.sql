-- ============================================================
-- Vista: LIBROS
-- ============================================================
CREATE OR REPLACE VIEW public.libros_view AS
SELECT
  b.id,
  b.title AS "Título",
  (
    SELECT string_agg(a.name, ', ' ORDER BY a.name)
    FROM book_authors ba
    JOIN authors a ON a.id = ba.author_id
    WHERE ba.book_id = b.id
  ) AS "Autor",
  bs.title AS "Serie",
  b.serie_volume AS "Número volumen de la serie",
  b.notes AS "Notas",
  e.name AS "Editorial",
  b.adquisition_date AS "Fecha de adquisición",
  b.finish_date AS "Fecha fin lectura",
  b.reading_status AS "Estado"
FROM books b
LEFT JOIN editorials e ON e.id = b.editorial_id
LEFT JOIN book_series bs ON bs.id = b.serie_id
ORDER BY b.title;

-- ============================================================
-- Vista: MANGA
-- ============================================================
CREATE OR REPLACE VIEW public.manga_view AS
SELECT
  mv.id,
  m.title AS "Título",
  mv.volume_number AS "Número de volumen",
  mv.notes AS "Notas",
  mv.adquisition_date AS "Fecha de adquisición",
  mv.finish_date AS "Fecha fin lectura",
  mv.reading_status AS "Estado"
FROM manga_volumes mv
JOIN mangas m ON m.id = mv.manga_id
ORDER BY m.title, mv.volume_number;
