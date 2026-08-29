-- ============================================================
-- 00_alter_manga_volumes_constraint.sql
-- Elimina la restricción UNIQUE (manga_id, volume_number) de manga_volumes,
-- para poder tener varios tomos con el mismo número dentro del mismo manga
-- (por ejemplo, una edición especial que reutiliza el número de un tomo ya
-- existente, como "011 Special Edition").
--
-- El nombre de la restricción es el que aparece en el mensaje de error de
-- Supabase: "manga_volumes_manga_id_volume_number_key". Si tu restricción
-- tiene otro nombre, ajústalo tras consultarlo con la query de abajo.
-- ============================================================

-- Opcional: para confirmar el nombre exacto de la restricción antes de borrarla
-- SELECT conname FROM pg_constraint WHERE conrelid = 'manga_volumes'::regclass;

ALTER TABLE manga_volumes
DROP CONSTRAINT manga_volumes_manga_id_volume_number_key;

-- ============================================================
-- 00b_alter_manga_volumes_nullable.sql
-- Hace que volume_number dejen de ser obligatorio en manga_volumes,
-- para poder insertar tomos "extra" que no tienen un número real en el
-- Excel original (p. ej. "Links", "Illustrations", "Historias cortas").
-- ============================================================

ALTER TABLE manga_volumes
ALTER COLUMN volume_number DROP NOT NULL;
