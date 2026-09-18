-- Permite que una lectura anual quede "en curso" (sin fecha de fin todavía).
ALTER TABLE public.yearly_readings ALTER COLUMN end_date DROP NOT NULL;

ALTER TABLE public.yearly_readings DROP CONSTRAINT yearly_readings_date_check;
ALTER TABLE public.yearly_readings
  ADD CONSTRAINT yearly_readings_date_check
  CHECK (end_date IS NULL OR end_date >= start_date);