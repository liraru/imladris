-- Cola personal de lecturas pendientes, ordenable manualmente.
-- A diferencia del resto de tablas, esta solo es accesible para usuarios autenticados
-- (no se concede acceso a "anon"), ya que la página es privada para el usuario logeado.

CREATE TABLE public.reading_plan (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL,
    authors text[] NOT NULL DEFAULT '{}'::text[],
    pages integer NOT NULL,
    cover_url text,
    "order" integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT reading_plan_pages_check CHECK (pages >= 0),
    CONSTRAINT reading_plan_order_check CHECK ("order" >= 0)
);

CREATE INDEX reading_plan_order_idx ON public.reading_plan USING btree ("order");

ALTER TABLE public.reading_plan ENABLE ROW LEVEL SECURITY;

CREATE POLICY reading_plan_select ON public.reading_plan
  FOR SELECT TO authenticated USING (true);

CREATE POLICY reading_plan_insert ON public.reading_plan
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY reading_plan_update ON public.reading_plan
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY reading_plan_delete ON public.reading_plan
  FOR DELETE TO authenticated USING (true);