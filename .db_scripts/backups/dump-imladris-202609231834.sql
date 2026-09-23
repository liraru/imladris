--
-- PostgreSQL database dump
--

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.0

-- Started on 2026-09-23 18:34:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- TOC entry 4154 (class 1262 OID 5)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4155 (class 0 OID 0)
-- Dependencies: 4154
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 4156 (class 0 OID 0)
-- Name: postgres; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE postgres SET "app.settings.jwt_exp" TO '3600';


\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 14 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4157 (class 0 OID 0)
-- Dependencies: 14
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 1232 (class 1247 OID 17486)
-- Name: country; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.country AS ENUM (
    'ES',
    'GB',
    'US',
    'JP',
    '-',
    'CN',
    'FR',
    'RU',
    'DE',
    'KR'
);


ALTER TYPE public.country OWNER TO postgres;

--
-- TOC entry 1241 (class 1247 OID 17516)
-- Name: demographic; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.demographic AS ENUM (
    'shonen',
    'shojo',
    'seinen',
    'josei',
    'kodomo'
);


ALTER TYPE public.demographic OWNER TO postgres;

--
-- TOC entry 1300 (class 1247 OID 18281)
-- Name: fanfic_rating; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.fanfic_rating AS ENUM (
    'Not Rated',
    'General Audiences',
    'Teen and Up Audiences',
    'Mature',
    'Explicit'
);


ALTER TYPE public.fanfic_rating OWNER TO postgres;

--
-- TOC entry 1244 (class 1247 OID 17528)
-- Name: genre; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.genre AS ENUM (
    'action',
    'adventure',
    'bl',
    'comedy',
    'danmei',
    'drama',
    'fantasy',
    'horror',
    'mystery',
    'psychological',
    'romance',
    'sci_fi',
    'slice_of_life',
    'sports',
    'supernatural',
    'thriller',
    'isekai',
    'mecha',
    'historical',
    'ecchi',
    'harem',
    'yaoi',
    'yuri'
);


ALTER TYPE public.genre OWNER TO postgres;

--
-- TOC entry 1235 (class 1247 OID 17496)
-- Name: language; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.language AS ENUM (
    'ES',
    'EN',
    'GL',
    'JP',
    'CN'
);


ALTER TYPE public.language OWNER TO postgres;

--
-- TOC entry 1238 (class 1247 OID 17506)
-- Name: reading_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.reading_status AS ENUM (
    'not_started',
    'reading',
    'finished',
    'abandoned'
);


ALTER TYPE public.reading_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 367 (class 1259 OID 17585)
-- Name: authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors (
    id bigint NOT NULL,
    name text NOT NULL,
    country public.country NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.authors OWNER TO postgres;

--
-- TOC entry 366 (class 1259 OID 17584)
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.authors ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.authors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 372 (class 1259 OID 17632)
-- Name: book_authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_authors (
    book_id bigint NOT NULL,
    author_id bigint NOT NULL
);


ALTER TABLE public.book_authors OWNER TO postgres;

--
-- TOC entry 373 (class 1259 OID 17647)
-- Name: book_genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_genres (
    book_id bigint NOT NULL,
    genre public.genre NOT NULL
);


ALTER TABLE public.book_genres OWNER TO postgres;

--
-- TOC entry 369 (class 1259 OID 17594)
-- Name: book_series; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_series (
    id bigint NOT NULL,
    title text NOT NULL,
    editorial_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.book_series OWNER TO postgres;

--
-- TOC entry 368 (class 1259 OID 17593)
-- Name: book_series_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.book_series ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.book_series_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 371 (class 1259 OID 17609)
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id bigint NOT NULL,
    title text NOT NULL,
    reading_status public.reading_status DEFAULT 'not_started'::public.reading_status NOT NULL,
    release_date text,
    cover_image_url text,
    adquisition_date text,
    start_date text,
    finish_date text,
    notes text,
    language public.language NOT NULL,
    editorial_id bigint NOT NULL,
    serie_id bigint,
    serie_volume integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT books_adquisition_date_format CHECK (((adquisition_date IS NULL) OR (adquisition_date ~ '^\d{4}-\d{2}-\d{2}$'::text))),
    CONSTRAINT books_dates_check CHECK (((finish_date IS NULL) OR (start_date IS NULL) OR (finish_date >= start_date))),
    CONSTRAINT books_finish_date_format CHECK (((finish_date IS NULL) OR (finish_date ~ '^\d{4}-\d{2}-\d{2}$'::text))),
    CONSTRAINT books_release_date_format CHECK (((release_date IS NULL) OR (release_date ~ '^\d{4}-\d{2}-\d{2}$'::text))),
    CONSTRAINT books_start_date_format CHECK (((start_date IS NULL) OR (start_date ~ '^\d{4}-\d{2}-\d{2}$'::text)))
);


ALTER TABLE public.books OWNER TO postgres;

--
-- TOC entry 370 (class 1259 OID 17608)
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.books ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.books_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 365 (class 1259 OID 17576)
-- Name: editorials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.editorials (
    id bigint NOT NULL,
    name text NOT NULL,
    country public.country NOT NULL,
    website text,
    logo text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.editorials OWNER TO postgres;

--
-- TOC entry 384 (class 1259 OID 17856)
-- Name: books_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.books_view AS
 SELECT b.id,
    b.title AS "Título",
    ( SELECT string_agg(a.name, ', '::text ORDER BY a.name) AS string_agg
           FROM (public.book_authors ba
             JOIN public.authors a ON ((a.id = ba.author_id)))
          WHERE (ba.book_id = b.id)) AS "Autor",
    bs.title AS "Serie",
    b.serie_volume AS "Número volumen de la serie",
    b.notes AS "Notas",
    e.name AS "Editorial",
    b.adquisition_date AS "Fecha de adquisición",
    b.finish_date AS "Fecha fin lectura",
    b.reading_status AS "Estado",
    b.cover_image_url AS "Portada"
   FROM ((public.books b
     LEFT JOIN public.editorials e ON ((e.id = b.editorial_id)))
     LEFT JOIN public.book_series bs ON ((bs.id = b.serie_id)))
  ORDER BY b.title;


ALTER VIEW public.books_view OWNER TO postgres;

--
-- TOC entry 364 (class 1259 OID 17575)
-- Name: editorials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.editorials ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.editorials_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 392 (class 1259 OID 18292)
-- Name: fandoms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fandoms (
    id bigint NOT NULL,
    name text NOT NULL,
    origin text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.fandoms OWNER TO postgres;

--
-- TOC entry 391 (class 1259 OID 18291)
-- Name: fandoms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.fandoms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fandoms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 397 (class 1259 OID 18376)
-- Name: fanfic_fandoms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fanfic_fandoms (
    fanfic_id bigint NOT NULL,
    fandom_id bigint NOT NULL
);


ALTER TABLE public.fanfic_fandoms OWNER TO postgres;

--
-- TOC entry 398 (class 1259 OID 18391)
-- Name: fanfic_ships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fanfic_ships (
    fanfic_id bigint NOT NULL,
    ship_id bigint NOT NULL
);


ALTER TABLE public.fanfic_ships OWNER TO postgres;

--
-- TOC entry 396 (class 1259 OID 18328)
-- Name: fanfics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fanfics (
    id bigint NOT NULL,
    title text NOT NULL,
    authors text[] DEFAULT '{}'::text[] NOT NULL,
    rating public.fanfic_rating NOT NULL,
    words integer NOT NULL,
    chapters integer NOT NULL,
    pages integer,
    reading_status public.reading_status DEFAULT 'not_started'::public.reading_status NOT NULL,
    release_date text,
    adquisition_date text,
    start_date text,
    finish_date text,
    trigger_warnings text[] DEFAULT '{}'::text[],
    language public.language NOT NULL,
    tags text[] DEFAULT '{}'::text[],
    summary text,
    file_url text,
    original_url text,
    cover_url text,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT fanfics_adquisition_date_format CHECK (((adquisition_date IS NULL) OR (adquisition_date ~ '^\d{4}-\d{2}-\d{2}$'::text))),
    CONSTRAINT fanfics_chapters_check CHECK ((chapters >= 1)),
    CONSTRAINT fanfics_dates_check CHECK (((finish_date IS NULL) OR (start_date IS NULL) OR (finish_date >= start_date))),
    CONSTRAINT fanfics_finish_date_format CHECK (((finish_date IS NULL) OR (finish_date ~ '^\d{4}-\d{2}-\d{2}$'::text))),
    CONSTRAINT fanfics_pages_check CHECK (((pages IS NULL) OR (pages >= 0))),
    CONSTRAINT fanfics_release_date_format CHECK (((release_date IS NULL) OR (release_date ~ '^\d{4}-\d{2}-\d{2}$'::text))),
    CONSTRAINT fanfics_start_date_format CHECK (((start_date IS NULL) OR (start_date ~ '^\d{4}-\d{2}-\d{2}$'::text))),
    CONSTRAINT fanfics_words_check CHECK ((words >= 0))
);


ALTER TABLE public.fanfics OWNER TO postgres;

--
-- TOC entry 395 (class 1259 OID 18327)
-- Name: fanfics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.fanfics ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fanfics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 376 (class 1259 OID 17666)
-- Name: manga_authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.manga_authors (
    manga_id bigint NOT NULL,
    author_id bigint NOT NULL
);


ALTER TABLE public.manga_authors OWNER TO postgres;

--
-- TOC entry 377 (class 1259 OID 17681)
-- Name: manga_genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.manga_genres (
    manga_id bigint NOT NULL,
    genre public.genre NOT NULL
);


ALTER TABLE public.manga_genres OWNER TO postgres;

--
-- TOC entry 379 (class 1259 OID 17692)
-- Name: manga_volumes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.manga_volumes (
    id bigint NOT NULL,
    title text NOT NULL,
    manga_id bigint NOT NULL,
    volume_number integer,
    reading_status public.reading_status DEFAULT 'not_started'::public.reading_status NOT NULL,
    release_date text,
    cover_image_url text,
    adquisition_date text,
    start_date text,
    finish_date text,
    notes text,
    language public.language NOT NULL,
    editorial_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT manga_volumes_adquisition_date_format CHECK (((adquisition_date IS NULL) OR (adquisition_date ~ '^\d{4}-\d{2}-\d{2}$'::text))),
    CONSTRAINT manga_volumes_dates_check CHECK (((finish_date IS NULL) OR (start_date IS NULL) OR (finish_date >= start_date))),
    CONSTRAINT manga_volumes_finish_date_format CHECK (((finish_date IS NULL) OR (finish_date ~ '^\d{4}-\d{2}-\d{2}$'::text))),
    CONSTRAINT manga_volumes_release_date_format CHECK (((release_date IS NULL) OR (release_date ~ '^\d{4}-\d{2}-\d{2}$'::text))),
    CONSTRAINT manga_volumes_start_date_format CHECK (((start_date IS NULL) OR (start_date ~ '^\d{4}-\d{2}-\d{2}$'::text)))
);


ALTER TABLE public.manga_volumes OWNER TO postgres;

--
-- TOC entry 375 (class 1259 OID 17658)
-- Name: mangas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mangas (
    id bigint NOT NULL,
    title text NOT NULL,
    demographic public.demographic NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.mangas OWNER TO postgres;

--
-- TOC entry 383 (class 1259 OID 17848)
-- Name: manga_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.manga_view AS
 SELECT mv.id,
    m.title AS "Título",
    mv.volume_number AS "Número de volumen",
    mv.notes AS "Notas",
    mv.adquisition_date AS "Fecha de adquisición",
    mv.finish_date AS "Fecha fin lectura",
    mv.reading_status AS "Estado"
   FROM (public.manga_volumes mv
     JOIN public.mangas m ON ((m.id = mv.manga_id)))
  ORDER BY m.title, mv.volume_number;


ALTER VIEW public.manga_view OWNER TO postgres;

--
-- TOC entry 380 (class 1259 OID 17717)
-- Name: manga_volume_authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.manga_volume_authors (
    manga_volume_id bigint NOT NULL,
    author_id bigint NOT NULL
);


ALTER TABLE public.manga_volume_authors OWNER TO postgres;

--
-- TOC entry 378 (class 1259 OID 17691)
-- Name: manga_volumes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.manga_volumes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.manga_volumes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 374 (class 1259 OID 17657)
-- Name: mangas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.mangas ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.mangas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 390 (class 1259 OID 18252)
-- Name: reading_plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reading_plan (
    id bigint NOT NULL,
    title text NOT NULL,
    authors text[] DEFAULT '{}'::text[] NOT NULL,
    pages integer NOT NULL,
    cover_url text,
    "order" integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT reading_plan_order_check CHECK (("order" >= 0)),
    CONSTRAINT reading_plan_pages_check CHECK ((pages >= 0))
);


ALTER TABLE public.reading_plan OWNER TO postgres;

--
-- TOC entry 389 (class 1259 OID 18251)
-- Name: reading_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.reading_plan ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reading_plan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 394 (class 1259 OID 18307)
-- Name: ships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ships (
    id bigint NOT NULL,
    fandom_id bigint NOT NULL,
    characters text[] DEFAULT '{}'::text[] NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT ships_characters_check CHECK ((array_length(characters, 1) > 0))
);


ALTER TABLE public.ships OWNER TO postgres;

--
-- TOC entry 393 (class 1259 OID 18306)
-- Name: ships_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.ships ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 382 (class 1259 OID 17773)
-- Name: yearly_readings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.yearly_readings (
    id bigint NOT NULL,
    year smallint NOT NULL,
    title text NOT NULL,
    authors text[] DEFAULT '{}'::text[] NOT NULL,
    pages integer NOT NULL,
    start_date date NOT NULL,
    end_date date,
    cover_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT yearly_readings_date_check CHECK (((end_date IS NULL) OR (end_date >= start_date))),
    CONSTRAINT yearly_readings_pages_check CHECK ((pages >= 0))
);


ALTER TABLE public.yearly_readings OWNER TO postgres;

--
-- TOC entry 381 (class 1259 OID 17772)
-- Name: yearly_readings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.yearly_readings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.yearly_readings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4123 (class 0 OID 17585)
-- Dependencies: 367
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (39, '3A Corporation', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (40, 'Adachitoka', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (41, 'Akiko Yosano', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (42, 'Akimi Yoshida', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (43, 'Akutagawa Ryunosuke', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (44, 'Alena Pons', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (45, 'Alex Pler', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (46, 'Alfonso R. Castelao', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (47, 'Anthony Doerr', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (48, 'Antonine de Saint-Exupéry', 'FR', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (49, 'Arina Tanemura', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (50, 'Asumiko Nakamura', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (51, 'Atsuko Asano', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (52, 'Atsushi Ohkubo', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (53, 'Bikke', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (54, 'Brent Weeks', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (55, 'Bunta Tsushimi', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (56, 'Carlos Ruíz Zafón', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (57, 'Carmen Torres Ripa', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (58, 'Charles Dickens', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (59, 'Christina Scull', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (60, 'Chuuya Nakahara', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (61, 'Dan Brown', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (62, 'Daniel Wolf', 'DE', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (63, 'David B. Gil', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (64, 'Diana Jones Wynne', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (65, 'Edgar Allan Poe', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (66, 'Edogawa Ranpo', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (67, 'Eric Marchal', 'FR', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (68, 'Ernest Cline', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (69, 'Ernest Hemingway', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (70, 'Fiódor Dostoievski', 'RU', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (71, 'Frederick Hadland Davis', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (72, 'Genzaburo Yoshino', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (73, 'George Orwell', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (74, 'Glenn Cooper', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (75, 'Gustavo Adolfo Becquer', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (76, 'Hagi', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (77, 'Haruki Murakami', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (78, 'Hideo Yokohama', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (79, 'Higuchi Ichiyo', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (80, 'Hinoki Kino', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (81, 'Hiro Arikawa', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (82, 'Hiromi Kawakami', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (83, 'Hiromi Sato', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (84, 'Hiromu Arokawa', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (85, 'Hisashi Kashiwai', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (86, 'Ian McEwan', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (87, 'Ildefonso Falcones', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (88, 'Inazo Nitobe', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (89, 'Inio Asano', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (90, 'Izumi Kyoka', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (91, 'J. K. Rowling', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (92, 'Jack Thorne', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (93, 'Jay', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (94, 'Jihyun Yun', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (96, 'John Tiffany', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (97, 'Julio Verne', 'FR', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (98, 'Jun Mochizuki', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (99, 'Juniichiro Tanizaki', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (100, 'Kafka Asagiri', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (101, 'Kamome Shirahama', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (102, 'Kanna Kii', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (103, 'Katherine Neville', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (104, 'Ken Follet', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (105, 'Kunikida Doppo', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (106, 'Kyota Ko', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (107, 'Lafcadio Hearn', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (108, 'Laura Gallego', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (109, 'Lewis Carrol', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (110, 'Li Haoling', 'CN', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (111, 'Makoto Shinkai', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (112, 'Mark Gatiss', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (113, 'Marta García', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (114, 'Mary Shelley', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (115, 'Matt Haig', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (116, 'Meng Xi Shi', 'CN', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (117, 'Michael Crane', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (118, 'Miguel de Cervantes', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (119, 'Miyazawa Kenji', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (120, 'Mo Xiang Tong Xiu', 'CN', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (121, 'Mori Ogai', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (122, 'Nagisa Furuya', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (123, 'Natsuki Kizu', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (124, 'Natsume Soseki', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (125, 'Nekojitablog', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (126, 'Oda Sakunosuke', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (127, 'Oliver Bowden', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (128, 'Osamu Dazai', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (129, 'Oyoyo', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (130, 'Patrick Rothfuss', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (131, 'Peyo', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (132, 'Phillip K. Dick', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (133, 'Phillip Pullman', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (134, 'Piper C.J.', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (135, 'Richard Gordon Smith', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (136, 'Robert Galbraith', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (137, 'Robert Louis Stevenson', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (138, 'Rou Bao Bu Chi Rou', 'CN', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (139, 'Sakaguchi Ango', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (140, 'Sanaka Hiiragi', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (141, 'Sango Harukawa', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (142, 'Satoru Nii', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (143, 'Satoshi Yagisawa', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (144, 'Sayaka Murata', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (145, 'Seicho Matsumoto', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (146, 'Shinji Cobkubo', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (147, 'Sir Arthur Conan Doyle', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (148, 'Sosuke Natsukawa', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (149, 'Steve Alten', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (150, 'Steven Moffat', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (151, 'Suzanne Collins', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (152, 'Takeshi Hirano', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (153, 'Takeshi Obata', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (154, 'Tang Jiu Qing', 'CN', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (155, 'Tayama Katai', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (156, 'Teresa Pierce Williston', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (157, 'Teru Miyamoto', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (158, 'Titania Hardie', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (159, 'Tom Felton', 'GB', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (160, 'Toshikazu Kawaguchi', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (161, 'Tsugumi Ohba', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (162, 'VVAA', '-', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (163, 'Venio Tachibana', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (164, 'Wayne G. Hammond', 'US', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (165, 'Xavier Alcalá', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (166, 'Yoko Nakazawa', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (167, 'Yoshitoshi', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (168, 'Yuki Fumino', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (169, 'Yuko Tsushima', 'JP', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (170, 'miHoYo / HoYoverse', 'CN', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (171, 'priest', 'CN', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (172, 'Álvaro Lopez', 'ES', NULL, '2026-08-29 09:11:29.992832+00');
INSERT INTO public.authors OVERRIDING SYSTEM VALUE VALUES (95, 'J.R.R. Tolkien', 'GB', NULL, '2026-08-29 09:11:29.992832+00');


--
-- TOC entry 4128 (class 0 OID 17632)
-- Dependencies: 372
-- Data for Name: book_authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.book_authors VALUES (83, 149);
INSERT INTO public.book_authors VALUES (84, 149);
INSERT INTO public.book_authors VALUES (85, 127);
INSERT INTO public.book_authors VALUES (86, 61);
INSERT INTO public.book_authors VALUES (87, 61);
INSERT INTO public.book_authors VALUES (88, 61);
INSERT INTO public.book_authors VALUES (89, 61);
INSERT INTO public.book_authors VALUES (90, 61);
INSERT INTO public.book_authors VALUES (91, 61);
INSERT INTO public.book_authors VALUES (92, 61);
INSERT INTO public.book_authors VALUES (93, 109);
INSERT INTO public.book_authors VALUES (94, 151);
INSERT INTO public.book_authors VALUES (95, 151);
INSERT INTO public.book_authors VALUES (96, 151);
INSERT INTO public.book_authors VALUES (97, 147);
INSERT INTO public.book_authors VALUES (98, 147);
INSERT INTO public.book_authors VALUES (99, 147);
INSERT INTO public.book_authors VALUES (100, 147);
INSERT INTO public.book_authors VALUES (101, 147);
INSERT INTO public.book_authors VALUES (103, 74);
INSERT INTO public.book_authors VALUES (104, 74);
INSERT INTO public.book_authors VALUES (105, 117);
INSERT INTO public.book_authors VALUES (106, 132);
INSERT INTO public.book_authors VALUES (107, 58);
INSERT INTO public.book_authors VALUES (108, 58);
INSERT INTO public.book_authors VALUES (109, 58);
INSERT INTO public.book_authors VALUES (110, 58);
INSERT INTO public.book_authors VALUES (111, 87);
INSERT INTO public.book_authors VALUES (112, 87);
INSERT INTO public.book_authors VALUES (113, 104);
INSERT INTO public.book_authors VALUES (114, 136);
INSERT INTO public.book_authors VALUES (115, 108);
INSERT INTO public.book_authors VALUES (116, 108);
INSERT INTO public.book_authors VALUES (117, 108);
INSERT INTO public.book_authors VALUES (118, 108);
INSERT INTO public.book_authors VALUES (119, 108);
INSERT INTO public.book_authors VALUES (120, 115);
INSERT INTO public.book_authors VALUES (121, 158);
INSERT INTO public.book_authors VALUES (122, 64);
INSERT INTO public.book_authors VALUES (123, 67);
INSERT INTO public.book_authors VALUES (124, 86);
INSERT INTO public.book_authors VALUES (125, 103);
INSERT INTO public.book_authors VALUES (126, 103);
INSERT INTO public.book_authors VALUES (127, 133);
INSERT INTO public.book_authors VALUES (128, 133);
INSERT INTO public.book_authors VALUES (129, 133);
INSERT INTO public.book_authors VALUES (130, 130);
INSERT INTO public.book_authors VALUES (131, 130);
INSERT INTO public.book_authors VALUES (132, 130);
INSERT INTO public.book_authors VALUES (134, 91);
INSERT INTO public.book_authors VALUES (135, 91);
INSERT INTO public.book_authors VALUES (136, 91);
INSERT INTO public.book_authors VALUES (137, 91);
INSERT INTO public.book_authors VALUES (138, 91);
INSERT INTO public.book_authors VALUES (139, 91);
INSERT INTO public.book_authors VALUES (140, 91);
INSERT INTO public.book_authors VALUES (141, 56);
INSERT INTO public.book_authors VALUES (142, 56);
INSERT INTO public.book_authors VALUES (143, 114);
INSERT INTO public.book_authors VALUES (144, 137);
INSERT INTO public.book_authors VALUES (146, 95);
INSERT INTO public.book_authors VALUES (147, 95);
INSERT INTO public.book_authors VALUES (148, 95);
INSERT INTO public.book_authors VALUES (149, 95);
INSERT INTO public.book_authors VALUES (150, 95);
INSERT INTO public.book_authors VALUES (151, 95);
INSERT INTO public.book_authors VALUES (152, 57);
INSERT INTO public.book_authors VALUES (153, 54);
INSERT INTO public.book_authors VALUES (154, 54);
INSERT INTO public.book_authors VALUES (155, 54);
INSERT INTO public.book_authors VALUES (156, 62);
INSERT INTO public.book_authors VALUES (157, 62);
INSERT INTO public.book_authors VALUES (158, 62);
INSERT INTO public.book_authors VALUES (159, 62);
INSERT INTO public.book_authors VALUES (161, 146);
INSERT INTO public.book_authors VALUES (162, 146);
INSERT INTO public.book_authors VALUES (163, 146);
INSERT INTO public.book_authors VALUES (164, 75);
INSERT INTO public.book_authors VALUES (165, 144);
INSERT INTO public.book_authors VALUES (166, 68);
INSERT INTO public.book_authors VALUES (167, 134);
INSERT INTO public.book_authors VALUES (168, 87);
INSERT INTO public.book_authors VALUES (169, 44);
INSERT INTO public.book_authors VALUES (170, 46);
INSERT INTO public.book_authors VALUES (171, 165);
INSERT INTO public.book_authors VALUES (172, 51);
INSERT INTO public.book_authors VALUES (173, 120);
INSERT INTO public.book_authors VALUES (174, 120);
INSERT INTO public.book_authors VALUES (175, 120);
INSERT INTO public.book_authors VALUES (176, 120);
INSERT INTO public.book_authors VALUES (177, 120);
INSERT INTO public.book_authors VALUES (178, 120);
INSERT INTO public.book_authors VALUES (179, 120);
INSERT INTO public.book_authors VALUES (180, 120);
INSERT INTO public.book_authors VALUES (181, 120);
INSERT INTO public.book_authors VALUES (182, 120);
INSERT INTO public.book_authors VALUES (183, 120);
INSERT INTO public.book_authors VALUES (184, 120);
INSERT INTO public.book_authors VALUES (185, 120);
INSERT INTO public.book_authors VALUES (186, 138);
INSERT INTO public.book_authors VALUES (187, 138);
INSERT INTO public.book_authors VALUES (188, 138);
INSERT INTO public.book_authors VALUES (189, 138);
INSERT INTO public.book_authors VALUES (190, 138);
INSERT INTO public.book_authors VALUES (191, 138);
INSERT INTO public.book_authors VALUES (192, 138);
INSERT INTO public.book_authors VALUES (193, 125);
INSERT INTO public.book_authors VALUES (194, 39);
INSERT INTO public.book_authors VALUES (195, 166);
INSERT INTO public.book_authors VALUES (196, 152);
INSERT INTO public.book_authors VALUES (197, 162);
INSERT INTO public.book_authors VALUES (199, 58);
INSERT INTO public.book_authors VALUES (200, 70);
INSERT INTO public.book_authors VALUES (201, 65);
INSERT INTO public.book_authors VALUES (202, 65);
INSERT INTO public.book_authors VALUES (203, 48);
INSERT INTO public.book_authors VALUES (204, 73);
INSERT INTO public.book_authors VALUES (205, 118);
INSERT INTO public.book_authors VALUES (206, 97);
INSERT INTO public.book_authors VALUES (207, 97);
INSERT INTO public.book_authors VALUES (208, 97);
INSERT INTO public.book_authors VALUES (209, 69);
INSERT INTO public.book_authors VALUES (210, 58);
INSERT INTO public.book_authors VALUES (211, 47);
INSERT INTO public.book_authors VALUES (212, 54);
INSERT INTO public.book_authors VALUES (213, 54);
INSERT INTO public.book_authors VALUES (214, 54);
INSERT INTO public.book_authors VALUES (215, 63);
INSERT INTO public.book_authors VALUES (216, 63);
INSERT INTO public.book_authors VALUES (217, 63);
INSERT INTO public.book_authors VALUES (218, 111);
INSERT INTO public.book_authors VALUES (219, 133);
INSERT INTO public.book_authors VALUES (220, 159);
INSERT INTO public.book_authors VALUES (221, 172);
INSERT INTO public.book_authors VALUES (221, 113);
INSERT INTO public.book_authors VALUES (222, 138);
INSERT INTO public.book_authors VALUES (223, 138);
INSERT INTO public.book_authors VALUES (224, 138);
INSERT INTO public.book_authors VALUES (225, 138);
INSERT INTO public.book_authors VALUES (226, 138);
INSERT INTO public.book_authors VALUES (227, 138);
INSERT INTO public.book_authors VALUES (228, 138);
INSERT INTO public.book_authors VALUES (229, 138);
INSERT INTO public.book_authors VALUES (230, 138);
INSERT INTO public.book_authors VALUES (231, 138);
INSERT INTO public.book_authors VALUES (232, 138);
INSERT INTO public.book_authors VALUES (233, 170);
INSERT INTO public.book_authors VALUES (234, 170);
INSERT INTO public.book_authors VALUES (235, 170);
INSERT INTO public.book_authors VALUES (236, 116);
INSERT INTO public.book_authors VALUES (237, 116);
INSERT INTO public.book_authors VALUES (238, 116);
INSERT INTO public.book_authors VALUES (239, 116);
INSERT INTO public.book_authors VALUES (240, 116);
INSERT INTO public.book_authors VALUES (241, 171);
INSERT INTO public.book_authors VALUES (242, 171);
INSERT INTO public.book_authors VALUES (243, 171);
INSERT INTO public.book_authors VALUES (244, 154);
INSERT INTO public.book_authors VALUES (245, 154);
INSERT INTO public.book_authors VALUES (246, 154);
INSERT INTO public.book_authors VALUES (247, 154);
INSERT INTO public.book_authors VALUES (248, 154);
INSERT INTO public.book_authors VALUES (249, 154);
INSERT INTO public.book_authors VALUES (250, 154);
INSERT INTO public.book_authors VALUES (251, 154);
INSERT INTO public.book_authors VALUES (252, 100);
INSERT INTO public.book_authors VALUES (253, 100);
INSERT INTO public.book_authors VALUES (254, 100);
INSERT INTO public.book_authors VALUES (255, 100);
INSERT INTO public.book_authors VALUES (256, 100);
INSERT INTO public.book_authors VALUES (257, 100);
INSERT INTO public.book_authors VALUES (258, 100);
INSERT INTO public.book_authors VALUES (259, 100);
INSERT INTO public.book_authors VALUES (260, 100);
INSERT INTO public.book_authors VALUES (261, 100);
INSERT INTO public.book_authors VALUES (262, 100);
INSERT INTO public.book_authors VALUES (265, 124);
INSERT INTO public.book_authors VALUES (266, 95);
INSERT INTO public.book_authors VALUES (267, 95);
INSERT INTO public.book_authors VALUES (268, 95);
INSERT INTO public.book_authors VALUES (269, 95);
INSERT INTO public.book_authors VALUES (270, 164);
INSERT INTO public.book_authors VALUES (270, 59);
INSERT INTO public.book_authors VALUES (271, 95);
INSERT INTO public.book_authors VALUES (272, 77);
INSERT INTO public.book_authors VALUES (273, 77);
INSERT INTO public.book_authors VALUES (275, 77);
INSERT INTO public.book_authors VALUES (276, 77);
INSERT INTO public.book_authors VALUES (277, 77);
INSERT INTO public.book_authors VALUES (278, 77);
INSERT INTO public.book_authors VALUES (279, 77);
INSERT INTO public.book_authors VALUES (280, 77);
INSERT INTO public.book_authors VALUES (281, 77);
INSERT INTO public.book_authors VALUES (282, 77);
INSERT INTO public.book_authors VALUES (283, 77);
INSERT INTO public.book_authors VALUES (294, 91);
INSERT INTO public.book_authors VALUES (295, 91);
INSERT INTO public.book_authors VALUES (296, 91);
INSERT INTO public.book_authors VALUES (297, 147);
INSERT INTO public.book_authors VALUES (298, 147);
INSERT INTO public.book_authors VALUES (299, 147);
INSERT INTO public.book_authors VALUES (300, 147);
INSERT INTO public.book_authors VALUES (301, 147);
INSERT INTO public.book_authors VALUES (302, 147);
INSERT INTO public.book_authors VALUES (303, 147);
INSERT INTO public.book_authors VALUES (304, 147);
INSERT INTO public.book_authors VALUES (305, 147);
INSERT INTO public.book_authors VALUES (306, 147);
INSERT INTO public.book_authors VALUES (307, 147);
INSERT INTO public.book_authors VALUES (308, 147);
INSERT INTO public.book_authors VALUES (309, 147);
INSERT INTO public.book_authors VALUES (310, 90);
INSERT INTO public.book_authors VALUES (311, 90);
INSERT INTO public.book_authors VALUES (312, 155);
INSERT INTO public.book_authors VALUES (313, 124);
INSERT INTO public.book_authors VALUES (314, 124);
INSERT INTO public.book_authors VALUES (315, 124);
INSERT INTO public.book_authors VALUES (316, 124);
INSERT INTO public.book_authors VALUES (317, 126);
INSERT INTO public.book_authors VALUES (318, 139);
INSERT INTO public.book_authors VALUES (319, 128);
INSERT INTO public.book_authors VALUES (320, 128);
INSERT INTO public.book_authors VALUES (322, 128);
INSERT INTO public.book_authors VALUES (323, 128);
INSERT INTO public.book_authors VALUES (324, 128);
INSERT INTO public.book_authors VALUES (325, 128);
INSERT INTO public.book_authors VALUES (326, 128);
INSERT INTO public.book_authors VALUES (327, 128);
INSERT INTO public.book_authors VALUES (328, 128);
INSERT INTO public.book_authors VALUES (329, 60);
INSERT INTO public.book_authors VALUES (330, 60);
INSERT INTO public.book_authors VALUES (331, 60);
INSERT INTO public.book_authors VALUES (332, 43);
INSERT INTO public.book_authors VALUES (333, 43);
INSERT INTO public.book_authors VALUES (334, 43);
INSERT INTO public.book_authors VALUES (335, 66);
INSERT INTO public.book_authors VALUES (336, 105);
INSERT INTO public.book_authors VALUES (337, 119);
INSERT INTO public.book_authors VALUES (338, 121);
INSERT INTO public.book_authors VALUES (339, 41);
INSERT INTO public.book_authors VALUES (340, 99);
INSERT INTO public.book_authors VALUES (341, 79);
INSERT INTO public.book_authors VALUES (342, 81);
INSERT INTO public.book_authors VALUES (343, 140);
INSERT INTO public.book_authors VALUES (344, 82);
INSERT INTO public.book_authors VALUES (345, 72);
INSERT INTO public.book_authors VALUES (346, 78);
INSERT INTO public.book_authors VALUES (348, 145);
INSERT INTO public.book_authors VALUES (349, 145);
INSERT INTO public.book_authors VALUES (350, 160);
INSERT INTO public.book_authors VALUES (351, 148);
INSERT INTO public.book_authors VALUES (352, 85);
INSERT INTO public.book_authors VALUES (353, 143);
INSERT INTO public.book_authors VALUES (354, 143);
INSERT INTO public.book_authors VALUES (355, 157);
INSERT INTO public.book_authors VALUES (356, 169);
INSERT INTO public.book_authors VALUES (357, 45);
INSERT INTO public.book_authors VALUES (358, 106);
INSERT INTO public.book_authors VALUES (359, 107);
INSERT INTO public.book_authors VALUES (360, 167);
INSERT INTO public.book_authors VALUES (361, 152);
INSERT INTO public.book_authors VALUES (362, 45);
INSERT INTO public.book_authors VALUES (363, 71);
INSERT INTO public.book_authors VALUES (364, 135);
INSERT INTO public.book_authors VALUES (366, 162);
INSERT INTO public.book_authors VALUES (367, 88);
INSERT INTO public.book_authors VALUES (368, 94);
INSERT INTO public.book_authors VALUES (371, 128);
INSERT INTO public.book_authors VALUES (321, 128);
INSERT INTO public.book_authors VALUES (145, 92);
INSERT INTO public.book_authors VALUES (145, 96);
INSERT INTO public.book_authors VALUES (133, 91);
INSERT INTO public.book_authors VALUES (284, 91);
INSERT INTO public.book_authors VALUES (285, 91);
INSERT INTO public.book_authors VALUES (286, 91);
INSERT INTO public.book_authors VALUES (287, 91);
INSERT INTO public.book_authors VALUES (288, 91);
INSERT INTO public.book_authors VALUES (289, 91);
INSERT INTO public.book_authors VALUES (290, 91);
INSERT INTO public.book_authors VALUES (291, 91);
INSERT INTO public.book_authors VALUES (292, 91);
INSERT INTO public.book_authors VALUES (293, 91);
INSERT INTO public.book_authors VALUES (264, 43);
INSERT INTO public.book_authors VALUES (369, 124);
INSERT INTO public.book_authors VALUES (370, 156);


--
-- TOC entry 4129 (class 0 OID 17647)
-- Dependencies: 373
-- Data for Name: book_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4125 (class 0 OID 17594)
-- Dependencies: 369
-- Data for Name: book_series; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (1, '1Q85', 52, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (2, '1Q86', 52, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (3, '1Q87', 52, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (4, 'Ahriel', 35, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (5, 'Assassin''s Creed', 30, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (6, 'Ballad of Sword and Wine (Qiang Jin Jiu)', 48, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (7, 'Bungo Stray Dogs: Light novels', 58, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (8, 'Catherine Velis', 15, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (9, 'Cormoran Strike', 11, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (10, 'El Cementerio de los Libros Olvidados', 40, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (11, 'El Portador de la Luz', 15, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (12, 'El Señor de los Anillos', 35, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (13, 'El Testamento Maya', 24, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (14, 'El Ángel de la Noche', 15, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (15, 'Genshin Impact Artbook', 50, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (16, 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi)', 48, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (17, 'Guardian (Zhen Hun)', 48, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (18, 'Harry Potter', 45, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (19, 'Heaven Official Blessing (Tian Guan Ci Fu)', 48, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (20, 'Howl', 8, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (21, 'La Bella Salvaje', 43, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (22, 'La Biblioteca de los Muertos', 15, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (23, 'La Crónica del Asesino de Reyes', 15, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (24, 'La Librería Morisaki', 31, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (25, 'La Materia Oscura', 20, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (26, 'La Muerte del Comendador', 52, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (27, 'Los Juegos del Hambre', 42, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (28, 'Los Pilares de la Tierra', 15, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (29, 'Memorias de Idhún', 44, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (30, 'Remnants of Filth (YUWU)', 48, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (31, 'Robert Langdon', 40, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (32, 'Sabikui Bisco', 58, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (33, 'Saga de la familia Fleury', 15, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (34, 'Sherlock Holmes', 39, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (35, 'Taberna Kamogawa', 15, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (36, 'The Husky and his White Cat Shizun (Erha he ta de bai mao Shizun)', 48, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (37, 'The Lord of the Rings', 26, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (38, 'The Sherlock Holmes Collection', 42, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (39, 'Thousand Autumns (Qian Qiu)', 48, '2026-08-29 14:20:54.127203+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (40, 'Harry Potter - Ed. Ravenclaw', 10, '2026-09-02 06:38:14.582408+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (41, 'Harry Potter - Ed. Hufflepuff', 45, '2026-09-02 06:39:06.608641+00');
INSERT INTO public.book_series OVERRIDING SYSTEM VALUE VALUES (42, 'Harry Potter - Ed. Minalima', 45, '2026-09-02 06:41:53.992422+00');


--
-- TOC entry 4127 (class 0 OID 17609)
-- Dependencies: 371
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (145, 'Harry Potter y el Legado Maldito', 'finished', NULL, 'https://imagessl8.casadellibro.com/a/l/s7/38/9788418797538.webp', NULL, NULL, NULL, NULL, 'ES', 45, 18, 8, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (148, 'El Retorno del Rey', 'not_started', NULL, 'https://i.ebayimg.com/images/g/CAAAAeSwndBqftr-/s-l960.webp', NULL, NULL, NULL, NULL, 'ES', 35, 12, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (100, 'Sherlock Holmes: Relatos 2', 'finished', NULL, 'https://imagessl5.casadellibro.com/a/l/s7/65/9788491050865.webp', NULL, NULL, NULL, NULL, 'ES', 39, 34, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (147, 'Las Dos Torres', 'not_started', NULL, 'https://cloud10.todocoleccion.online/libros-segunda-mano-ciencia-ficcion-fantasia/tc/2026/04/19/11/671715585.jpg', NULL, NULL, NULL, NULL, 'ES', 35, 12, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (84, 'La Resurrección Maya', 'finished', NULL, 'https://imagessl7.casadellibro.com/a/l/s7/87/9788492431687.webp', NULL, NULL, NULL, NULL, 'ES', 24, 13, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (369, 'Misteláneas Primaverales', 'not_started', NULL, 'https://m.media-amazon.com/images/I/71a-EjCSa5L._SL1200_.jpg', '2026-08-12', NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (102, 'The Case Files of Sherlock Holmes', 'not_started', NULL, 'https://m.media-amazon.com/images/I/51Ajm2Ha0vL.jpg', NULL, NULL, NULL, NULL, 'EN', 7, 34, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (124, 'The Child in Time', 'not_started', NULL, 'https://m.media-amazon.com/images/I/41XwWk5zyjL.jpg', NULL, NULL, NULL, NULL, 'EN', 54, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (115, 'Alas de Fuego', 'finished', NULL, 'https://imagessl3.casadellibro.com/a/l/s7/93/9788445009093.webp', NULL, NULL, NULL, NULL, 'ES', 35, 4, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (85, 'Assassin''s Creed', 'finished', NULL, 'https://m.media-amazon.com/images/I/61trWcj0jML._SL1050_.jpg', NULL, NULL, NULL, NULL, 'ES', 30, 5, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (114, 'El Canto del Cuco', 'finished', NULL, 'https://imagessl5.casadellibro.com/a/l/s7/95/9788467040395.webp', NULL, NULL, NULL, NULL, 'ES', 11, 9, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (129, 'El Catalejo Lacado', 'finished', NULL, 'https://m.media-amazon.com/images/I/51TKqHQyFcL.jpg', NULL, NULL, NULL, NULL, 'ES', 20, 25, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (87, 'El Código DaVinci', 'finished', NULL, 'https://m.media-amazon.com/images/I/A1L-ulNrn+L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 53, 31, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (104, 'El Fin de los Escribas', 'finished', NULL, 'https://imagessl4.casadellibro.com/a/l/s7/94/9788490328194.webp', NULL, NULL, NULL, NULL, 'ES', 15, 22, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (130, 'El Nombre del Viento', 'finished', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1419003669i/6483211.jpg', NULL, NULL, NULL, NULL, 'ES', 15, 23, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (158, 'El Oro del Mar', 'finished', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1530835006i/40728451.jpg', NULL, NULL, NULL, NULL, 'ES', 15, 33, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (83, 'El Testamento Maya', 'finished', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1320455619i/9776724.jpg', NULL, NULL, NULL, NULL, 'ES', 24, 13, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (105, 'El Violinista de Praga', 'finished', NULL, 'https://imagessl5.casadellibro.com/a/l/s7/55/9788499088655.webp', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (143, 'Frankenstein', 'finished', NULL, 'https://m.media-amazon.com/images/I/51lL+bKwDSL._AC_UF1000,1000_QL80_.jpg', NULL, NULL, NULL, NULL, 'ES', 6, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (139, 'Harry Potter y el Misterio del Príncipe', 'finished', NULL, 'https://imagessl7.casadellibro.com/a/l/s7/07/9788478889907.webp', NULL, NULL, NULL, NULL, 'ES', 45, 18, 6, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (136, 'Harry Potter y el Prisionero de Azkaban', 'finished', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/90/9788478885190.webp', NULL, NULL, NULL, NULL, 'ES', 45, 18, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (138, 'Harry Potter y la Órden del Fénix', 'finished', NULL, 'https://imagessl2.casadellibro.com/a/l/s7/22/9788478887422.webp', NULL, NULL, NULL, NULL, 'ES', 45, 18, 5, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (134, 'Harry Potter y La Piedra Filosofal', 'finished', NULL, 'https://imagessl2.casadellibro.com/a/l/s7/52/9788478884452.webp', NULL, NULL, NULL, NULL, 'ES', 45, 18, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (120, 'How to Stop Time', 'finished', NULL, 'https://www.worldofbooks.com/cdn/shop/files/1782118640.jpg?v=1787755281', NULL, NULL, NULL, NULL, 'EN', 13, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (89, 'Inferno', 'finished', NULL, 'https://imagessl9.casadellibro.com/a/l/s7/39/9788408176039.webp', NULL, NULL, NULL, NULL, 'ES', 40, 31, 4, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (103, 'La Biblioteca de los Muertos', 'finished', NULL, 'https://m.media-amazon.com/images/I/91FKcG6RIgL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 15, 22, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (111, 'La Catedral del Mar', 'finished', NULL, 'https://imagessl6.casadellibro.com/a/l/s7/86/9788425367786.webp', NULL, NULL, NULL, NULL, 'ES', 24, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (92, 'La Fortaleza Digital', 'finished', NULL, 'https://pictures.abebooks.com/inventory/32507621901._FMavif_.jpg', NULL, NULL, NULL, NULL, 'ES', 53, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (157, 'La Luz de la Tierra', 'finished', NULL, 'https://m.media-amazon.com/images/I/91JW0+Ure4L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 15, 33, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (132, 'La Música del Silencio', 'finished', NULL, 'https://imagessl2.casadellibro.com/a/l/s7/12/9788401389412.webp', NULL, NULL, NULL, NULL, 'ES', 45, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (117, 'La Resistencia', 'finished', NULL, 'https://imagessl5.casadellibro.com/a/l/s7/95/9788467502695.webp', NULL, NULL, NULL, NULL, 'ES', 44, 29, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (141, 'La Sombra del Viento', 'finished', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/50/9788408163350.webp', NULL, NULL, NULL, NULL, 'ES', 40, 10, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (98, 'Sherlock Holmes: Novelas', 'finished', NULL, 'https://imagessl4.casadellibro.com/a/l/s7/94/9788491050094.webp', NULL, NULL, NULL, NULL, 'ES', 39, 34, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (94, 'Los Juegos del Hambre', 'finished', NULL, 'https://imagessl1.casadellibro.com/a/l/adic/mc/s7/64/9788413144764-1.webp', NULL, NULL, NULL, NULL, 'ES', 42, 27, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (119, 'Panteón', 'finished', NULL, 'https://imagessl2.casadellibro.com/a/l/s7/82/9788467511482.webp', NULL, NULL, NULL, NULL, 'ES', 44, 29, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (108, 'Los Papeles Póstumos del Club Pitwick', 'finished', NULL, 'https://m.media-amazon.com/images/I/71HssV3jh1L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 39, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (127, 'Luces del Norte', 'finished', NULL, 'https://m.media-amazon.com/images/I/81vw9wO-MFL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 20, 25, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (155, 'Más allá de las Sombras', 'finished', NULL, 'https://m.media-amazon.com/images/I/81CWLvXxq9S._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 15, 14, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (109, 'Nuestro Amigo Común', 'finished', NULL, 'https://m.media-amazon.com/images/I/61s4Auyz0vL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 39, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (90, 'Origen', 'finished', NULL, 'https://m.media-amazon.com/images/I/61AiEm269mL._SL1050_.jpg', NULL, NULL, NULL, NULL, 'ES', 40, 31, 5, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (106, 'El Hombre en el Castillo', 'not_started', NULL, 'https://m.media-amazon.com/images/I/613a5bmxuzL._SL1050_.jpg', NULL, NULL, NULL, NULL, 'ES', 11, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (121, 'El Laberinto de la Rosa', 'not_started', NULL, 'https://m.media-amazon.com/images/I/818Ky4T73PL._SL1406_.jpg', NULL, NULL, NULL, NULL, 'ES', 49, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (123, 'El Sol bajo la Seda', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1392747455i/20828238.jpg', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (112, 'La Mano de Fátima', 'not_started', NULL, 'https://imagessl7.casadellibro.com/a/l/s7/47/9788499893747.webp', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (110, 'Oliver Twist', 'not_started', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/50/9788491052050.webp', NULL, NULL, NULL, NULL, 'ES', 39, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (270, 'The Lord of the Rings: A Reader''s Companion', 'not_started', NULL, 'https://preview.redd.it/my-newest-addition-to-the-collection-boxed-set-of-hardcover-v0-43nx7it606gg1.jpg?width=1080&crop=smart&auto=webp&s=505da6c56360218cccccaa7af228fb780667e98f', NULL, NULL, NULL, NULL, 'EN', 26, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (183, 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 3', 'finished', NULL, 'https://m.media-amazon.com/images/I/81BFTBjLW0L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 16, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (185, 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 5', 'finished', NULL, 'https://m.media-amazon.com/images/I/81HSSnMGS2L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 16, 5, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (174, 'Heaven Official Blessing (Tian Guan Ci Fu) vol. 2', 'finished', NULL, 'https://m.media-amazon.com/images/I/81wK+xpo7AL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 19, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (175, 'Heaven Official Blessing (Tian Guan Ci Fu) vol. 3', 'finished', NULL, 'https://m.media-amazon.com/images/I/91Yxt6qj19L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 19, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (162, 'Sabikui Bisco vol. 2: Blood Pressure! Super Monk Kelshinha', 'finished', NULL, 'https://m.media-amazon.com/images/I/91ARa36eAzL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 32, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (177, 'Heaven Official Blessing (Tian Guan Ci Fu) vol. 5', 'finished', NULL, 'https://m.media-amazon.com/images/I/91dWicZMzCL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 19, 5, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (196, 'Sugoi: Japonés para Viajeros', 'not_started', NULL, 'https://m.media-amazon.com/images/I/618gUIXM-dL._SL1138_.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (179, 'Heaven Official Blessing (Tian Guan Ci Fu) vol. 7', 'finished', NULL, 'https://m.media-amazon.com/images/I/91V307r2dqL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 19, 7, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (180, 'Heaven Official Blessing (Tian Guan Ci Fu) vol. 8', 'finished', NULL, 'https://m.media-amazon.com/images/I/81fmRr20uuL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 19, 8, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (160, 'The Wit and Wisdom of Sherlock Holmes', 'not_started', NULL, 'https://m.media-amazon.com/images/I/71UZ9z11mFL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 41, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (187, 'Remnants of Filth (YUWU) vol. 2', 'finished', NULL, 'https://m.media-amazon.com/images/I/81qzTEVbroL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 30, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (189, 'Remnants of Filth (YUWU) vol. 4', 'finished', NULL, 'https://m.media-amazon.com/images/I/81nVe6SuoQL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 30, 4, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (191, 'Remnants of Filth (YUWU) vol. 6', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81DKPDP86RL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 30, 6, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (222, 'The Husky and his White Cat Shizun vol. 1', 'finished', NULL, 'https://m.media-amazon.com/images/I/917L2R5WZ1L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 36, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (165, 'Convenience Store Woman', 'finished', NULL, 'https://m.media-amazon.com/images/I/71SFMwv0dLL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 23, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (232, 'The Husky and his White Cat Shizun vol. 11', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91Qe3qseLjL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 36, 11, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (224, 'The Husky and his White Cat Shizun vol. 3', 'finished', NULL, 'https://m.media-amazon.com/images/I/81w-s8pGkIL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 36, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (214, 'El Ojo Fragmentado', 'finished', NULL, 'https://www.libreriadiogenes.com/imagenes/9788466/978846632979.webp', NULL, NULL, NULL, NULL, 'ES', 15, 11, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (225, 'The Husky and his White Cat Shizun vol. 4', 'finished', NULL, 'https://m.media-amazon.com/images/I/81B7lrJeqtL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 36, 4, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (203, 'El Principito', 'finished', NULL, 'https://imagessl8.casadellibro.com/a/l/s7/98/9788498381498.webp', NULL, NULL, NULL, NULL, 'ES', 45, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (227, 'The Husky and his White Cat Shizun vol. 6', 'finished', NULL, 'https://m.media-amazon.com/images/I/81lF3hul8ZL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 36, 6, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (229, 'The Husky and his White Cat Shizun vol. 8', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91KbcKNSolL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 36, 8, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (230, 'The Husky and his White Cat Shizun vol. 9', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91edQPZxxfL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 36, 9, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (221, 'Mi Vecino Miyazaki', 'finished', NULL, 'https://m.media-amazon.com/images/I/71p1MmaAkGL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 17, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (161, 'Sabikui Bisco vol. 1', 'finished', NULL, 'https://m.media-amazon.com/images/I/91RwhytHDiL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 32, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (171, 'A Nosa Cinza', 'finished', NULL, 'https://imagessl1.casadellibro.com/a/l/s7/91/9788491514091.webp', NULL, NULL, NULL, NULL, 'GL', 21, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (218, 'Your name', 'finished', NULL, 'https://m.media-amazon.com/images/I/61frK59F7qL._SL1050_.jpg', NULL, NULL, NULL, NULL, 'ES', 40, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (201, 'Cuentos', 'not_started', NULL, 'https://imagessl8.casadellibro.com/a/l/s7/98/9788491875598.webp', NULL, NULL, NULL, NULL, 'ES', 42, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (206, 'Viaje al Centro de la Tierra', 'not_started', NULL, 'https://m.media-amazon.com/images/I/8191EFu1ubL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 66, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (205, 'Don Quijote de la Mancha', 'not_started', NULL, 'https://m.media-amazon.com/images/I/6184UKQfKWL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 46, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (209, 'El Viejo y el Mar', 'not_started', NULL, 'https://imagessl9.casadellibro.com/a/l/s7/49/9788466346849.webp', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (169, 'Hielo y Plata', 'not_started', NULL, 'https://imagessl4.casadellibro.com/a/l/s7/44/9788417834944.webp', NULL, NULL, NULL, NULL, 'ES', 9, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (195, 'KOI: Manual Básico de Japonés', 'not_started', NULL, 'https://satoriediciones.com/uploads/photos/3/1671195139-portada-koi-10-edicion.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (211, 'La Luz que no Puedes Ver', 'not_started', NULL, 'https://imagessl5.casadellibro.com/a/l/s7/45/9788466343145.webp', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (199, 'La Tienda de Antigüedades', 'not_started', NULL, 'https://imagessl6.casadellibro.com/a/l/s7/26/9788416858026.webp', NULL, NULL, NULL, NULL, 'ES', 9, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (168, 'Los Herederos de la Tierra', 'not_started', NULL, 'https://imagessl6.casadellibro.com/a/l/s7/36/9788425354236.webp', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (216, 'Ocho Millones de Dioses', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81BY+jNJjlL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (170, 'Os Dóus de Sempre', 'not_started', NULL, 'https://m.media-amazon.com/images/I/41+4DVrIf6L.jpg', NULL, NULL, NULL, NULL, 'GL', 21, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (284, 'Harry Potter y La Piedra Filosofal', 'finished', NULL, 'https://imagessl3.casadellibro.com/a/l/s7/93/9788498388893.webp', NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', 45, 41, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (285, 'Harry Potter y la Cámara Secreta', 'finished', NULL, 'https://imagessl6.casadellibro.com/a/l/s7/46/9788498389746.webp', NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', 45, 41, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (288, 'Harry Potter y la Órden del Fénix', 'finished', NULL, 'https://imagessl6.casadellibro.com/a/l/s7/36/9788418174636.webp', NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', 45, 41, 5, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (289, 'Harry Potter y el Misterio del Príncipe', 'finished', NULL, 'https://m.media-amazon.com/images/I/91bb0pQABHL._SL1500_.jpg', NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', 45, 41, 6, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (278, 'Tokio Blues. Norwegian Wood', 'not_started', NULL, 'https://m.media-amazon.com/images/I/51olYGmndCL._SL1050_.jpg', NULL, NULL, NULL, NULL, 'ES', 52, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (266, 'El Señor de los Anillos - Ed. Ilustrada por el autor', 'not_started', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/80/9788445019580.webp', NULL, NULL, NULL, 'Ilustrado por el autor', 'ES', 35, 12, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (257, 'Beast', 'finished', NULL, 'https://m.media-amazon.com/images/I/81xZinxEQUS._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 7, 6, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (256, 'Dead Apple', 'finished', NULL, 'https://images.yenpress.com/imgs/9781975316587.jpg?w=408&h=612&type=books&s=23ae5c1654caa434d407676417e826d9', NULL, NULL, NULL, NULL, 'EN', 58, 7, 5, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (276, 'El Fin del Mundo y un Despiadado País de las Maravillas', 'finished', NULL, 'https://imagessl7.casadellibro.com/a/l/s7/07/9788483835807.webp', NULL, NULL, NULL, NULL, 'ES', 52, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (233, 'Genshin Impact Artbook: Mondstadt and Liyue', 'finished', NULL, 'https://m.media-amazon.com/images/I/81YqH88N8vL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'CN', 50, 15, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (235, 'Genshin Impact Artbook: Sumeru', 'finished', NULL, 'https://m.media-amazon.com/images/I/81Zagfu+AyL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'CN', 50, 15, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (291, 'Harry Potter y La Piedra Filosofal', 'finished', NULL, 'https://imagessl2.casadellibro.com/a/l/adic/mc/s7/70/9788418174070-2.webp', NULL, NULL, NULL, 'Minalima', 'ES', 45, 42, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (293, 'Harry Potter y el Prisionero de Azkaban', 'finished', NULL, 'https://static.megustaleer.com/images/secundarias/MES-125657/9788419275202_9429b40a021a9a0786554e49deda4e187c73f322_formato.jpg', NULL, NULL, NULL, 'Minalima', 'ES', 45, 42, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (267, 'The Fellowship of the Ring', 'not_started', NULL, 'https://preview.redd.it/my-newest-addition-to-the-collection-boxed-set-of-hardcover-v0-n5r7dht606gg1.jpg?width=1080&crop=smart&auto=webp&s=156894d8da1309666783d53ca9a1f4c766e2a841', NULL, NULL, NULL, NULL, 'EN', 26, 37, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (268, 'The Two Towers', 'not_started', NULL, 'https://preview.redd.it/my-newest-addition-to-the-collection-boxed-set-of-hardcover-v0-3pmq5ht606gg1.jpg?width=1080&crop=smart&auto=webp&s=6a96124941d68dbf56bfe1a012e53cebcd8755dd', NULL, NULL, NULL, NULL, 'EN', 26, 37, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (244, 'Ballad of Sword and Wine vol. 1', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81svG3uxO9L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 6, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (246, 'Ballad of Sword and Wine vol. 3', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81bh3uXPjLL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 6, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (248, 'Ballad of Sword and Wine vol. 5', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91UAOmhM5KL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 6, 5, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (250, 'Ballad of Sword and Wine vol. 7', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81gknXVgHUL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 6, 7, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (237, 'Thousand Autumns vol. 2', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91p+sjkRd+L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 39, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (239, 'Thousand Autumns vol. 4', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81gmT+yU6rL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 39, 4, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (241, 'Guardian vol. 1', 'not_started', NULL, 'https://m.media-amazon.com/images/I/71dZfdkWWWL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 17, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (277, 'La Crónica del Pájaro que Da Cuerda al Mundo', 'finished', NULL, 'https://imagessl4.casadellibro.com/a/l/s7/04/9788483835104.webp', NULL, NULL, NULL, NULL, 'ES', 52, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (294, 'Los Cuentos de Beedle el Bardo', 'finished', NULL, 'https://imagessl3.casadellibro.com/a/l/s7/33/9788498387933.webp', NULL, NULL, NULL, NULL, 'ES', 45, 18, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (243, 'Guardian vol. 3', 'not_started', NULL, 'https://m.media-amazon.com/images/I/71yW0DAX5yL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 17, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (370, 'Cuentos ilustrados japoneses', 'not_started', NULL, 'https://satoriediciones.com/uploads/photos/3/1705400084-cuentos-ilustrados-japoneses-portada-menor-tamano.jpg', '2026-08-12', NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (253, 'Osamu Dazai and the Dark Era', 'finished', NULL, 'https://m.media-amazon.com/images/I/81NEtQbcyZL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 7, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (164, 'Rimas y Leyendas', 'finished', NULL, 'https://cloud10.todocoleccion.online/libros-segunda-mano-literatura/tc/2020/01/16/16/191074018_tcimg_4D4C431A.jpg', NULL, NULL, NULL, NULL, 'ES', 40, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (254, 'The Untold Origins of the Detective Agency', 'finished', NULL, 'https://m.media-amazon.com/images/I/81s3GFpkbqL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 7, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (275, '1Q84 - Libro 3', 'not_started', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/00/9788483836200.webp', NULL, NULL, NULL, NULL, 'ES', 52, 3, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (262, 'Another Story', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81vDoCE7NOL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 7, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (261, 'Bungo Stray Dogs: Novel Version', 'not_started', NULL, 'https://m.media-amazon.com/images/I/915MMKlhgwL._AC_UF1000,1000_QL80_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 7, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (301, 'El Carbunclo Azul', 'not_started', NULL, 'https://m.media-amazon.com/images/I/716TsTmTWeL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (303, 'El Sabueso de los Baskerville', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1631478136i/58980508.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (299, 'Escándalo en Bohemia', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1643142703i/59435539.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (297, 'Estudio en Escarlata', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1633783026i/59245677.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (263, 'Heike Monogatari', 'not_started', NULL, 'https://www.lainevitable.com/cdn/shop/files/d17cab1479b2cd8669e148503c769846.jpg?v=1773753000&width=713', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (283, 'La Muerte del Comendador - Libro 1', 'not_started', NULL, 'https://imagessl2.casadellibro.com/a/l/s7/22/9788490668122.webp', NULL, NULL, NULL, NULL, 'ES', 52, 26, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (280, 'Primera Persona del Singular', 'not_started', NULL, 'https://m.media-amazon.com/images/I/61wpccrhchL._SL1050_.jpg', NULL, NULL, NULL, NULL, 'ES', 52, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (347, 'Si Pudiera Cambiarlos', 'not_started', NULL, 'https://satoriediciones.com/uploads/photos/3/1537782118-si-pudiera-cambiarlos.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (356, 'Territorio de Luz', 'finished', NULL, 'https://m.media-amazon.com/images/I/51Q80Rl0hkL._SL1050_.jpg', NULL, NULL, NULL, NULL, 'ES', 27, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (269, 'The Return of the King', 'not_started', NULL, 'https://preview.redd.it/my-newest-addition-to-the-collection-boxed-set-of-hardcover-v0-nl04yht606gg1.jpg?width=1080&crop=smart&auto=webp&s=a370b28cdb81b8b55a5b2ee0b7e93a2e462003c1', NULL, NULL, NULL, NULL, 'EN', 26, 37, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (319, 'Tormenta de Flores', 'finished', NULL, 'https://satoriediciones.com/uploads/photos/3/1774433627-tormenta-de-flores-portada2.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (341, 'Un Día de Nieve', 'not_started', NULL, 'https://m.media-amazon.com/images/I/71XnOVTNzaL._SL1200_.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (334, 'Vida de un Idiota', 'not_started', NULL, 'https://m.media-amazon.com/images/I/7160-l3soPL._SL1219_.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (330, 'Abrazado a las Estrellas', 'finished', NULL, 'https://satoriediciones.com/uploads/photos/3/1611572131-abrazado-a-las-estrellas-web.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (282, 'After Dark', 'finished', NULL, 'https://imagessl3.casadellibro.com/a/l/s7/23/9788483835623.webp', NULL, NULL, NULL, NULL, 'ES', 52, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (154, 'Al Filo de las Sombras', 'finished', NULL, 'https://imagessl3.casadellibro.com/a/l/s7/83/9788499893983.webp', NULL, NULL, NULL, NULL, 'ES', 15, 14, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (116, 'Alas Negras', 'finished', NULL, 'https://imagessl6.casadellibro.com/a/l/s7/26/9788484835226.webp', NULL, NULL, NULL, NULL, 'ES', 35, 4, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (93, 'Alicia en el País de las Maravillas y a Través del Espejo', 'finished', NULL, 'https://imagessl4.casadellibro.com/a/l/s7/84/9788420610184.webp', NULL, NULL, NULL, NULL, 'ES', 4, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (296, 'Animales Fantásticos y Dónde Encontrarlos', 'finished', NULL, 'https://imagessl6.casadellibro.com/a/l/s7/86/9788498382686.webp', NULL, NULL, NULL, NULL, 'ES', 45, 18, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (326, 'Cuentos de Cabecera', 'finished', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/60/9788494112560.webp', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (340, 'El Elogio de la Sombra', 'finished', NULL, 'https://satoriediciones.com/uploads/photos/3/1458301168-el-elogio-de-la-sombra.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (351, 'El gato que amaba los libros', 'finished', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1738803082i/59781797.jpg', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (320, 'Indigno de Ser Humano', 'finished', NULL, 'https://imagessl9.casadellibro.com/a/l/s7/69/9788419035769.webp', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (328, 'La Felicidad de la Familia', 'finished', NULL, 'https://imagessl5.casadellibro.com/a/l/s7/95/9788415934295.webp', NULL, NULL, NULL, NULL, 'ES', 12, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (355, 'Los sueños de la primavera', 'finished', NULL, 'https://m.media-amazon.com/images/I/71M2QFOStvL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 62, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (336, 'Musashino', 'finished', NULL, 'https://m.media-amazon.com/images/I/71HBt3opfFL._SL1293_.jpg', NULL, NULL, NULL, NULL, 'ES', 14, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (327, 'Recuerdos', 'finished', NULL, 'https://imagessl6.casadellibro.com/a/l/s7/36/9788417419936.webp', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (324, 'Repudiados', 'finished', NULL, 'https://imagessl8.casadellibro.com/a/l/s7/18/9788494378218.webp', NULL, NULL, NULL, NULL, 'ES', 2, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (318, 'Sobre la Decadencia', 'finished', NULL, 'https://satoriediciones.com/uploads/photos/3/1605518480-sobre-la-decadencia-web.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (118, 'Tríada', 'finished', NULL, 'https://imagessl7.casadellibro.com/a/l/s7/97/9788467505597.webp', NULL, NULL, NULL, NULL, 'ES', 44, 29, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (331, 'Triste y Bello', 'finished', NULL, 'https://m.media-amazon.com/images/I/81x36YJps6L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (345, '¿Cómo vives?', 'not_started', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/70/9788418483370.webp', NULL, NULL, NULL, NULL, 'ES', 65, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (204, '1984', 'not_started', NULL, 'https://imagessl4.casadellibro.com/a/l/s7/44/9788499890944.webp', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (273, '1Q84 - Libros 1 y 2', 'not_started', NULL, 'https://imagessl4.casadellibro.com/a/l/s7/54/9788411071154.webp', NULL, NULL, NULL, NULL, 'ES', 52, 1, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (360, 'Cien aspectos de la luna', 'not_started', NULL, 'https://sanssoleil.es/wp-content/uploads/2019/09/Cien_aspectos.jpg', NULL, NULL, NULL, NULL, 'ES', 68, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (342, 'Crónicas del Gato Viajero', 'not_started', NULL, 'https://imagessl1.casadellibro.com/a/l/s7/01/9788426430601.webp', NULL, NULL, NULL, NULL, 'ES', 33, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (314, 'Daisuke', 'not_started', NULL, 'https://imagessl5.casadellibro.com/a/l/s7/85/9788415130185.webp', NULL, NULL, NULL, NULL, 'ES', 27, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (344, 'De Pronto Oigo la Voz del Agua', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91u35jDFACL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 3, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (312, 'El Futón', 'not_started', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/90/9788410404090.webp', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (307, 'El Pabellón Wisteria', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1639950011i/59854526.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (368, 'El río sabe tu nombre', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1774604218i/250303102.jpg', NULL, NULL, NULL, NULL, 'ES', 35, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (310, 'El Santo del Monte Koya', 'not_started', NULL, 'https://imagessl7.casadellibro.com/a/l/s7/77/9788417419677.webp', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (333, 'El Tabaco y el Diablo', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1612279852i/56928112.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (308, 'El Valle del Terror', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1639950396i/59854568.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (339, 'El Vuelo del Ave Fénix', 'not_started', NULL, 'https://satoriediciones.com/uploads/photos/3/1632391953-el-vuelo-del-ave-fenix-web.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (338, 'Juventud', 'not_started', NULL, 'https://imagessl4.casadellibro.com/a/l/s7/84/9788417419684.webp', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (365, 'Kojiki: Crónicas de antiguos hechos de Japón', 'not_started', NULL, 'https://imagessl1.casadellibro.com/a/l/s7/71/9788498797671.webp', NULL, NULL, NULL, NULL, 'ES', 70, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (316, 'Kokoro', 'not_started', NULL, 'https://satoriediciones.com/uploads/photos/3/1632391903-kokoro-seseki-web.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (309, 'La Piedra de Mazarino', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1641476032i/60046175.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (363, 'Mitos y leyendas de Japón', 'not_started', NULL, 'https://m.media-amazon.com/images/I/61HokwRDPcL._SL1159_.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (354, 'Una velada en la librería Morisaki', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91hj+gBqxHL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 31, 24, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (350, 'Antes de que se enfríe el café', 'not_started', NULL, 'https://imagessl1.casadellibro.com/a/l/s7/91/9788401024191.webp', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (317, 'El Signo de los Tiempos', 'finished', NULL, 'https://satoriediciones.com/uploads/photos/3/1674559158-el-signo-de-los-tiempos_web.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (200, 'Crimen y Castigo', 'not_started', NULL, 'https://imagessl8.casadellibro.com/a/l/s7/68/9788408155768.webp', NULL, NULL, NULL, NULL, 'ES', 61, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (335, 'Crímenes selectos', 'not_started', NULL, 'https://imagessl8.casadellibro.com/a/l/s7/38/9788417419738.webp', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (322, 'Ocho Escenas de Tokio', 'finished', NULL, 'https://imagessl4.casadellibro.com/a/l/s7/24/9788493907624.webp', NULL, NULL, NULL, NULL, 'ES', 2, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (271, 'El Hobbit', 'finished', NULL, 'https://imagessl9.casadellibro.com/a/l/s7/09/9788445011409.webp', NULL, NULL, NULL, NULL, 'ES', 11, 37, 0, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (247, 'Ballad of Sword and Wine vol. 4', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81xv0zfKZrL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 6, 4, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (366, 'Cuentos de un pasado lejano', 'not_started', NULL, 'https://www.marcialpons.es/media/img/portadas/2019/11/25/9788417419332.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (249, 'Ballad of Sword and Wine vol. 6', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81YI2XOi5SL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 6, 6, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (364, 'Cuentos tradicionales de Japón', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91wwmLXeGmL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (251, 'Ballad of Sword and Wine vol. 8', 'not_started', NULL, 'https://m.media-amazon.com/images/I/912Po-03X2L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 6, 8, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (207, 'De la Tierra a la Luna', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81XslmMEVbL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 66, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (279, 'Después del Terremoto', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81sbswp5DpL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 52, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (181, 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 1', 'finished', NULL, 'https://m.media-amazon.com/images/I/81eIhgXI90L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 16, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (122, 'El Castillo Ambulante', 'finished', NULL, 'https://imagessl7.casadellibro.com/a/l/s7/97/9788496756397.webp', NULL, NULL, NULL, NULL, 'ES', 8, 20, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (367, 'El Código del Samurai', 'not_started', NULL, 'https://dam.elcorteingles.es/producto/www-001006517114549-00.jpg?impolicy=frontWeb&width=900&shape=square', NULL, NULL, NULL, NULL, 'ES', 69, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (305, 'El Enigma de la Mesa de Juego', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1643459297i/60235879.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (264, 'El Dragón, Rashomon y otros cuentos', 'finished', NULL, 'https://quaterni.es/wp-content/uploads/2026/06/eldragonroshomon.jpg', NULL, NULL, '2026-09-15', NULL, 'ES', 67, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (313, 'El Gorrión de Java', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1572720207i/48667228.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (142, 'El Juego del Ángel', 'not_started', NULL, 'https://proassetspdlcom.cdnstatics2.com/usuaris/libros/thumbs/ecd7fcca-c755-4894-8a36-a4d879391bb0/d_1200_1200/portada___201609051502.webp', NULL, NULL, NULL, NULL, 'ES', 40, 10, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (343, 'El Pequeño Estudio de los Recuerdos Perdidos', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1708292491i/202633884.jpg', NULL, NULL, NULL, NULL, 'ES', 24, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (302, 'El Problema Final', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1752837587i/239032108.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (298, 'El Signo de los Cuatro', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1633777931i/59245399.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (151, 'El Silmarillion', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1388756288i/2085401.jpg', NULL, NULL, NULL, NULL, 'ES', 35, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (306, 'El Vestido de la Reina', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1645272580i/60449823.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (86, 'Ángeles y demonios', 'finished', NULL, 'https://m.media-amazon.com/images/I/81SWIrmJ7yL._SL1350_.jpg', NULL, NULL, NULL, NULL, 'ES', 53, 31, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (220, 'Beyond the Wand', 'finished', NULL, 'https://imagessl8.casadellibro.com/a/l/s7/38/9781529192438.webp', NULL, NULL, NULL, NULL, 'EN', 38, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (149, 'Cuentos Inconclusos de Númenor y la Tierra Media', 'reading', NULL, 'https://imagessl2.casadellibro.com/a/l/s7/12/9788445072912.webp', NULL, NULL, NULL, NULL, 'ES', 35, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (258, 'Dazai, Chuuya, Age Fifteen', 'finished', NULL, 'https://m.media-amazon.com/images/I/81QSgTjRqCL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 7, 7, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (349, 'El Castillo de Arena', 'finished', NULL, 'https://imagessl9.casadellibro.com/a/l/s7/79/9788419089779.webp', NULL, NULL, NULL, NULL, 'ES', 63, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (323, 'El Declive', 'finished', NULL, 'https://imagessl3.casadellibro.com/a/l/s7/53/9788494680953.webp', NULL, NULL, NULL, NULL, 'ES', 2, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (202, 'El Escarabajo de Oro', 'finished', NULL, 'https://libreriacarrera.com/16288-large_default/el-escarabajo-de-oro-edgar-allan-poe-anaya.jpg', NULL, NULL, NULL, NULL, 'ES', 6, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (126, 'El Fuego', 'finished', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/30/9788499081830.webp', NULL, NULL, NULL, NULL, 'ES', 15, 8, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (219, 'El Libro de la Oscuridad', 'finished', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1501042846i/35203102.jpg', NULL, NULL, NULL, NULL, 'ES', 43, 21, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (125, 'El Ocho', 'finished', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1268492575i/1560293.jpg', NULL, NULL, NULL, NULL, 'ES', 15, 8, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (212, 'El Prisma Negro', 'finished', NULL, 'https://imagessl3.casadellibro.com/a/l/s7/83/9788490322383.webp', NULL, NULL, NULL, NULL, 'ES', 15, 11, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (88, 'El Símbolo Perdido', 'finished', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1593784423i/6973514.jpg', NULL, NULL, NULL, NULL, 'ES', 11, 31, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (131, 'El Temor de un Hombre Sabio', 'finished', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1722608858i/12877610.jpg', NULL, NULL, NULL, NULL, 'ES', 15, 23, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (337, 'El Tren Nocturno de la Vía Láctea', 'finished', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1351003731i/16104186.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (357, 'Hanakotoba: El lenguaje de las flores', 'finished', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1554135623i/44710146.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (325, 'La Caja de Pandora', 'finished', NULL, 'https://imagessl7.casadellibro.com/a/l/s7/67/9788412658767.webp', NULL, NULL, NULL, NULL, 'ES', 19, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (128, 'La Daga', 'finished', NULL, 'https://m.media-amazon.com/images/I/51AbOVPmqTL.jpg', NULL, NULL, NULL, NULL, 'ES', 20, 25, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (133, 'Harry Potter and the Philosopher''s Stone', 'finished', NULL, 'https://d32vymxhv9fq6b.cloudfront.net/images/books/large/97810/9781037212994.jpg', NULL, NULL, NULL, 'Ed. Especial Ravenclaw', 'EN', 10, 40, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (286, 'Harry Potter y el Prisionero de Azkaban', 'finished', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/00/9788418174100.webp', NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', 45, 41, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (287, 'Harry Potter y el Cáliz de Fuego', 'finished', NULL, 'https://imagessl1.casadellibro.com/a/l/s7/91/9788418174391.webp', NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', 45, 41, 4, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (290, 'Harry Potter y las Reliquias de la Muerte', 'finished', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/40/9788418797040.webp', NULL, NULL, NULL, 'Ed. Especial Hufflepuff', 'ES', 45, 41, 7, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (292, 'Harry Potter y la Cámara Secreta', 'finished', NULL, 'https://www.libreriacamara.com/es/imagenes/9788418/978841863701.JPG', NULL, NULL, NULL, 'Minalima', 'ES', 45, 42, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (197, 'Lo Mejor de Japón', 'not_started', NULL, 'https://imagessl2.casadellibro.com/a/l/s7/72/9788408178972.webp', NULL, NULL, NULL, NULL, 'ES', 32, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (238, 'Thousand Autumns vol. 3', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81wmiBJDRdL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 39, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (240, 'Thousand Autumns vol. 5', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81zxSUnYvfL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 39, 5, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (173, 'Heaven Official Blessing (Tian Guan Ci Fu) vol. 1', 'finished', NULL, 'https://m.media-amazon.com/images/I/91XkwAUMy8L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 19, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (176, 'Heaven Official Blessing (Tian Guan Ci Fu) vol. 4', 'finished', NULL, 'https://m.media-amazon.com/images/I/91IYJiC6LmL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 19, 4, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (371, 'Cien vistas del Monte Fuji', 'finished', NULL, 'https://imagessl6.casadellibro.com/a/l/s7/36/9788419035936.webp', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-09-01 07:36:54.885509+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (178, 'Heaven Official Blessing (Tian Guan Ci Fu) vol. 6', 'finished', NULL, 'https://m.media-amazon.com/images/I/81T24kWqycL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 19, 6, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (300, 'Estrella de Plata', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1638047880i/59711355.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (358, 'Folk tales of Japan', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1658186999i/61605759.jpg', NULL, NULL, NULL, NULL, 'EN', 60, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (242, 'Guardian vol. 2', 'not_started', NULL, 'https://m.media-amazon.com/images/I/71nJlgeQNxL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 17, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (186, 'Remnants of Filth (YUWU) vol. 1', 'finished', NULL, 'https://m.media-amazon.com/images/I/91Zawa5yTPL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 30, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (188, 'Remnants of Filth (YUWU) vol. 3', 'finished', NULL, 'https://m.media-amazon.com/images/I/81c8dVYGH9L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 30, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (190, 'Remnants of Filth (YUWU) vol. 5', 'finished', NULL, 'https://m.media-amazon.com/images/I/91U27tZYNkL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 30, 5, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (192, 'Remnants of Filth (YUWU) vol. 7', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91KVFWm-B5L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 30, 7, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (231, 'The Husky and his White Cat Shizun vol. 10', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91kZpEJrHiL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 36, 10, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (223, 'The Husky and his White Cat Shizun vol. 2', 'finished', NULL, 'https://m.media-amazon.com/images/I/81Xb5gfCPeL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 36, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (226, 'The Husky and his White Cat Shizun vol. 5', 'finished', NULL, 'https://m.media-amazon.com/images/I/91Bh+OG+r6L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 36, 5, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (228, 'The Husky and his White Cat Shizun vol. 7', 'finished', NULL, 'https://m.media-amazon.com/images/I/91E1N-SMGgL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 36, 7, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (359, 'Kokoro: Ecos y apuntes de la vida íntima de Japón', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81d4IHAqYLL._SL1166_.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (91, 'La Conspiración', 'finished', NULL, 'https://imagessl3.casadellibro.com/a/l/s7/93/9788492516193.webp', NULL, NULL, NULL, NULL, 'ES', 53, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (304, 'La Casa Vacía', 'not_started', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1638048456i/59711389.jpg', NULL, NULL, NULL, NULL, 'ES', 42, 38, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (152, 'La Mujer de las Nueve Lunas', 'not_started', NULL, 'https://imagessl4.casadellibro.com/a/l/s7/64/9788401352164.webp', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (215, 'Forjada en la Tormenta', 'finished', NULL, 'https://imagessl9.casadellibro.com/a/l/s7/49/9788466368049.webp', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (234, 'Genshin Impact Artbook: Inazuma', 'finished', NULL, 'https://m.media-amazon.com/images/I/71eEusfoYpL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'CN', 50, 15, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (107, 'Grandes Esperanzas', 'finished', NULL, 'https://imagessl5.casadellibro.com/a/l/s7/05/9788491052005.webp', NULL, NULL, NULL, NULL, 'ES', 39, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (137, 'Harry Potter y el Cáliz de Fuego', 'finished', NULL, 'https://imagessl6.casadellibro.com/a/l/s7/56/9788478886456.webp', NULL, NULL, NULL, NULL, 'ES', 45, 18, 4, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (135, 'Harry Potter y la Cámara Secreta', 'finished', NULL, 'https://imagessl7.casadellibro.com/a/l/s7/57/9788478884957.webp', NULL, NULL, NULL, NULL, 'ES', 45, 18, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (140, 'Harry Potter y las Reliquias de la Muerte', 'finished', NULL, 'https://imagessl5.casadellibro.com/a/l/s7/05/9788498381405.webp', NULL, NULL, NULL, NULL, 'ES', 45, 18, 7, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (193, 'Japón con Jamón', 'finished', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/50/9788467939750.webp', NULL, NULL, NULL, NULL, 'ES', 36, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (361, 'Kanjiru; La magia de los Kanji', 'finished', NULL, 'https://imagessl6.casadellibro.com/a/l/s7/96/9788419035196.webp', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (265, 'Kokoro', 'finished', NULL, 'https://m.media-amazon.com/images/I/61ugRibOxEL._SL1000_.jpg', NULL, NULL, NULL, NULL, 'ES', 27, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (213, 'La Daga de la Ceguera', 'finished', NULL, 'https://imagessl2.casadellibro.com/a/l/s7/02/9788466356602.webp', NULL, NULL, NULL, NULL, 'ES', 15, 11, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (144, 'La Isla del Tesoro', 'finished', NULL, 'https://m.media-amazon.com/images/I/81js7PuU6DS._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 39, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (346, 'La Luz del Norte', 'not_started', NULL, 'https://m.media-amazon.com/images/I/61nwCRR+uIL._SL1050_.jpg', NULL, NULL, NULL, NULL, 'ES', 45, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (167, 'La Noche y su Luna', 'finished', NULL, 'https://imagessl3.casadellibro.com/a/l/s7/33/9788419366733.webp', NULL, NULL, NULL, NULL, 'ES', 3, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (159, 'La Plaga del Cielo', 'not_started', NULL, 'https://imagessl3.casadellibro.com/a/l/s7/13/9788466360913.webp', NULL, NULL, NULL, NULL, 'ES', 15, 33, 4, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (156, 'La Sal de la Tierra', 'not_started', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/40/9788466333740.webp', NULL, NULL, NULL, NULL, 'ES', 15, 33, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (208, 'La Vuelta al Mundo en Ochenta Días', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81HsiRfl1lL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 66, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (321, 'Indigno de Ser Humano', 'finished', NULL, 'https://imagessl2.casadellibro.com/a/l/s7/72/9788493741372.webp', NULL, NULL, NULL, NULL, 'ES', 2, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (352, 'Los Misterios de la Taberna Kamogawa', 'not_started', NULL, 'https://m.media-amazon.com/images/I/51I1p1HwkWL.jpg', NULL, NULL, NULL, NULL, 'ES', 15, 35, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (113, 'Los Pilares de la Tierra', 'not_started', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/10/9788401328510.webp', NULL, NULL, NULL, NULL, 'ES', 15, 28, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (194, 'Minna no Nihongo', 'not_started', NULL, 'https://m.media-amazon.com/images/I/51R397uXFwL._SL1002_.jpg', NULL, NULL, NULL, NULL, 'JP', 1, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (146, 'La Comunidad del Anillo', 'not_started', NULL, 'https://image-hamelyn.b-cdn.net/products/9789505470679/1.webp?width=600&height=900', NULL, NULL, NULL, NULL, 'ES', 35, 12, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (153, 'El Camino de las Sombras', 'finished', NULL, 'https://m.media-amazon.com/images/I/81x7LK2wunL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 15, 14, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (245, 'Ballad of Sword and Wine vol. 2', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81QuL5MOd+L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 6, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (236, 'Thousand Autumns vol. 1', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91JK1rhzIGL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 39, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (182, 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 2', 'finished', NULL, 'https://m.media-amazon.com/images/I/813reqaqIbL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 16, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (166, 'Ready Player One', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91hqCgcU4GL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 5, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (163, 'Sabikui Bisco vol. 3: Urban Life-style "Tokyo"', 'not_started', NULL, 'https://m.media-amazon.com/images/I/91iQEdsCL7L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 32, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (184, 'Grandmaster of Demonic Cultivation (Mo Dao Zu Shi) vol. 4', 'finished', NULL, 'https://m.media-amazon.com/images/I/81KJ8of3+5L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 48, 16, 4, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (362, 'Shiawase-do', 'not_started', NULL, 'https://imagessl4.casadellibro.com/a/l/s7/74/9788408213574.webp', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (311, 'Sobre el Dragón del Abismo', 'not_started', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/90/9788494239090.webp', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (315, 'Soy un Gato', 'not_started', NULL, 'https://impedimenta.es/wp-content/uploads/MAQUETA-CUBIERTA_SOY-UN-GATO_SOSEKI_NE-1_04.jpg', NULL, NULL, NULL, NULL, 'ES', 27, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (101, 'The Sherlock Holmes Complete Collection', 'not_started', NULL, 'https://m.media-amazon.com/images/I/81qTj1JGS1L._SL1382_.jpg', NULL, NULL, NULL, NULL, 'ES', 55, 34, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (348, 'Un Lugar Desconocido', 'not_started', NULL, 'https://m.media-amazon.com/images/I/51OBzA-vkSL._SL1200_.jpg', NULL, NULL, NULL, NULL, 'ES', 63, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (272, 'Underground', 'not_started', NULL, 'https://m.media-amazon.com/images/I/51m3RI8u8gL._SL1050_.jpg', NULL, NULL, NULL, NULL, 'ES', 52, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (255, '55 minutes', 'finished', NULL, 'https://m.media-amazon.com/images/I/81Oy56vTgxL._AC_UF1000,1000_QL80_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 7, 4, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (210, 'A Christmas Carol', 'finished', NULL, 'https://m.media-amazon.com/images/I/81TcP2FuvlL._AC_UF1000,1000_QL80_.jpg', NULL, NULL, NULL, NULL, 'EN', 64, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (217, 'El Guerrero a la Sombra del Cerezo', 'finished', NULL, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1506501546i/34216084.jpg', NULL, NULL, NULL, NULL, 'ES', 15, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (95, 'En Llamas', 'finished', NULL, 'https://imagessl3.casadellibro.com/a/l/s7/63/9788413144863.webp', NULL, NULL, NULL, NULL, 'ES', 42, 27, 2, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (281, 'Los Años de Peregrinación del Mundo sin Color', 'finished', NULL, 'https://imagessl2.casadellibro.com/a/l/s7/32/9788483839232.webp', NULL, NULL, NULL, NULL, 'ES', 52, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (353, 'Mis días en la librería Morisaki', 'finished', NULL, 'https://m.media-amazon.com/images/I/91G3TjHdCTL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 31, 24, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (172, 'No. 6', 'finished', NULL, 'https://cdn.thestorygraph.com/3tqv9cpr1srjw0aflfj12d8wk73r', NULL, NULL, NULL, NULL, 'EN', 60, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (150, 'O Hobbit', 'finished', NULL, 'https://m.media-amazon.com/images/I/71ZkF8MQVcL._SL1000_.jpg', NULL, NULL, NULL, NULL, 'ES', 57, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (252, 'Osamu Dazai''s Entrance Exam', 'finished', NULL, 'https://m.media-amazon.com/images/I/81zJTGwXrtL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 7, 1, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (295, 'Quidditch a Través de los Tiempos', 'finished', NULL, 'https://m.media-amazon.com/images/I/91HfbtSMwYL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 56, 18, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (332, 'Rashomon y otros relatos históricos', 'finished', NULL, 'https://m.media-amazon.com/images/I/71MDW-buNtL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 47, NULL, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (97, 'Sherlock Holmes: Estudio en Escarlata', 'finished', NULL, 'https://imgs.search.brave.com/mCF_dFDdV1a2x0BYGMPV_sJ7-3ob_UlVnbgtzvj7gmE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFUR25KWitDeEwu/anBn', NULL, NULL, NULL, NULL, 'ES', 15, 34, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (99, 'Sherlock Holmes: Relatos 1', 'finished', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/00/9788491050100.webp', NULL, NULL, NULL, NULL, 'ES', 39, 34, NULL, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (96, 'Sinsajo', 'finished', NULL, 'https://imagessl3.casadellibro.com/a/l/adic/mc/s7/64/9788413144764-3.webp', NULL, NULL, NULL, NULL, 'ES', 42, 27, 3, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (259, 'Stormbringer', 'finished', NULL, 'https://m.media-amazon.com/images/I/81tD0o9G4nL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 7, 8, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (260, 'The Day I took in Dazai', 'finished', NULL, 'https://m.media-amazon.com/images/I/91wzr18kWrL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 58, 7, 9, '2026-08-29 15:01:03.746625+00');
INSERT INTO public.books OVERRIDING SYSTEM VALUE VALUES (329, 'The Poems of Nakahara Chuuya', 'finished', NULL, 'https://m.media-amazon.com/images/I/512hJqrk5fL._SL1360_.jpg', NULL, NULL, NULL, NULL, 'EN', 22, NULL, NULL, '2026-08-29 15:01:03.746625+00');


--
-- TOC entry 4121 (class 0 OID 17576)
-- Dependencies: 365
-- Data for Name: editorials; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (1, '3A Network', 'JP', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (2, 'Al Margen - Sajalín editores', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (3, 'Alfaguara', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (4, 'Alianza Editorial', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (5, 'Anagrama', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (6, 'Anaya', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (7, 'Andre Deutsch', 'GB', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (8, 'Berenice', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (9, 'Blackie Books', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (10, 'Bloomsbury', 'GB', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (11, 'Booket', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (12, 'Candaya', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (13, 'Canongate', 'GB', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (14, 'Chidori Books', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (15, 'DeBolsillo', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (16, 'Distrito Manga', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (17, 'Diábolo Ediciones', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (18, 'ECC', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (19, 'Ediciones Sajalín', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (20, 'Editorial B', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (21, 'Galaxia', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (22, 'Gracewing', 'GB', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (23, 'Granta', 'GB', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (24, 'Grijalbo', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (25, 'Hakusensha', 'JP', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (26, 'HarperCollins', 'US', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (27, 'Impedimenta', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (28, 'Ivrea', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (29, 'Kadokawa Shoten', 'JP', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (30, 'La Esfera de los Libros', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (31, 'Letras de Plata', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (32, 'Lonely Planet', 'US', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (33, 'Lumen', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (34, 'Milky Way Ediciones', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (35, 'Minotauro', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (36, 'Norma Editorial', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (37, 'Panini Manga', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (38, 'Penguin', 'GB', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (39, 'Penguin Clásicos', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (40, 'Planeta', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (41, 'Prion', 'GB', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (42, 'RBA', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (43, 'Roca Editorial', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (44, 'SM', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (45, 'Salamandra', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (46, 'Santillana', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (47, 'Satori Ediciones', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (48, 'Seven Seas', 'US', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (49, 'Suma', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (50, 'Tianwen Kadokawa', 'CN', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (51, 'Tomodomo', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (52, 'Tusquets Editores', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (53, 'Umbriel', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (54, 'Vintage', 'GB', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (55, 'Vintage Classics', 'GB', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (56, 'Whizz Hard Books', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (57, 'Xerais', 'ES', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (58, 'Yen ON', 'US', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (59, 'Yen Press', 'US', NULL, NULL, '2026-08-29 14:20:23.169292+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (60, 'Amazon KDP', 'US', NULL, NULL, '2026-08-29 14:58:17.911525+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (61, 'Austral', 'ES', NULL, NULL, '2026-08-29 14:58:17.911525+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (62, 'Hermida Editores', 'ES', NULL, NULL, '2026-08-29 14:58:17.911525+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (63, 'Libros del Asteroide', 'ES', NULL, NULL, '2026-08-29 14:58:17.911525+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (64, 'Macmillan', 'GB', NULL, NULL, '2026-08-29 14:58:17.911525+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (65, 'Montena', 'ES', NULL, NULL, '2026-08-29 14:58:17.911525+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (66, 'Plutón Ediciones', 'ES', NULL, NULL, '2026-08-29 14:58:17.911525+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (67, 'Quaterni', 'ES', NULL, NULL, '2026-08-29 14:58:17.911525+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (68, 'Sans Soleil Ediciones', 'ES', NULL, NULL, '2026-08-29 14:58:17.911525+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (69, 'Susaeta', 'ES', NULL, NULL, '2026-08-29 14:58:17.911525+00');
INSERT INTO public.editorials OVERRIDING SYSTEM VALUE VALUES (70, 'Trotta Editorial', 'ES', NULL, NULL, '2026-08-29 14:58:17.911525+00');


--
-- TOC entry 4142 (class 0 OID 18292)
-- Dependencies: 392
-- Data for Name: fandoms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.fandoms OVERRIDING SYSTEM VALUE VALUES (1, 'BBC Sherlock', 'BBC Sherlock', '2026-09-20 21:40:47.217503+00');
INSERT INTO public.fandoms OVERRIDING SYSTEM VALUE VALUES (2, 'Bungou Stray Dogs', 'Bungou Stray Dogs', '2026-09-21 07:39:24.25542+00');
INSERT INTO public.fandoms OVERRIDING SYSTEM VALUE VALUES (3, 'Harry Potter', 'Harry Potter', '2026-09-21 07:39:50.015966+00');
INSERT INTO public.fandoms OVERRIDING SYSTEM VALUE VALUES (4, 'Yuri on Ice', 'Yuri on Ice', '2026-09-21 07:40:08.266794+00');


--
-- TOC entry 4147 (class 0 OID 18376)
-- Dependencies: 397
-- Data for Name: fanfic_fandoms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.fanfic_fandoms VALUES (6, 1);
INSERT INTO public.fanfic_fandoms VALUES (6, 3);
INSERT INTO public.fanfic_fandoms VALUES (1, 1);
INSERT INTO public.fanfic_fandoms VALUES (7, 1);
INSERT INTO public.fanfic_fandoms VALUES (2, 3);
INSERT INTO public.fanfic_fandoms VALUES (5, 1);
INSERT INTO public.fanfic_fandoms VALUES (8, 1);
INSERT INTO public.fanfic_fandoms VALUES (4, 1);
INSERT INTO public.fanfic_fandoms VALUES (9, 1);
INSERT INTO public.fanfic_fandoms VALUES (3, 2);
INSERT INTO public.fanfic_fandoms VALUES (10, 3);
INSERT INTO public.fanfic_fandoms VALUES (12, 3);
INSERT INTO public.fanfic_fandoms VALUES (13, 3);
INSERT INTO public.fanfic_fandoms VALUES (11, 3);
INSERT INTO public.fanfic_fandoms VALUES (14, 3);
INSERT INTO public.fanfic_fandoms VALUES (15, 3);
INSERT INTO public.fanfic_fandoms VALUES (16, 3);
INSERT INTO public.fanfic_fandoms VALUES (17, 3);
INSERT INTO public.fanfic_fandoms VALUES (18, 2);


--
-- TOC entry 4148 (class 0 OID 18391)
-- Dependencies: 398
-- Data for Name: fanfic_ships; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.fanfic_ships VALUES (6, 1);
INSERT INTO public.fanfic_ships VALUES (1, 1);
INSERT INTO public.fanfic_ships VALUES (7, 1);
INSERT INTO public.fanfic_ships VALUES (2, 3);
INSERT INTO public.fanfic_ships VALUES (5, 1);
INSERT INTO public.fanfic_ships VALUES (8, 1);
INSERT INTO public.fanfic_ships VALUES (4, 1);
INSERT INTO public.fanfic_ships VALUES (9, 1);
INSERT INTO public.fanfic_ships VALUES (3, 2);
INSERT INTO public.fanfic_ships VALUES (10, 3);
INSERT INTO public.fanfic_ships VALUES (12, 3);
INSERT INTO public.fanfic_ships VALUES (13, 3);
INSERT INTO public.fanfic_ships VALUES (11, 3);
INSERT INTO public.fanfic_ships VALUES (14, 3);
INSERT INTO public.fanfic_ships VALUES (15, 3);
INSERT INTO public.fanfic_ships VALUES (16, 3);
INSERT INTO public.fanfic_ships VALUES (17, 3);
INSERT INTO public.fanfic_ships VALUES (18, 2);


--
-- TOC entry 4146 (class 0 OID 18328)
-- Dependencies: 396
-- Data for Name: fanfics; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (1, 'We Go Anywhere But To The Ground', '{"Geordie Lover"}', 'Mature', 24623, 1, 83, 'finished', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'Every second that ticks by is a reminder of the deafening quiet Sherlock has left behind. John feels his soul slip out of his fingertips, inch by inch, with every passing day.

At some point, he stops trying to hold on.', NULL, 'https://archiveofourown.org/works/331636', 'https://i.ibb.co/5h5Fw1sG/WE-GO-ANYWHERE-BUT-TO-THE-GROUND.png', NULL, '2026-09-21 15:22:13.498289+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (9, 'Don''t Panic', '{Tindomerelhloni}', 'Explicit', 104676, 52, 381, 'not_started', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'Omega Sherlock has learned the art of blending in. He can live in plain sight of all the Alpha''s of the world without being found out. The best way to keep his secret is to tell no one, which is hardly an issue. Why would he want to tell anyone?

But then John Watson limps into his life and changes everything.

In his uni years, Sherlock had one bad experience with a flatmate''s Alpha boyfriend. Mycroft Holmes is not pleased his baby brother has offered the spare room to an Alpha. However part of the agreement to Sherlock living alone had come down to Mycroft turning his brother''s room into a panic room. So Mycroft sits back and waits for the Alpha to turn on his brother.', NULL, 'https://archiveofourown.org/works/37878109', 'https://i.ibb.co/TqM6WPGc/johnlock-dont-panic-compressed.png', NULL, '2026-09-23 08:05:59.190164+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (6, 'Of Wizard Detectives and Pirate Doctors', '{"Hanna not Montana"}', 'Mature', 185558, 20, 631, 'not_started', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'Sherlock AU set in Hogwarts. Follows Johnlock''s lives through the years at Hogwarts and their adventures there; joy and pain, werewolves, dementors, first loves, Triwizard Tournaments and true love.', NULL, 'https://archiveofourown.org/works/1034307/chapters/2061722', 'https://i.ibb.co/0VMQLys3/JOHNLOCK-OF-WIZARD-DETECTIVES-compressed.png', NULL, '2026-09-23 07:19:30.46204+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (5, 'State of Flux', '{Atiki}', 'Explicit', 24665, 4, 85, 'finished', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'John’s marriage is over and he is finally back home, Baker Street.

Sherlock is awfully insecure and John is awfully hesitant, and they''re both awkward idiots, of course, but they figure it out.', NULL, 'https://archiveofourown.org/works/2407925/chapters/5325416', 'https://i.ibb.co/RpTP3wmK/JOHNLOCK-STATE-OF-FLUX-compressed.png', NULL, '2026-09-23 07:11:14.830138+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (8, 'The Gilded Cage', '{"Beautiful Fiction"}', 'Explicit', 326883, 31, 1109, 'finished', NULL, NULL, NULL, NULL, '{}', 'EN', '{Omegaverse,"Omega Sherlock","Alpha John"}', 'In a world where Omegas are the property of the elite Alphas, locked away and treasured by those wealthy enough to buy them, John never questioned his flatmate''s secondary gender. Sherlock Holmes was an Alpha through-and through.

Wasn''t he?

A chance discovery turns the world on its head, and John is left grappling to come to terms with Sherlock''s past as events conspire to threaten their future.', NULL, 'https://archiveofourown.org/works/1103555/chapters/2219986', 'https://i.ibb.co/xQ0Ym0P/THE-GILDED-CAGE-compressed.png', NULL, '2026-09-23 07:43:11.54871+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (3, 'Everything or Nothing', '{"Cataclysmic Event"}', 'Explicit', 264937, 17, 894, 'finished', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'College AU where Chuuya finds out that the boy he drunkenly made out with the night of orientation is his new roommate. His arrogant, smug, very straight roommate.

And the boys are each convinced the other is trying to ruin their life by making them go absolutely insane.', NULL, 'https://archiveofourown.org/works/26188642/chapters/63728857', 'https://i.ibb.co/Z1x2M04N/copilot-image-1775340109110.png', NULL, '2026-09-22 21:28:54.359399+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (7, 'A Waste of Breath', '{Chryse}', 'Explicit', 95452, 25, 334, 'finished', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'John had always assumed Sherlock was uninterested, untouchable, married to his work. He was wrong on all counts. But when Sherlock embarks on a relationship, John worries that he is in over his head...and this time he might be right.', NULL, 'https://archiveofourown.org/works/1004240/chapters/1989691', 'https://i.ibb.co/MDDwK1Mj/A-WASTE-OF-BREATH-compressed.png', NULL, '2026-09-23 07:36:30.088241+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (10, 'No Harm', '{"Tessa Crowley"}', 'Explicit', 46830, 3, 158, 'not_started', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'After a long, bloody war, Draco Malfoy just wants to do something good with his life for a change, and resolves to become a healer. But magical society refuses to make it easy for him, and an increasingly dramatic series of events—all of them instigated by Harry Potter—get him kicked out of med school, force him to live in exile, and threaten to destroy the new life he’s trying so desperately to build.

But Harry isn’t instigating anything—at least not on purpose. He’s just trying to work up the nerve to ask him out. His efforts don’t appear to be going great.', NULL, 'https://archiveofourown.org/works/52452140/chapters/132692555', 'https://i.ibb.co/whz9qNsN/drarry-no-harm-compressed.png', NULL, '2026-09-23 09:13:55.669328+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (2, 'A Twist of Fate', '{Oakstone730}', 'Teen and Up Audiences', 302014, 29, 1025, 'finished', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'Draco asks Harry to help him beat the Imperius curse during 4th year. The lessons turn into more than either expected. A story of redemption and forgiveness. 

Pairings: HP/DM (Slash) 

Timeframe: 1994-2002 Goblet to 4 yrs post-DH EWE.

Rating T for language, high angst, content.', NULL, 'https://archiveofourown.org/works/473335/chapters/819506', 'https://i.ibb.co/QFrZ5BS9/TWIST-OF-FATE.png', NULL, '2026-09-21 21:50:57.960531+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (4, 'All of These Words', '{"Orphan Account"}', 'Mature', 7879, 1, 27, 'finished', NULL, NULL, NULL, NULL, '{}', 'EN', '{"Ravenclaw Sherlock","Gryffindor John"}', 'There is one singular Ravenclaw in John’s Potions class.

Seven years at Hogwarts School of Witchcraft and Wizardry.', NULL, 'https://archiveofourown.org/works/1184034?view_adult=true', 'https://i.ibb.co/rPWbFBt/JOHNLOCK-ALL-OF-THESE-WORDS-compressed.png', NULL, '2026-09-23 06:38:50.840093+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (12, 'Basic Instincts', '{"Tophats and Teacups"}', 'Explicit', 60281, 9, 207, 'finished', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'After five years of taking potions to hide the most shameful part of himself, Harry is forced to confront what being an ''Omega'' really means. He struggles with his budding attraction to Alphas, and finds that the very instincts he''s been avoiding might be the key to helping him overcome the nightmares of war.', NULL, 'http://archiveofourown.org/works/34267270', 'https://i.ibb.co/cKfZZvk6/BASIC-INSTINCTS-compressed.png', NULL, '2026-09-23 15:34:32.665449+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (13, 'No Place to Hide', '{Aneiria}', 'Explicit', 11700, 8, 44, 'finished', NULL, NULL, NULL, NULL, '{}', 'EN', '{Omegaverse,"Alpha Draco","Omega Harry"}', 'Harry Potter has the perfect life: great friends, a coveted job with the Aurors, and no confusing relationship despite his alpha designation. There is only one problem: Harry Potter is bored to tears.

Enter Draco Malfoy, his old enemy, brought in to work on a tricky case. He’s just as irritating and arrogant as Harry remembers, and as another alpha, almost everything he does sets Harry’s teeth on edge.

And now Harry has an even bigger problem: Harry is almost definitely certain that Draco Malfoy is meant to be his mate.', NULL, 'http://archiveofourown.org/works/29701239', 'https://i.ibb.co/0yfhxtT5/NO-PLACE-TO-HIDE.png', NULL, '2026-09-23 15:46:12.27615+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (11, 'All Our Secrets Laid Bare', '{"Fire the Sound"}', 'Explicit', 149549, 16, 509, 'finished', NULL, NULL, NULL, NULL, '{}', 'EN', '{"Auror partners"}', 'Over the six years Draco Malfoy has been an Auror, four of his partners have turned up dead. Harry Potter is assigned as his newest partner to investigate just what is going on.', NULL, 'https://archiveofourown.org/works/1227880', 'https://i.ibb.co/3mc5GkBR/ALL-OUR-SECRETS-LAY-BARE-compressed.png', NULL, '2026-09-23 15:32:25.024843+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (14, 'Running on Air', '{Eleventy7}', 'Teen and Up Audiences', 74880, 17, 260, 'not_started', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'Draco Malfoy has been missing for three years. Harry is assigned the cold case and finds himself slowly falling in love with the memories he collects.', NULL, 'https://archiveofourown.org/works/3171550', 'https://i.ibb.co/hFDrMMdt/RUNNING-ON-AIR-compressed.png', NULL, '2026-09-23 15:50:17.721939+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (15, 'Labyrinth of Hearts', '{"Unreliable Witness"}', 'Explicit', 341641, 75, 1184, 'not_started', NULL, NULL, NULL, NULL, '{}', 'EN', '{Canon-compliant}', 'Harry and Draco were never just enemies. From their chance encounter before Hogwarts, Draco felt something he’d been taught to hate… something undesirable, “disgusting”, and yet increasingly impossible to ignore.

Through seven years of rivalry, obsession, cruelty, hunger, and war, their lives become intertwined in a way that affects everyone around them. Both boys wrestle with their shame, longing, morality, sexuality, trauma, and the disturbing possibility that what draws them together might be stronger than everything that threatens to keep them apart.

This canon-compliant dark romance retcons Drarry directly into the original books and beyond. It follows their forbidden, toxic, addictive, tender, and increasingly passionate relationship from childhood into adulthood.

For readers who want morally messy romance, heart-rending drama, and the possibility that Harry and Draco were always in love even while it looked like hate... This love story is Drarry endgame with a bitter-sweet (and hard-won) Happily Ever After.', NULL, 'https://archiveofourown.org/works/50105092', 'https://i.ibb.co/TMwD6Fp4/LABYRINTH-OF-HEARTS-compressed.png', NULL, '2026-09-23 15:54:17.825146+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (16, 'What We Pretend We Can''t See', '{Gyzym}', 'Mature', 131086, 14, 446, 'not_started', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'Seven years out from the war, Harry learns the hard truth of old history: it’s never quite as far behind you as you thought.', NULL, 'https://archiveofourown.org/works/9794657', 'https://i.ibb.co/FkKfSjKf/WHAT-WE-PRETEND-WE-CANT-SEE-compressed.png', NULL, '2026-09-23 15:56:31.993173+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (17, 'Draco Malfoy and the Mirror of Ecidyrue', '{Starbrigid}', 'Teen and Up Audiences', 90081, 18, 312, 'not_started', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', 'All it takes is one look in a mirror and an ill-advised attempt to shatter it, before an embittered Draco Malfoy fresh out of Azkaban is sent back into his body on the day he gets his Hogwarts letter.

Suddenly, Draco has an unwanted second chance, with a Sorting Hat that doesn''t know what to do with him, a certain Muggleborn who won''t leave his study table alone, and green eyes he just can''t get out of his head. And then there''s his new wand, whose choice of him could just mark him as every bit as dark a wizard as his name means he should be.', NULL, 'https://archiveofourown.org/works/23872387/chapters/57383854', 'https://i.ibb.co/QvFbXMp6/DRACO-MALFOY-MIRROR-EDIDYRUE-compressed.png', NULL, '2026-09-23 16:01:01.898495+00');
INSERT INTO public.fanfics OVERRIDING SYSTEM VALUE VALUES (18, 'What''s Your Name?', '{"Cataclysmic Event"}', 'Explicit', 261113, 51, 901, 'finished', NULL, NULL, NULL, NULL, '{}', 'EN', '{}', '"I said, what''s your name?"

Dazai snaps to attention to see that Chuuya is staring right at him, and suddenly his mouth feels like sandpaper. Jesus. Who has eyes like that?!

“Ozai—"

“Huh?”

“Dazoo—"

“I’m sorry, what?”

“Dazai Osamu.”
Sometimes--the worst introductions can last a lifetime.

High school AU, slice of life, growing up together.', NULL, 'http://archiveofourown.org/works/23548405', 'https://i.ibb.co/ZRfV1h0Y/What-s-Your-Name.jpg', NULL, '2026-09-23 16:26:45.76575+00');


--
-- TOC entry 4132 (class 0 OID 17666)
-- Dependencies: 376
-- Data for Name: manga_authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.manga_authors VALUES (2, 76);
INSERT INTO public.manga_authors VALUES (3, 50);
INSERT INTO public.manga_authors VALUES (4, 101);
INSERT INTO public.manga_authors VALUES (5, 102);
INSERT INTO public.manga_authors VALUES (6, 161);
INSERT INTO public.manga_authors VALUES (6, 153);
INSERT INTO public.manga_authors VALUES (7, 42);
INSERT INTO public.manga_authors VALUES (8, 131);
INSERT INTO public.manga_authors VALUES (9, 100);
INSERT INTO public.manga_authors VALUES (9, 141);
INSERT INTO public.manga_authors VALUES (10, 100);
INSERT INTO public.manga_authors VALUES (10, 141);
INSERT INTO public.manga_authors VALUES (10, 129);
INSERT INTO public.manga_authors VALUES (11, 100);
INSERT INTO public.manga_authors VALUES (11, 141);
INSERT INTO public.manga_authors VALUES (12, 161);
INSERT INTO public.manga_authors VALUES (12, 153);
INSERT INTO public.manga_authors VALUES (13, 101);
INSERT INTO public.manga_authors VALUES (14, 76);
INSERT INTO public.manga_authors VALUES (15, 50);
INSERT INTO public.manga_authors VALUES (16, 84);
INSERT INTO public.manga_authors VALUES (17, 123);
INSERT INTO public.manga_authors VALUES (18, 55);
INSERT INTO public.manga_authors VALUES (18, 49);
INSERT INTO public.manga_authors VALUES (19, 55);
INSERT INTO public.manga_authors VALUES (19, 49);
INSERT INTO public.manga_authors VALUES (20, 55);
INSERT INTO public.manga_authors VALUES (20, 49);
INSERT INTO public.manga_authors VALUES (21, 101);
INSERT INTO public.manga_authors VALUES (21, 83);
INSERT INTO public.manga_authors VALUES (22, 110);
INSERT INTO public.manga_authors VALUES (23, 98);
INSERT INTO public.manga_authors VALUES (24, 51);
INSERT INTO public.manga_authors VALUES (24, 80);
INSERT INTO public.manga_authors VALUES (25, 40);
INSERT INTO public.manga_authors VALUES (26, 98);
INSERT INTO public.manga_authors VALUES (27, 168);
INSERT INTO public.manga_authors VALUES (28, 102);
INSERT INTO public.manga_authors VALUES (29, 89);
INSERT INTO public.manga_authors VALUES (30, 53);
INSERT INTO public.manga_authors VALUES (31, 163);
INSERT INTO public.manga_authors VALUES (32, 150);
INSERT INTO public.manga_authors VALUES (32, 112);
INSERT INTO public.manga_authors VALUES (32, 93);
INSERT INTO public.manga_authors VALUES (33, 150);
INSERT INTO public.manga_authors VALUES (33, 112);
INSERT INTO public.manga_authors VALUES (33, 93);
INSERT INTO public.manga_authors VALUES (34, 150);
INSERT INTO public.manga_authors VALUES (34, 112);
INSERT INTO public.manga_authors VALUES (34, 93);
INSERT INTO public.manga_authors VALUES (35, 52);
INSERT INTO public.manga_authors VALUES (36, 102);
INSERT INTO public.manga_authors VALUES (37, 102);
INSERT INTO public.manga_authors VALUES (38, 142);
INSERT INTO public.manga_authors VALUES (39, 122);


--
-- TOC entry 4133 (class 0 OID 17681)
-- Dependencies: 377
-- Data for Name: manga_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4136 (class 0 OID 17717)
-- Dependencies: 380
-- Data for Name: manga_volume_authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.manga_volume_authors VALUES (163, 51);
INSERT INTO public.manga_volume_authors VALUES (163, 80);
INSERT INTO public.manga_volume_authors VALUES (164, 51);
INSERT INTO public.manga_volume_authors VALUES (164, 80);
INSERT INTO public.manga_volume_authors VALUES (165, 51);
INSERT INTO public.manga_volume_authors VALUES (165, 80);
INSERT INTO public.manga_volume_authors VALUES (166, 51);
INSERT INTO public.manga_volume_authors VALUES (166, 80);
INSERT INTO public.manga_volume_authors VALUES (167, 51);
INSERT INTO public.manga_volume_authors VALUES (167, 80);
INSERT INTO public.manga_volume_authors VALUES (168, 51);
INSERT INTO public.manga_volume_authors VALUES (168, 80);
INSERT INTO public.manga_volume_authors VALUES (169, 51);
INSERT INTO public.manga_volume_authors VALUES (169, 80);
INSERT INTO public.manga_volume_authors VALUES (170, 51);
INSERT INTO public.manga_volume_authors VALUES (170, 80);
INSERT INTO public.manga_volume_authors VALUES (171, 51);
INSERT INTO public.manga_volume_authors VALUES (171, 80);
INSERT INTO public.manga_volume_authors VALUES (172, 55);
INSERT INTO public.manga_volume_authors VALUES (172, 49);
INSERT INTO public.manga_volume_authors VALUES (173, 55);
INSERT INTO public.manga_volume_authors VALUES (173, 49);
INSERT INTO public.manga_volume_authors VALUES (174, 55);
INSERT INTO public.manga_volume_authors VALUES (174, 49);
INSERT INTO public.manga_volume_authors VALUES (175, 55);
INSERT INTO public.manga_volume_authors VALUES (175, 49);
INSERT INTO public.manga_volume_authors VALUES (176, 55);
INSERT INTO public.manga_volume_authors VALUES (176, 49);
INSERT INTO public.manga_volume_authors VALUES (177, 55);
INSERT INTO public.manga_volume_authors VALUES (177, 49);
INSERT INTO public.manga_volume_authors VALUES (179, 98);
INSERT INTO public.manga_volume_authors VALUES (180, 98);
INSERT INTO public.manga_volume_authors VALUES (181, 98);
INSERT INTO public.manga_volume_authors VALUES (182, 98);
INSERT INTO public.manga_volume_authors VALUES (183, 98);
INSERT INTO public.manga_volume_authors VALUES (184, 98);
INSERT INTO public.manga_volume_authors VALUES (185, 98);
INSERT INTO public.manga_volume_authors VALUES (186, 98);
INSERT INTO public.manga_volume_authors VALUES (187, 98);
INSERT INTO public.manga_volume_authors VALUES (188, 98);
INSERT INTO public.manga_volume_authors VALUES (189, 98);
INSERT INTO public.manga_volume_authors VALUES (190, 98);
INSERT INTO public.manga_volume_authors VALUES (193, 102);
INSERT INTO public.manga_volume_authors VALUES (194, 102);
INSERT INTO public.manga_volume_authors VALUES (195, 102);
INSERT INTO public.manga_volume_authors VALUES (196, 102);
INSERT INTO public.manga_volume_authors VALUES (197, 102);
INSERT INTO public.manga_volume_authors VALUES (198, 102);
INSERT INTO public.manga_volume_authors VALUES (199, 102);
INSERT INTO public.manga_volume_authors VALUES (201, 42);
INSERT INTO public.manga_volume_authors VALUES (202, 161);
INSERT INTO public.manga_volume_authors VALUES (202, 153);
INSERT INTO public.manga_volume_authors VALUES (203, 161);
INSERT INTO public.manga_volume_authors VALUES (203, 153);
INSERT INTO public.manga_volume_authors VALUES (204, 161);
INSERT INTO public.manga_volume_authors VALUES (204, 153);
INSERT INTO public.manga_volume_authors VALUES (205, 161);
INSERT INTO public.manga_volume_authors VALUES (205, 153);
INSERT INTO public.manga_volume_authors VALUES (206, 161);
INSERT INTO public.manga_volume_authors VALUES (206, 153);
INSERT INTO public.manga_volume_authors VALUES (207, 161);
INSERT INTO public.manga_volume_authors VALUES (207, 153);
INSERT INTO public.manga_volume_authors VALUES (208, 161);
INSERT INTO public.manga_volume_authors VALUES (208, 153);
INSERT INTO public.manga_volume_authors VALUES (209, 161);
INSERT INTO public.manga_volume_authors VALUES (209, 153);
INSERT INTO public.manga_volume_authors VALUES (210, 161);
INSERT INTO public.manga_volume_authors VALUES (210, 153);
INSERT INTO public.manga_volume_authors VALUES (211, 161);
INSERT INTO public.manga_volume_authors VALUES (211, 153);
INSERT INTO public.manga_volume_authors VALUES (212, 161);
INSERT INTO public.manga_volume_authors VALUES (212, 153);
INSERT INTO public.manga_volume_authors VALUES (213, 161);
INSERT INTO public.manga_volume_authors VALUES (213, 153);
INSERT INTO public.manga_volume_authors VALUES (214, 161);
INSERT INTO public.manga_volume_authors VALUES (214, 153);
INSERT INTO public.manga_volume_authors VALUES (215, 161);
INSERT INTO public.manga_volume_authors VALUES (215, 153);
INSERT INTO public.manga_volume_authors VALUES (216, 161);
INSERT INTO public.manga_volume_authors VALUES (216, 153);
INSERT INTO public.manga_volume_authors VALUES (217, 161);
INSERT INTO public.manga_volume_authors VALUES (217, 153);
INSERT INTO public.manga_volume_authors VALUES (218, 161);
INSERT INTO public.manga_volume_authors VALUES (218, 153);
INSERT INTO public.manga_volume_authors VALUES (219, 161);
INSERT INTO public.manga_volume_authors VALUES (219, 153);
INSERT INTO public.manga_volume_authors VALUES (220, 161);
INSERT INTO public.manga_volume_authors VALUES (220, 153);
INSERT INTO public.manga_volume_authors VALUES (221, 161);
INSERT INTO public.manga_volume_authors VALUES (221, 153);
INSERT INTO public.manga_volume_authors VALUES (222, 52);
INSERT INTO public.manga_volume_authors VALUES (223, 52);
INSERT INTO public.manga_volume_authors VALUES (224, 52);
INSERT INTO public.manga_volume_authors VALUES (225, 52);
INSERT INTO public.manga_volume_authors VALUES (226, 52);
INSERT INTO public.manga_volume_authors VALUES (227, 52);
INSERT INTO public.manga_volume_authors VALUES (228, 52);
INSERT INTO public.manga_volume_authors VALUES (229, 52);
INSERT INTO public.manga_volume_authors VALUES (230, 52);
INSERT INTO public.manga_volume_authors VALUES (231, 52);
INSERT INTO public.manga_volume_authors VALUES (232, 52);
INSERT INTO public.manga_volume_authors VALUES (233, 52);
INSERT INTO public.manga_volume_authors VALUES (234, 52);
INSERT INTO public.manga_volume_authors VALUES (235, 52);
INSERT INTO public.manga_volume_authors VALUES (236, 52);
INSERT INTO public.manga_volume_authors VALUES (237, 52);
INSERT INTO public.manga_volume_authors VALUES (238, 52);
INSERT INTO public.manga_volume_authors VALUES (239, 52);
INSERT INTO public.manga_volume_authors VALUES (240, 52);
INSERT INTO public.manga_volume_authors VALUES (241, 52);
INSERT INTO public.manga_volume_authors VALUES (242, 52);
INSERT INTO public.manga_volume_authors VALUES (243, 52);
INSERT INTO public.manga_volume_authors VALUES (244, 52);
INSERT INTO public.manga_volume_authors VALUES (245, 52);
INSERT INTO public.manga_volume_authors VALUES (246, 52);
INSERT INTO public.manga_volume_authors VALUES (247, 98);
INSERT INTO public.manga_volume_authors VALUES (248, 98);
INSERT INTO public.manga_volume_authors VALUES (249, 98);
INSERT INTO public.manga_volume_authors VALUES (250, 98);
INSERT INTO public.manga_volume_authors VALUES (251, 98);
INSERT INTO public.manga_volume_authors VALUES (252, 98);
INSERT INTO public.manga_volume_authors VALUES (253, 98);
INSERT INTO public.manga_volume_authors VALUES (254, 98);
INSERT INTO public.manga_volume_authors VALUES (255, 98);
INSERT INTO public.manga_volume_authors VALUES (256, 98);
INSERT INTO public.manga_volume_authors VALUES (257, 98);
INSERT INTO public.manga_volume_authors VALUES (258, 98);
INSERT INTO public.manga_volume_authors VALUES (259, 98);
INSERT INTO public.manga_volume_authors VALUES (260, 98);
INSERT INTO public.manga_volume_authors VALUES (261, 98);
INSERT INTO public.manga_volume_authors VALUES (262, 98);
INSERT INTO public.manga_volume_authors VALUES (263, 98);
INSERT INTO public.manga_volume_authors VALUES (264, 98);
INSERT INTO public.manga_volume_authors VALUES (265, 98);
INSERT INTO public.manga_volume_authors VALUES (266, 98);
INSERT INTO public.manga_volume_authors VALUES (267, 98);
INSERT INTO public.manga_volume_authors VALUES (268, 98);
INSERT INTO public.manga_volume_authors VALUES (269, 98);
INSERT INTO public.manga_volume_authors VALUES (270, 98);
INSERT INTO public.manga_volume_authors VALUES (271, 142);
INSERT INTO public.manga_volume_authors VALUES (272, 142);
INSERT INTO public.manga_volume_authors VALUES (273, 142);
INSERT INTO public.manga_volume_authors VALUES (274, 142);
INSERT INTO public.manga_volume_authors VALUES (275, 142);
INSERT INTO public.manga_volume_authors VALUES (276, 142);
INSERT INTO public.manga_volume_authors VALUES (277, 142);
INSERT INTO public.manga_volume_authors VALUES (278, 142);
INSERT INTO public.manga_volume_authors VALUES (279, 142);
INSERT INTO public.manga_volume_authors VALUES (280, 142);
INSERT INTO public.manga_volume_authors VALUES (281, 142);
INSERT INTO public.manga_volume_authors VALUES (282, 142);
INSERT INTO public.manga_volume_authors VALUES (283, 142);
INSERT INTO public.manga_volume_authors VALUES (284, 142);
INSERT INTO public.manga_volume_authors VALUES (285, 142);
INSERT INTO public.manga_volume_authors VALUES (286, 123);
INSERT INTO public.manga_volume_authors VALUES (287, 123);
INSERT INTO public.manga_volume_authors VALUES (288, 123);
INSERT INTO public.manga_volume_authors VALUES (289, 123);
INSERT INTO public.manga_volume_authors VALUES (290, 123);
INSERT INTO public.manga_volume_authors VALUES (291, 123);
INSERT INTO public.manga_volume_authors VALUES (292, 123);
INSERT INTO public.manga_volume_authors VALUES (293, 123);
INSERT INTO public.manga_volume_authors VALUES (294, 123);
INSERT INTO public.manga_volume_authors VALUES (295, 123);
INSERT INTO public.manga_volume_authors VALUES (296, 123);
INSERT INTO public.manga_volume_authors VALUES (297, 123);
INSERT INTO public.manga_volume_authors VALUES (300, 110);
INSERT INTO public.manga_volume_authors VALUES (301, 110);
INSERT INTO public.manga_volume_authors VALUES (302, 110);
INSERT INTO public.manga_volume_authors VALUES (303, 110);
INSERT INTO public.manga_volume_authors VALUES (304, 110);
INSERT INTO public.manga_volume_authors VALUES (306, 168);
INSERT INTO public.manga_volume_authors VALUES (307, 168);
INSERT INTO public.manga_volume_authors VALUES (308, 168);
INSERT INTO public.manga_volume_authors VALUES (309, 168);
INSERT INTO public.manga_volume_authors VALUES (310, 168);
INSERT INTO public.manga_volume_authors VALUES (311, 168);
INSERT INTO public.manga_volume_authors VALUES (312, 168);
INSERT INTO public.manga_volume_authors VALUES (313, 168);
INSERT INTO public.manga_volume_authors VALUES (314, 168);
INSERT INTO public.manga_volume_authors VALUES (317, 50);
INSERT INTO public.manga_volume_authors VALUES (318, 50);
INSERT INTO public.manga_volume_authors VALUES (319, 50);
INSERT INTO public.manga_volume_authors VALUES (320, 163);
INSERT INTO public.manga_volume_authors VALUES (321, 163);
INSERT INTO public.manga_volume_authors VALUES (324, 40);
INSERT INTO public.manga_volume_authors VALUES (325, 40);
INSERT INTO public.manga_volume_authors VALUES (326, 40);
INSERT INTO public.manga_volume_authors VALUES (327, 40);
INSERT INTO public.manga_volume_authors VALUES (328, 40);
INSERT INTO public.manga_volume_authors VALUES (329, 40);
INSERT INTO public.manga_volume_authors VALUES (330, 40);
INSERT INTO public.manga_volume_authors VALUES (331, 40);
INSERT INTO public.manga_volume_authors VALUES (332, 40);
INSERT INTO public.manga_volume_authors VALUES (333, 40);
INSERT INTO public.manga_volume_authors VALUES (334, 40);
INSERT INTO public.manga_volume_authors VALUES (335, 40);
INSERT INTO public.manga_volume_authors VALUES (336, 40);
INSERT INTO public.manga_volume_authors VALUES (337, 40);
INSERT INTO public.manga_volume_authors VALUES (338, 40);
INSERT INTO public.manga_volume_authors VALUES (339, 40);
INSERT INTO public.manga_volume_authors VALUES (340, 40);
INSERT INTO public.manga_volume_authors VALUES (341, 40);
INSERT INTO public.manga_volume_authors VALUES (342, 40);
INSERT INTO public.manga_volume_authors VALUES (343, 40);
INSERT INTO public.manga_volume_authors VALUES (344, 40);
INSERT INTO public.manga_volume_authors VALUES (345, 40);
INSERT INTO public.manga_volume_authors VALUES (346, 40);
INSERT INTO public.manga_volume_authors VALUES (347, 40);
INSERT INTO public.manga_volume_authors VALUES (348, 40);
INSERT INTO public.manga_volume_authors VALUES (349, 40);
INSERT INTO public.manga_volume_authors VALUES (350, 40);
INSERT INTO public.manga_volume_authors VALUES (351, 40);
INSERT INTO public.manga_volume_authors VALUES (352, 84);
INSERT INTO public.manga_volume_authors VALUES (353, 84);
INSERT INTO public.manga_volume_authors VALUES (354, 84);
INSERT INTO public.manga_volume_authors VALUES (355, 84);
INSERT INTO public.manga_volume_authors VALUES (356, 84);
INSERT INTO public.manga_volume_authors VALUES (357, 84);
INSERT INTO public.manga_volume_authors VALUES (358, 84);
INSERT INTO public.manga_volume_authors VALUES (359, 84);
INSERT INTO public.manga_volume_authors VALUES (360, 84);
INSERT INTO public.manga_volume_authors VALUES (361, 84);
INSERT INTO public.manga_volume_authors VALUES (362, 84);
INSERT INTO public.manga_volume_authors VALUES (363, 84);
INSERT INTO public.manga_volume_authors VALUES (364, 84);
INSERT INTO public.manga_volume_authors VALUES (365, 84);
INSERT INTO public.manga_volume_authors VALUES (366, 84);
INSERT INTO public.manga_volume_authors VALUES (367, 84);
INSERT INTO public.manga_volume_authors VALUES (368, 84);
INSERT INTO public.manga_volume_authors VALUES (369, 84);
INSERT INTO public.manga_volume_authors VALUES (370, 84);
INSERT INTO public.manga_volume_authors VALUES (371, 84);
INSERT INTO public.manga_volume_authors VALUES (372, 84);
INSERT INTO public.manga_volume_authors VALUES (373, 84);
INSERT INTO public.manga_volume_authors VALUES (374, 84);
INSERT INTO public.manga_volume_authors VALUES (375, 84);
INSERT INTO public.manga_volume_authors VALUES (376, 84);
INSERT INTO public.manga_volume_authors VALUES (377, 84);
INSERT INTO public.manga_volume_authors VALUES (378, 84);
INSERT INTO public.manga_volume_authors VALUES (379, 101);
INSERT INTO public.manga_volume_authors VALUES (380, 101);
INSERT INTO public.manga_volume_authors VALUES (381, 101);
INSERT INTO public.manga_volume_authors VALUES (384, 100);
INSERT INTO public.manga_volume_authors VALUES (384, 141);
INSERT INTO public.manga_volume_authors VALUES (385, 100);
INSERT INTO public.manga_volume_authors VALUES (385, 141);
INSERT INTO public.manga_volume_authors VALUES (386, 100);
INSERT INTO public.manga_volume_authors VALUES (386, 141);
INSERT INTO public.manga_volume_authors VALUES (387, 100);
INSERT INTO public.manga_volume_authors VALUES (387, 141);
INSERT INTO public.manga_volume_authors VALUES (388, 100);
INSERT INTO public.manga_volume_authors VALUES (388, 141);
INSERT INTO public.manga_volume_authors VALUES (389, 100);
INSERT INTO public.manga_volume_authors VALUES (389, 141);
INSERT INTO public.manga_volume_authors VALUES (390, 100);
INSERT INTO public.manga_volume_authors VALUES (390, 141);
INSERT INTO public.manga_volume_authors VALUES (391, 100);
INSERT INTO public.manga_volume_authors VALUES (391, 141);
INSERT INTO public.manga_volume_authors VALUES (392, 100);
INSERT INTO public.manga_volume_authors VALUES (392, 141);
INSERT INTO public.manga_volume_authors VALUES (393, 100);
INSERT INTO public.manga_volume_authors VALUES (393, 141);
INSERT INTO public.manga_volume_authors VALUES (394, 100);
INSERT INTO public.manga_volume_authors VALUES (394, 141);
INSERT INTO public.manga_volume_authors VALUES (395, 100);
INSERT INTO public.manga_volume_authors VALUES (395, 141);
INSERT INTO public.manga_volume_authors VALUES (396, 100);
INSERT INTO public.manga_volume_authors VALUES (396, 141);
INSERT INTO public.manga_volume_authors VALUES (397, 100);
INSERT INTO public.manga_volume_authors VALUES (397, 141);
INSERT INTO public.manga_volume_authors VALUES (398, 100);
INSERT INTO public.manga_volume_authors VALUES (398, 141);
INSERT INTO public.manga_volume_authors VALUES (399, 100);
INSERT INTO public.manga_volume_authors VALUES (399, 141);
INSERT INTO public.manga_volume_authors VALUES (400, 100);
INSERT INTO public.manga_volume_authors VALUES (400, 141);
INSERT INTO public.manga_volume_authors VALUES (401, 100);
INSERT INTO public.manga_volume_authors VALUES (401, 141);
INSERT INTO public.manga_volume_authors VALUES (402, 100);
INSERT INTO public.manga_volume_authors VALUES (402, 141);
INSERT INTO public.manga_volume_authors VALUES (403, 100);
INSERT INTO public.manga_volume_authors VALUES (403, 141);
INSERT INTO public.manga_volume_authors VALUES (404, 100);
INSERT INTO public.manga_volume_authors VALUES (404, 141);
INSERT INTO public.manga_volume_authors VALUES (405, 100);
INSERT INTO public.manga_volume_authors VALUES (405, 141);
INSERT INTO public.manga_volume_authors VALUES (406, 100);
INSERT INTO public.manga_volume_authors VALUES (406, 141);
INSERT INTO public.manga_volume_authors VALUES (406, 129);
INSERT INTO public.manga_volume_authors VALUES (408, 161);
INSERT INTO public.manga_volume_authors VALUES (408, 153);
INSERT INTO public.manga_volume_authors VALUES (409, 161);
INSERT INTO public.manga_volume_authors VALUES (409, 153);
INSERT INTO public.manga_volume_authors VALUES (410, 161);
INSERT INTO public.manga_volume_authors VALUES (410, 153);
INSERT INTO public.manga_volume_authors VALUES (411, 161);
INSERT INTO public.manga_volume_authors VALUES (411, 153);
INSERT INTO public.manga_volume_authors VALUES (412, 161);
INSERT INTO public.manga_volume_authors VALUES (412, 153);
INSERT INTO public.manga_volume_authors VALUES (413, 161);
INSERT INTO public.manga_volume_authors VALUES (413, 153);
INSERT INTO public.manga_volume_authors VALUES (414, 150);
INSERT INTO public.manga_volume_authors VALUES (414, 112);
INSERT INTO public.manga_volume_authors VALUES (414, 93);
INSERT INTO public.manga_volume_authors VALUES (415, 150);
INSERT INTO public.manga_volume_authors VALUES (415, 112);
INSERT INTO public.manga_volume_authors VALUES (415, 93);
INSERT INTO public.manga_volume_authors VALUES (416, 150);
INSERT INTO public.manga_volume_authors VALUES (416, 112);
INSERT INTO public.manga_volume_authors VALUES (416, 93);
INSERT INTO public.manga_volume_authors VALUES (417, 101);
INSERT INTO public.manga_volume_authors VALUES (417, 83);
INSERT INTO public.manga_volume_authors VALUES (418, 101);
INSERT INTO public.manga_volume_authors VALUES (418, 83);
INSERT INTO public.manga_volume_authors VALUES (419, 101);
INSERT INTO public.manga_volume_authors VALUES (419, 83);
INSERT INTO public.manga_volume_authors VALUES (420, 101);
INSERT INTO public.manga_volume_authors VALUES (420, 83);
INSERT INTO public.manga_volume_authors VALUES (421, 101);
INSERT INTO public.manga_volume_authors VALUES (421, 83);
INSERT INTO public.manga_volume_authors VALUES (315, 50);
INSERT INTO public.manga_volume_authors VALUES (316, 50);
INSERT INTO public.manga_volume_authors VALUES (422, 100);
INSERT INTO public.manga_volume_authors VALUES (422, 141);
INSERT INTO public.manga_volume_authors VALUES (382, 101);
INSERT INTO public.manga_volume_authors VALUES (305, 110);
INSERT INTO public.manga_volume_authors VALUES (322, 53);
INSERT INTO public.manga_volume_authors VALUES (298, 76);
INSERT INTO public.manga_volume_authors VALUES (299, 76);
INSERT INTO public.manga_volume_authors VALUES (178, 89);
INSERT INTO public.manga_volume_authors VALUES (407, 100);
INSERT INTO public.manga_volume_authors VALUES (407, 141);
INSERT INTO public.manga_volume_authors VALUES (383, 101);
INSERT INTO public.manga_volume_authors VALUES (192, 102);
INSERT INTO public.manga_volume_authors VALUES (191, 102);
INSERT INTO public.manga_volume_authors VALUES (200, 122);
INSERT INTO public.manga_volume_authors VALUES (323, 131);


--
-- TOC entry 4135 (class 0 OID 17692)
-- Dependencies: 379
-- Data for Name: manga_volumes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (194, 'Un Extraño en Primavera', 37, 1, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Un_extrano_en_primavera_1.png?v=1499863502&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (409, 'Death Note: Black Edition', 12, 2, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/05/thumb_4081_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (411, 'Death Note: Black Edition', 12, 4, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/05/thumb_4146_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (413, 'Death Note: Black Edition', 12, 6, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/05/thumb_4184_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (408, 'Death Note: Black Edition', 12, 1, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/05/thumb_4033_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (410, 'Death Note: Black Edition', 12, 3, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/05/thumb_4096_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (412, 'Death Note: Black Edition', 12, 5, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/05/thumb_4153_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (421, 'Kitchen of Witch Hat', 21, 5, 'not_started', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/Kitchen_of_Witch_Hat_05.jpg?v=1720450957&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (251, 'Pandora Hearts', 26, 5, 'not_started', NULL, 'https://m.media-amazon.com/images/I/71dCvTZQZhL._SL1217_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (253, 'Pandora Hearts', 26, 7, 'not_started', NULL, 'https://m.media-amazon.com/images/I/71btkE-0XNL._SL1158_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (219, 'Bakuman', 6, 18, 'finished', NULL, 'https://m.media-amazon.com/images/I/510MY1X5mIL.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (254, 'Pandora Hearts', 26, 8, 'not_started', NULL, 'https://m.media-amazon.com/images/I/61t2VtvG3GL._SL1200_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (257, 'Pandora Hearts', 26, 11, 'not_started', NULL, 'https://m.media-amazon.com/images/I/71fvy1Ud5nL._SL1171_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (259, 'Pandora Hearts', 26, 13, 'not_started', NULL, 'https://m.media-amazon.com/images/I/71uQ0Y4dquL._SL1203_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (260, 'Pandora Hearts', 26, 14, 'not_started', NULL, 'https://m.media-amazon.com/images/I/71LukCxIibL._SL1084_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (262, 'Pandora Hearts', 26, 16, 'not_started', NULL, 'https://m.media-amazon.com/images/I/71ps9q1ez3L._SL1079_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (264, 'Pandora Hearts', 26, 18, 'not_started', NULL, 'https://m.media-amazon.com/images/I/51gmoasdSQL.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (265, 'Pandora Hearts', 26, 19, 'not_started', NULL, 'https://m.media-amazon.com/images/I/51ver92r7WL.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (267, 'Pandora Hearts', 26, 21, 'not_started', NULL, 'https://m.media-amazon.com/images/I/51KkxII683L.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (268, 'Pandora Hearts', 26, 22, 'not_started', NULL, 'https://m.media-amazon.com/images/I/51qM3qg4+bL.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (270, 'Pandora Hearts', 26, 24, 'not_started', NULL, 'https://m.media-amazon.com/images/I/81Wtohtjg2L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (255, 'Pandora Hearts', 26, 9, 'not_started', NULL, 'https://m.media-amazon.com/images/I/81iF9nY+isL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 59, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (252, 'Pandora Hearts', 26, 6, 'not_started', NULL, 'https://m.media-amazon.com/images/I/71AJ5ThmSwL._SL1210_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (256, 'Pandora Hearts', 26, 10, 'not_started', NULL, 'https://m.media-amazon.com/images/I/61J0e8KlPjL._SL1283_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (258, 'Pandora Hearts', 26, 12, 'not_started', NULL, 'https://m.media-amazon.com/images/I/7110bZ2dAPL._SL1283_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (261, 'Pandora Hearts', 26, 15, 'not_started', NULL, 'https://m.media-amazon.com/images/I/71YqsRkqzCL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (263, 'Pandora Hearts', 26, 17, 'not_started', NULL, 'https://m.media-amazon.com/images/I/61whxoDc+JL._SL1000_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (266, 'Pandora Hearts', 26, 20, 'not_started', NULL, 'https://m.media-amazon.com/images/I/51thI3j6BQL.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (269, 'Pandora Hearts', 26, 23, 'not_started', NULL, 'https://m.media-amazon.com/images/I/61owzwSuyqL._SL1000_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (250, 'Pandora Hearts', 26, 4, 'not_started', NULL, 'https://static.wikia.nocookie.net/pandorahearts/images/7/77/Pandorah4prev.jpg/revision/latest?cb=20140426042910', NULL, NULL, NULL, NULL, 'EN', 59, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (247, 'Pandora Hearts', 26, 1, 'finished', NULL, 'https://m.media-amazon.com/images/I/71hLHc1aNZL._SL1121_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (248, 'Pandora Hearts', 26, 2, 'reading', NULL, 'https://m.media-amazon.com/images/I/61hs6Mw+luL._SL1113_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (382, 'Atelier of Witch Hat: Ed. Grimorio', 4, 4, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/Atelier_of_Witch_Hat_Ed_Grimorio_04_4a10204c-32ef-4446-8dc3-c3cd6f250793.jpg', '2026-08-27', NULL, '2026-09-14', NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (271, 'Wind Breaker', 38, 1, 'finished', NULL, 'https://www.penguinlibros.com/es/7272244-thickbox_default/wind-breaker-1-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (224, 'Soul Eater', 35, 3, 'finished', NULL, 'https://m.media-amazon.com/images/I/71UhKcsjOFL._SL1175_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (226, 'Soul Eater', 35, 5, 'finished', NULL, 'https://comicstores.es/imagenes_grandes/9788467/978846790420.webp', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (188, 'Los Apuntes de Vánitas', 23, 10, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/25/thumb_24662_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (189, 'Los Apuntes de Vánitas', 23, 11, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/42/thumb_41488_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (178, 'SOLANIN integral', 29, NULL, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6059_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (200, 'You Are in the Blue Summer', 39, NULL, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/You_are_in_the_blue_summer.png?v=1539754396&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (196, 'Un Extraño en Primavera', 37, 3, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Un_extrano_en_primavera_3.png?v=1521198705&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (198, 'Un Extraño en Primavera', 37, 5, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/Un_extrano_en_primavera_5.jpg?v=1700671757&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (202, 'Bakuman', 6, 1, 'finished', NULL, 'https://m.media-amazon.com/images/I/71UQ58Wly6L._SL1224_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (204, 'Bakuman', 6, 3, 'finished', NULL, 'https://m.media-amazon.com/images/I/71yDPHtwVdL._SL1198_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (205, 'Bakuman', 6, 4, 'finished', NULL, 'https://m.media-amazon.com/images/I/719NkvYAtLL._SL1189_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (207, 'Bakuman', 6, 6, 'finished', NULL, 'https://m.media-amazon.com/images/I/71zIYcUFTsL._SL1004_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (209, 'Bakuman', 6, 8, 'finished', NULL, 'https://m.media-amazon.com/images/I/71Xmn73VtiL._SL1010_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (211, 'Bakuman', 6, 10, 'finished', NULL, 'https://m.media-amazon.com/images/I/71NIOgU-1WL._SL1138_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (213, 'Bakuman', 6, 12, 'finished', NULL, 'https://m.media-amazon.com/images/I/71Ra4l5x9tL._SL1159_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (214, 'Bakuman', 6, 13, 'finished', NULL, 'https://m.media-amazon.com/images/I/71EB37HkohL._SL1196_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (216, 'Bakuman', 6, 15, 'finished', NULL, 'https://m.media-amazon.com/images/I/71Oz3uepqOL._SL1192_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (218, 'Bakuman', 6, 17, 'finished', NULL, 'https://m.media-amazon.com/images/I/7105kvBHcWL._SL1194_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (221, 'Bakuman', 6, 20, 'finished', NULL, 'https://m.media-amazon.com/images/I/71-FqpXRZ-L._SL1080_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (175, 'IDOLISH7', 18, 1, 'finished', NULL, 'https://m.media-amazon.com/images/I/81YxDuPO6RL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 18, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (177, 'IDOLISH7 - TRIGGER', 19, 1, 'finished', NULL, 'https://m.media-amazon.com/images/I/81rdTdWTOpL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 18, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (173, 'IDOLiSH7 - Re:member', 20, 2, 'finished', NULL, 'https://m.media-amazon.com/images/I/91I5zfj+gcL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'JP', 25, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (174, 'IDOLiSH7 - Re:member', 20, 3, 'finished', NULL, 'https://m.media-amazon.com/images/I/71g0KgNxypL._SL1257_.jpg', NULL, NULL, NULL, NULL, 'JP', 25, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (180, 'Los Apuntes de Vánitas', 23, 2, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6530_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (182, 'Los Apuntes de Vánitas', 23, 4, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/16/thumb_15364_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (184, 'Los Apuntes de Vánitas', 23, 6, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/18/thumb_17037_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (186, 'Los Apuntes de Vánitas', 23, 8, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/20/thumb_19809_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (163, 'No. 6', 24, 1, 'finished', NULL, 'https://www.editorialivrea.com/ESP/wp-content/uploads/photo-gallery/n6/n6-1.jpg', NULL, NULL, NULL, NULL, 'ES', 28, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (165, 'No. 6', 24, 3, 'finished', NULL, 'https://www.editorialivrea.com/ESP/wp-content/uploads/photo-gallery/n6/n6-3.jpg', NULL, NULL, NULL, NULL, 'ES', 28, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (167, 'No. 6', 24, 5, 'finished', NULL, 'https://www.editorialivrea.com/ESP/wp-content/uploads/photo-gallery/n6/n6-5.jpg', NULL, NULL, NULL, NULL, 'ES', 28, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (169, 'No. 6', 24, 7, 'finished', NULL, 'https://www.editorialivrea.com/ESP/wp-content/uploads/photo-gallery/n6/n6-7.jpg', NULL, NULL, NULL, NULL, 'ES', 28, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (171, 'No. 6', 24, 9, 'finished', NULL, 'https://www.editorialivrea.com/ESP/wp-content/uploads/photo-gallery/n6/n6-9.jpg', NULL, NULL, NULL, NULL, 'ES', 28, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (222, 'Soul Eater', 35, 1, 'finished', NULL, 'https://m.media-amazon.com/images/I/71-L7VUuyGL._SL1010_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (244, 'Soul Eater', 35, 23, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/8/8b/Soul_Eater_Volume_23_Cover.png/revision/latest/scale-to-width-down/250?cb=20180513040145', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (228, 'Soul Eater', 35, 7, 'finished', NULL, 'https://m.media-amazon.com/images/I/81utuhyvwxL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (229, 'Soul Eater', 35, 8, 'finished', NULL, 'https://comicstores.es/imagenes_grandes/9788467/978846790590.webp', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (231, 'Soul Eater', 35, 10, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/f/f5/Volume_10_cover_.jpg/revision/latest?cb=20150905225013', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (234, 'Soul Eater', 35, 13, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/a/af/Soul_Eater_Vol_13.png/revision/latest?cb=20151122142619', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (236, 'Soul Eater', 35, 15, 'finished', NULL, 'https://static.wikia.nocookie.net/central/images/2/22/Soul-eater-vol-15-2.jpg/revision/latest?cb=20250726012225&format=original', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (239, 'Soul Eater', 35, 18, 'finished', NULL, 'https://static.wikia.nocookie.net/central/images/d/d0/71GqqstcSqL._SY466_.jpg/revision/latest?cb=20250727152705', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (240, 'Soul Eater', 35, 19, 'finished', NULL, 'https://m.media-amazon.com/images/I/81lwNI0xRaL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (273, 'Wind Breaker', 38, 3, 'finished', NULL, 'https://www.penguinlibros.com/es/2497358-thickbox_default/wind-breaker-3-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (275, 'Wind Breaker', 38, 5, 'finished', NULL, 'https://www.penguinlibros.com/es/2815741-thickbox_default/wind-breaker-5-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (277, 'Wind Breaker', 38, 7, 'finished', NULL, 'https://www.penguinlibros.com/es/3667560-thickbox_default/wind-breaker-7-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (279, 'Wind Breaker', 38, 9, 'finished', NULL, 'https://www.penguinlibros.com/es/5738387-thickbox_default/wind-breaker-9-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (315, 'Antiguos Alumnos 1', 15, 4, 'finished', NULL, 'https://m.media-amazon.com/images/I/61ygIp6XBAL._SL1075_.jpg', NULL, NULL, NULL, NULL, 'ES', 51, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (318, 'En la Misma Clase', 15, 2, 'finished', NULL, 'https://m.media-amazon.com/images/I/61oU1ESBJ9L._SL1022_.jpg', NULL, NULL, NULL, NULL, 'ES', 51, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (286, 'Given', 17, 1, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Given_1_C.png?v=1570628335&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (288, 'Given', 17, 3, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Given_3.png?v=1570631420&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (290, 'Given', 17, 5, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Given_5.png?v=1585650940&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (292, 'Given', 17, 7, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Given_7.jpg?v=1654700860&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (294, 'Given', 17, 9, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/Given_09.jpg?v=1700671030&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (296, 'Given', 17, NULL, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Links.png?v=1604563934&width=832', NULL, NULL, NULL, 'Links', 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (307, 'Puedo Oír el Sol', 27, 2, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/puedo_oir_el_sol_2.png?v=1481284482&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (309, 'Puedo Oír el Sol', 27, 4, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/puedo_oir_el_sol_4.png?v=1574431474&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (300, 'Link Click', 22, 1, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/31/thumb_30431_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (302, 'Link Click', 22, 3, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/35/thumb_34594_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (304, 'Link Click', 22, 5, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/44/thumb_43625_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (311, 'Puedo Oír el Sol', 27, 6, 'not_started', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/puedo_oir_el_sol_6.jpg?v=1660199184&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (313, 'Puedo Oír el Sol', 27, 8, 'not_started', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/puedo_oir_el_sol_08.jpg?v=1731148126&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (280, 'Wind Breaker', 38, 10, 'not_started', NULL, 'https://www.penguinlibros.com/es/4876252-thickbox_default/wind-breaker-10-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (282, 'Wind Breaker', 38, 12, 'not_started', NULL, 'https://www.penguinlibros.com/es/6679033-thickbox_default/wind-breaker-12-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (284, 'Wind Breaker', 38, 14, 'not_started', NULL, 'https://www.penguinlibros.com/es/7266993-thickbox_default/wind-breaker-14-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (299, 'El Dios y el Mensajero Incapaz de Volar', 14, NULL, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/El_dios_y_el_mensajero_incapaz_de_volar.jpg?v=1652451804&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (320, 'Seven Days', 31, 1, 'finished', NULL, 'https://static.wixstatic.com/media/dfd91a_69437884764c4aaab9eae633488c346f.png/v1/fill/w_442,h_630,al_c,lg_1,q_85,enc_avif,quality_auto/dfd91a_69437884764c4aaab9eae633488c346f.png', NULL, NULL, NULL, NULL, 'ES', 51, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (243, 'Soul Eater', 35, 22, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/5/57/Soul_Eater_Volume_22_-_Cover.png/revision/latest?cb=20150323223424', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (245, 'Soul Eater', 35, 24, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/9/9b/Soul_Eater_Volume_24.png/revision/latest/scale-to-width-down/250?cb=20180513040315', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (195, 'Un Extraño en Primavera', 37, 2, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Un_extrano_en_primavera_2.png?v=1505460420&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (324, 'Noragami', 25, 1, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/05/thumb_4871_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (325, 'Noragami', 25, 2, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/05/thumb_4920_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (327, 'Noragami', 25, 4, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5040_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (329, 'Noragami', 25, 6, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5166_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (331, 'Noragami', 25, 8, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5318_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (333, 'Noragami', 25, 10, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5429_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (335, 'Noragami', 25, 12, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5542_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (337, 'Noragami', 25, 14, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5729_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (339, 'Noragami', 25, 16, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5922_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (341, 'Noragami', 25, 18, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6177_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (343, 'Noragami', 25, 20, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6392_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (345, 'Noragami', 25, 22, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/20/thumb_19181_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (347, 'Noragami', 25, 24, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/23/thumb_22633_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (349, 'Noragami', 25, 26, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/29/thumb_28625_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (350, 'Noragami', 25, 27, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/37/thumb_36209_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (384, 'Bungo Stray Dogs', 9, 1, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5452_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (386, 'Bungo Stray Dogs', 9, 3, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5569_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (388, 'Bungo Stray Dogs', 9, 5, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5741_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (390, 'Bungo Stray Dogs', 9, 7, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5886_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (392, 'Bungo Stray Dogs', 9, 9, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6133_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (394, 'Bungo Stray Dogs', 9, 11, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6264_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (396, 'Bungo Stray Dogs', 9, 13, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6661_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (398, 'Bungo Stray Dogs', 9, 15, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/22/thumb_21902_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (399, 'Bungo Stray Dogs', 9, 16, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/25/thumb_24842_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (352, 'Fullmetal Alchemist', 16, 1, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/02/thumb_1796_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (354, 'Fullmetal Alchemist', 16, 3, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/02/thumb_1896_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (356, 'Fullmetal Alchemist', 16, 5, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2032_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (358, 'Fullmetal Alchemist', 16, 7, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2101_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (360, 'Fullmetal Alchemist', 16, 9, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2175_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (362, 'Fullmetal Alchemist', 16, 11, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2356_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (364, 'Fullmetal Alchemist', 16, 13, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2447_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (365, 'Fullmetal Alchemist', 16, 14, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2472_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (367, 'Fullmetal Alchemist', 16, 16, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2524_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (369, 'Fullmetal Alchemist', 16, 18, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2594_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (371, 'Fullmetal Alchemist', 16, 20, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2785_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (373, 'Fullmetal Alchemist', 16, 22, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2964_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (375, 'Fullmetal Alchemist', 16, 24, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/04/thumb_3183_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (377, 'Fullmetal Alchemist', 16, 26, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/04/thumb_3441_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (197, 'Un Extraño en Primavera', 37, 4, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Un_extrano_en_primavera_4.png?v=1623837082&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (316, 'Antiguos Alumnos 2', 15, 5, 'finished', NULL, 'https://m.media-amazon.com/images/I/61gGF5kCssL._SL1075_.jpg', NULL, NULL, NULL, NULL, 'ES', 51, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (381, 'Atelier of Witch Hat: Ed. Grimorio', 4, 3, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/Atelier_of_Witch_Hat_Ed_Grimorio_03.jpg', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (379, 'Atelier of Witch Hat: Ed. Grimorio', 4, 1, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/Atelier_of_Witch_Hat_Ed_Grimorio_01_31c01cc6-9139-4257-8f22-3c80dc8db4af.jpg', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (380, 'Atelier of Witch Hat: Ed. Grimorio', 4, 2, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/Atelier_of_Witch_Hat_Ed_Grimorio_02.jpg', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (203, 'Bakuman', 6, 2, 'finished', NULL, 'https://m.media-amazon.com/images/I/71DJFObMa6L._SL1215_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (206, 'Bakuman', 6, 5, 'finished', NULL, 'https://m.media-amazon.com/images/I/91ULprmwaVL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (208, 'Bakuman', 6, 7, 'finished', NULL, 'https://m.media-amazon.com/images/I/71xJmrlGaYL._SL1010_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (210, 'Bakuman', 6, 9, 'finished', NULL, 'https://m.media-amazon.com/images/I/71iOQkmlRiL._SL1128_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (212, 'Bakuman', 6, 11, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/04/thumb_3798_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (215, 'Bakuman', 6, 14, 'finished', NULL, 'https://m.media-amazon.com/images/I/518SfR7vxVL.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (217, 'Bakuman', 6, 16, 'finished', NULL, 'https://m.media-amazon.com/images/I/81Vu2Im8imL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (220, 'Bakuman', 6, 19, 'finished', NULL, 'https://m.media-amazon.com/images/I/81-oD-WdDJL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (326, 'Noragami', 25, 3, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/05/thumb_4969_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (328, 'Noragami', 25, 5, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5099_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (330, 'Noragami', 25, 7, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5231_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (332, 'Noragami', 25, 9, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5395_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (334, 'Noragami', 25, 11, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5491_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (336, 'Noragami', 25, 13, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5667_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (338, 'Noragami', 25, 15, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5836_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (340, 'Noragami', 25, 17, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6064_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (342, 'Noragami', 25, 19, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6258_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (344, 'Noragami', 25, 21, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6696_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (346, 'Noragami', 25, 23, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/22/thumb_21450_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (348, 'Noragami', 25, 25, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/26/thumb_25964_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (351, 'Noragami', 25, NULL, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5587_albumes_big.jpeg', NULL, NULL, NULL, 'Historias cortas', 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (201, 'Banana Fish', 7, 1, 'finished', NULL, 'https://www.panini.es/media/catalog/product/s/b/sbana001y_0.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:', NULL, NULL, NULL, NULL, 'ES', 37, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (385, 'Bungo Stray Dogs', 9, 2, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5500_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (418, 'Kitchen of Witch Hat', 21, 2, 'not_started', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Kitchen_of_Witch_Hat_2.png?v=1634136401&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (420, 'Kitchen of Witch Hat', 21, 4, 'not_started', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Kitchen_of_Witch_Hat_04.jpg?v=1668854445&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (401, 'Bungo Stray Dogs', 9, 18, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/32/thumb_31510_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (403, 'Bungo Stray Dogs', 9, 20, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/39/thumb_38386_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (405, 'Bungo Stray Dogs', 9, 22, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/44/thumb_43629_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (298, 'Algo entre Nosotros', 2, NULL, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/algo_entre_nosotros_hagi_koinimo_naranai.png', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (407, 'Bungo Stray Dogs: Raku-gaki Techo', 11, NULL, 'finished', NULL, 'https://static.wikia.nocookie.net/bungostraydogs/images/2/21/Rakugaki_Note.png/revision/latest?cb=20200305143242', NULL, NULL, NULL, NULL, 'JP', 29, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (192, 'Aunque no Pueda Hacer Magia', 5, NULL, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Aunque_no_pueda_hacer_magia.jpg', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (323, 'Boy Meets Maria', 8, NULL, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/boy_meets_maria.png?v=1600770432&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (415, 'Sherlock: El Banquero Ciego', 32, 2, 'finished', NULL, 'https://m.media-amazon.com/images/I/6198gxOq8IL._SL1050_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (416, 'Sherlock: El Gran Juego', 33, 3, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5391_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (387, 'Bungo Stray Dogs', 9, 4, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5662_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (389, 'Bungo Stray Dogs', 9, 6, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5806_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (391, 'Bungo Stray Dogs', 9, 8, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6036_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (393, 'Bungo Stray Dogs', 9, 10, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6221_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (395, 'Bungo Stray Dogs', 9, 12, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6489_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (397, 'Bungo Stray Dogs', 9, 14, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/17/thumb_16432_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (400, 'Bungo Stray Dogs', 9, 17, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/27/thumb_26914_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (406, 'Bungo Stray Dogs: Another Story', 10, 1, 'finished', NULL, 'https://m.media-amazon.com/images/I/81vDoCE7NOL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'EN', 59, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (317, 'En la Misma Clase', 15, 1, 'finished', NULL, 'https://m.media-amazon.com/images/I/71Z-bcpApyL._SL1101_.jpg', NULL, NULL, NULL, NULL, 'ES', 51, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (319, 'En la Misma Clase', 15, 3, 'finished', NULL, 'https://m.media-amazon.com/images/I/71nYlrrmmcL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 51, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (353, 'Fullmetal Alchemist', 16, 2, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/02/thumb_1863_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (355, 'Fullmetal Alchemist', 16, 4, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/02/thumb_1965_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (357, 'Fullmetal Alchemist', 16, 6, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2074_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (359, 'Fullmetal Alchemist', 16, 8, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2117_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (361, 'Fullmetal Alchemist', 16, 10, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2262_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (363, 'Fullmetal Alchemist', 16, 12, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2371_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (366, 'Fullmetal Alchemist', 16, 15, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2504_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (368, 'Fullmetal Alchemist', 16, 17, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2553_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (370, 'Fullmetal Alchemist', 16, 19, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2670_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (372, 'Fullmetal Alchemist', 16, 21, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/03/thumb_2884_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (374, 'Fullmetal Alchemist', 16, 23, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/04/thumb_3075_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (376, 'Fullmetal Alchemist', 16, 25, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/04/thumb_3279_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (378, 'Fullmetal Alchemist', 16, 27, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/04/thumb_3519_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (287, 'Given', 17, 2, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Given_2_v4.png?v=1570618364&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (289, 'Given', 17, 4, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Given_4.png?v=1576059203&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (291, 'Given', 17, 6, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Given_6.png?v=1610703773&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (293, 'Given', 17, 8, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Given_08.jpg?v=1681297288&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (297, 'Given', 17, NULL, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Given_Illustrations_3284ff04-af90-495f-8803-d3e50413d4b8.png?v=1626690639&width=832', NULL, NULL, NULL, 'Illustrations', 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (176, 'IDOLISH7', 18, 2, 'finished', NULL, 'https://m.media-amazon.com/images/I/91IL2KidU7L._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 18, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (172, 'IDOLiSH7 - Re:member', 20, 1, 'finished', NULL, 'https://64.media.tumblr.com/ff2e7f8e820bda85f0cff26c6894d10a/tumblr_inline_pt6ssmh4N81tgjjui_540.png', NULL, NULL, NULL, NULL, 'JP', 25, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (295, 'Given', 17, 10, 'not_started', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/Given_10th_Mix.jpg?v=1762782757&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (417, 'Kitchen of Witch Hat', 21, 1, 'not_started', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Kitchen_of_Witch_Hat_1.png?v=1626791146&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (419, 'Kitchen of Witch Hat', 21, 3, 'not_started', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Kitchen_of_Witch_Hat_3.jpg?v=1646813745&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (402, 'Bungo Stray Dogs', 9, 19, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/36/thumb_35049_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (404, 'Bungo Stray Dogs', 9, 21, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/41/thumb_40028_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (383, 'El Arte de Atelier of Witch Hat', 13, NULL, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/Atelier_of_Witch_Hat_el_arte_de.jpg?v=1762775641&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (179, 'Los Apuntes de Vánitas', 23, 1, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6431_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (181, 'Los Apuntes de Vánitas', 23, 3, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6601_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (183, 'Los Apuntes de Vánitas', 23, 5, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/17/thumb_16153_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (185, 'Los Apuntes de Vánitas', 23, 7, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/19/thumb_18679_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (187, 'Los Apuntes de Vánitas', 23, 9, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/21/thumb_20541_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (164, 'No. 6', 24, 2, 'finished', NULL, 'https://www.editorialivrea.com/ESP/wp-content/uploads/photo-gallery/n6/n6-2.jpg', NULL, NULL, NULL, NULL, 'ES', 28, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (166, 'No. 6', 24, 4, 'finished', NULL, 'https://www.editorialivrea.com/ESP/wp-content/uploads/photo-gallery/n6/n6-4.jpg', NULL, NULL, NULL, NULL, 'ES', 28, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (168, 'No. 6', 24, 6, 'finished', NULL, 'https://www.editorialivrea.com/ESP/wp-content/uploads/photo-gallery/n6/n6-6.jpg', NULL, NULL, NULL, NULL, 'ES', 28, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (170, 'No. 6', 24, 8, 'finished', NULL, 'https://www.editorialivrea.com/ESP/wp-content/uploads/photo-gallery/n6/n6-8.jpg', NULL, NULL, NULL, NULL, 'ES', 28, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (306, 'Puedo Oír el Sol', 27, 1, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/puedo_oir_el_sol_1.png?v=1476182494&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (308, 'Puedo Oír el Sol', 27, 3, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/puedo_oir_el_sol_3.png?v=1528811217&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (310, 'Puedo Oír el Sol', 27, 5, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/puedo_oir_el_sol_5.png?v=1625655392&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (321, 'Seven Days', 31, 2, 'finished', NULL, 'https://static.wixstatic.com/media/dfd91a_c763f89c4a0c41c9bfef984f420c3d3c.png/v1/fill/w_452,h_630,al_c,lg_1,q_85,enc_avif,quality_auto/dfd91a_c763f89c4a0c41c9bfef984f420c3d3c.png', NULL, NULL, NULL, NULL, 'ES', 51, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (414, 'Sherlock: Estudio en Rosa', 34, 1, 'finished', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/06/thumb_5391_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (223, 'Soul Eater', 35, 2, 'finished', NULL, 'https://m.media-amazon.com/images/I/71Aa91guiAL._SL1186_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (225, 'Soul Eater', 35, 4, 'finished', NULL, 'https://m.media-amazon.com/images/I/71pd0GBzouL._SL1189_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (227, 'Soul Eater', 35, 6, 'finished', NULL, 'https://m.media-amazon.com/images/I/71diBpLkEjL._SL1190_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (230, 'Soul Eater', 35, 9, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/9/99/Volume_09.jpg/revision/latest?cb=20130201201433', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (232, 'Soul Eater', 35, 11, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/d/da/Volume_11_cover.jpg/revision/latest?cb=20150920181424', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (233, 'Soul Eater', 35, 12, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/a/a9/Volume_12.jpg/revision/latest?cb=20130201201625', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (235, 'Soul Eater', 35, 14, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/3/32/Volume_14_English.png/revision/latest?cb=20151129193829', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (237, 'Soul Eater', 35, 16, 'finished', NULL, 'https://static.wikia.nocookie.net/central/images/8/88/71i5Y9F0RNL._UF1000%2C1000_QL80_.jpg/revision/latest/scale-to-width-down/400?cb=20250726013219', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (238, 'Soul Eater', 35, 17, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/c/cb/Soul_Eater_Volume_17.png/revision/latest/scale-to-width-down/300?cb=20160101141815', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (241, 'Soul Eater', 35, 20, 'finished', NULL, 'https://m.media-amazon.com/images/I/7136Kr7jSEL._SL1500_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (249, 'Pandora Hearts', 26, 3, 'not_started', NULL, 'https://m.media-amazon.com/images/I/71m+AOnsKQL._SL1119_.jpg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (301, 'Link Click', 22, 2, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/32/thumb_31494_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (303, 'Link Click', 22, 4, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/37/thumb_36915_albumes_big.jpeg', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (190, 'Los Apuntes de Vánitas', 23, 11, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/42/thumb_41500_albumes_big.jpeg', NULL, NULL, NULL, 'Special Edition', 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (312, 'Puedo Oír el Sol', 27, 7, 'not_started', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/puedo_oir_el_sol_07.jpg?v=1712732577&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (314, 'Puedo Oír el Sol', 27, 9, 'not_started', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/puedo_oir_el_sol_09.jpg?v=1770221490&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (305, 'Link Click', 22, 6, 'not_started', NULL, 'https://www.normaeditorial.com/upload/media/albumes/0001/45/thumb_44718_albumes_big.jpeg', '2026-08-07', NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (322, 'Senpai', 30, NULL, 'finished', NULL, 'https://static.wixstatic.com/media/dfd91a_d3f06ab50c884ecd8e4bd2572c4c8e04.png/v1/fill/w_447,h_630,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dfd91a_d3f06ab50c884ecd8e4bd2572c4c8e04.png', NULL, NULL, NULL, NULL, 'ES', 51, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (191, 'Qualia bajo la Nieve', 28, NULL, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Qualia_bajo_la_nieve.png?v=1507720150&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (242, 'Soul Eater', 35, 21, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/3/34/Soul_Eater_Volume_21_Cover.png/revision/latest/scale-to-width-down/250?cb=20221001115208', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (246, 'Soul Eater', 35, 25, 'finished', NULL, 'https://static.wikia.nocookie.net/souleater/images/e/ef/Volume_25.png/revision/latest/scale-to-width-down/250?cb=20131210223756', NULL, NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (272, 'Wind Breaker', 38, 2, 'finished', NULL, 'https://www.penguinlibros.com/es/2404390-thickbox_default/wind-breaker-2-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (274, 'Wind Breaker', 38, 4, 'finished', NULL, 'https://www.penguinlibros.com/es/2635651-thickbox_default/wind-breaker-4-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (276, 'Wind Breaker', 38, 6, 'finished', NULL, 'https://www.penguinlibros.com/es/2992490-thickbox_default/wind-breaker-6-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (278, 'Wind Breaker', 38, 8, 'finished', NULL, 'https://www.penguinlibros.com/es/3971286-thickbox_default/wind-breaker-8-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (193, 'Un Extraño a la Orilla del Mar', 36, 1, 'finished', NULL, 'https://www.milkywayediciones.com/cdn/shop/products/Un_extrano_a_la_orilla_del_mar.png?v=1493721277&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (422, 'Bungo Stray Dogs', 9, 23, 'not_started', '2026-09-07', 'https://imagessl6.casadellibro.com/a/l/s7/76/9788467977776.webp', '2026-09-07', NULL, NULL, NULL, 'ES', 36, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (199, 'Un Extraño en Primavera', 37, 6, 'not_started', NULL, 'https://www.milkywayediciones.com/cdn/shop/files/Un_extrano_en_primavera_06.jpg?v=1762769362&width=832', NULL, NULL, NULL, NULL, 'ES', 34, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (281, 'Wind Breaker', 38, 11, 'not_started', NULL, 'https://www.penguinlibros.com/es/5757522-thickbox_default/wind-breaker-11-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (283, 'Wind Breaker', 38, 13, 'not_started', NULL, 'https://www.penguinlibros.com/es/7262238-thickbox_default/wind-breaker-13-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');
INSERT INTO public.manga_volumes OVERRIDING SYSTEM VALUE VALUES (285, 'Wind Breaker', 38, 15, 'not_started', NULL, 'https://www.penguinlibros.com/es/7681381-thickbox_default/wind-breaker-15-shonen.jpg', NULL, NULL, NULL, NULL, 'ES', 16, '2026-08-29 15:09:51.139755+00');


--
-- TOC entry 4131 (class 0 OID 17658)
-- Dependencies: 375
-- Data for Name: mangas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (2, 'Algo entre Nosotros', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (3, 'Antiguos Alumnos', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (4, 'Atelier of Witch Hat: Ed. Grimorio', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (5, 'Aunque no Pueda Hacer Magia', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (6, 'Bakuman', 'shonen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (7, 'Banana Fish', 'shojo', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (8, 'Boy Meets Maria', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (9, 'Bungo Stray Dogs', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (10, 'Bungo Stray Dogs: Another Story', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (11, 'Bungo Stray Dogs: Raku-gaki Techo', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (12, 'Death Note: Black Edition', 'shonen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (13, 'El Arte de Atelier of Witch Hat', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (14, 'El Dios y el Mensajero Incapaz de Volar', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (15, 'En la Misma Clase', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (16, 'Fullmetal Alchemist', 'shonen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (17, 'Given', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (18, 'IDOLISH7', 'shojo', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (19, 'IDOLISH7 - TRIGGER', 'shojo', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (20, 'IDOLiSH7 - Re:member', 'shojo', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (21, 'Kitchen of Witch Hat', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (22, 'Link Click', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (23, 'Los Apuntes de Vánitas', 'shonen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (24, 'No. 6', 'shojo', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (25, 'Noragami', 'shonen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (26, 'Pandora Hearts', 'shonen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (27, 'Puedo Oír el Sol', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (28, 'Qualia bajo la Nieve', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (29, 'SOLANIN integral', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (30, 'Senpai', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (31, 'Seven Days', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (32, 'Sherlock: El Banquero Ciego', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (33, 'Sherlock: El Gran Juego', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (34, 'Sherlock: Estudio en Rosa', 'seinen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (35, 'Soul Eater', 'shonen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (36, 'Un Extraño a la Orilla del Mar', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (37, 'Un Extraño en Primavera', 'josei', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (38, 'Wind Breaker', 'shonen', '2026-08-29 15:04:50.132211+00');
INSERT INTO public.mangas OVERRIDING SYSTEM VALUE VALUES (39, 'You Are in the Blue Summer', 'josei', '2026-08-29 15:04:50.132211+00');


--
-- TOC entry 4140 (class 0 OID 18252)
-- Dependencies: 390
-- Data for Name: reading_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reading_plan OVERRIDING SYSTEM VALUE VALUES (1, 'Draco Malfoy and the Mirror of Ecidyrue', '{Starbrigid}', 312, 'https://i.ibb.co/QvFbXMp6/DRACO-MALFOY-MIRROR-EDIDYRUE-compressed.png', 0, '2026-09-18 07:11:27.573776+00');
INSERT INTO public.reading_plan OVERRIDING SYSTEM VALUE VALUES (5, 'What We Pretend We Can''t See', '{Gyzym}', 446, 'https://i.ibb.co/FkKfSjKf/WHAT-WE-PRETEND-WE-CANT-SEE-compressed.png', 9, '2026-09-18 08:52:10.452555+00');
INSERT INTO public.reading_plan OVERRIDING SYSTEM VALUE VALUES (10, 'No Harm', '{"Tessa Crowley"}', 158, 'https://i.ibb.co/whz9qNsN/drarry-no-harm-compressed.png', 8, '2026-09-23 09:22:45.16017+00');
INSERT INTO public.reading_plan OVERRIDING SYSTEM VALUE VALUES (3, 'Running on Air', '{Eventy7}', 260, 'https://i.ibb.co/hFDrMMdt/RUNNING-ON-AIR-compressed.png', 4, '2026-09-18 08:46:41.532787+00');
INSERT INTO public.reading_plan OVERRIDING SYSTEM VALUE VALUES (6, 'Pandora Hearts Vol. 3', '{"Jun Mochizuki"}', 167, 'https://m.media-amazon.com/images/I/71m+AOnsKQL._SL1119_.jpg', 1, '2026-09-21 22:07:16.825766+00');
INSERT INTO public.reading_plan OVERRIDING SYSTEM VALUE VALUES (7, 'Don''t Panic', '{Tindomerelhloni}', 381, 'https://i.ibb.co/TqM6WPGc/johnlock-dont-panic-compressed.png', 3, '2026-09-23 08:40:38.546799+00');
INSERT INTO public.reading_plan OVERRIDING SYSTEM VALUE VALUES (2, 'El río sabe tu nombre', '{"Jihyun Yun"}', 406, 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1774604218i/250303102.jpg', 2, '2026-09-18 07:12:28.558763+00');
INSERT INTO public.reading_plan OVERRIDING SYSTEM VALUE VALUES (4, 'Labyrinth of Hearts', '{"Unreliable Witness"}', 1184, 'https://i.ibb.co/TMwD6Fp4/LABYRINTH-OF-HEARTS-compressed.png', 7, '2026-09-18 08:48:26.923227+00');
INSERT INTO public.reading_plan OVERRIDING SYSTEM VALUE VALUES (8, 'Of Wizard Detectives and Pirate Doctors', '{"Hanna not Montana"}', 631, 'https://i.ibb.co/0VMQLys3/JOHNLOCK-OF-WIZARD-DETECTIVES-compressed.png', 6, '2026-09-23 08:42:58.53795+00');
INSERT INTO public.reading_plan OVERRIDING SYSTEM VALUE VALUES (9, 'Pandora Hearts Vol. 4', '{"Jun Mochizuki"}', 167, 'https://static.wikia.nocookie.net/pandorahearts/images/7/77/Pandorah4prev.jpg/revision/latest?cb=20140426042910', 5, '2026-09-23 08:43:26.522982+00');


--
-- TOC entry 4144 (class 0 OID 18307)
-- Dependencies: 394
-- Data for Name: ships; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ships OVERRIDING SYSTEM VALUE VALUES (1, 1, '{Sherlock,John}', '2026-09-20 21:41:06.438806+00');
INSERT INTO public.ships OVERRIDING SYSTEM VALUE VALUES (3, 3, '{Draco,Harry}', '2026-09-21 07:40:49.160339+00');
INSERT INTO public.ships OVERRIDING SYSTEM VALUE VALUES (2, 2, '{Dazai,Chuuya}', '2026-09-21 07:40:35.475332+00');
INSERT INTO public.ships OVERRIDING SYSTEM VALUE VALUES (4, 4, '{Victor,Yuuri}', '2026-09-21 07:41:23.414933+00');


--
-- TOC entry 4138 (class 0 OID 17773)
-- Dependencies: 382
-- Data for Name: yearly_readings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (1, 2026, 'Harry Potter y la Piedra Filosofal', '{"J.K. Rowling"}', 280, '2026-01-01', '2026-01-01', 'https://imagessl3.casadellibro.com/a/l/s7/93/9788498388893.webp', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (8, 2026, 'Beyond the Wand', '{"Tom Felton"}', 232, '2026-01-01', '2026-01-01', 'https://imagessl8.casadellibro.com/a/l/s7/38/9781529192438.webp', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (9, 2026, 'Harry Potter y la Cámara Secreta', '{"J. K. Rowling"}', 352, '2026-01-01', '2026-01-01', 'https://imagessl6.casadellibro.com/a/l/s7/46/9788498389746.webp', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (10, 2026, 'Harry Potter y el Prisionero de Azkaban', '{"J. K. Rowling"}', 397, '2026-01-01', '2026-01-01', 'https://imagessl0.casadellibro.com/a/l/s7/00/9788418174100.webp', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (11, 2026, 'Harry Potter y el Cáliz de Fuego', '{"J. K. Rowling"}', 693, '2026-01-01', '2026-01-01', 'https://imagessl1.casadellibro.com/a/l/s7/91/9788418174391.webp', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (12, 2026, 'Atelier of Witch Hat - Ed. Grimorio - Vol. 1', '{"Kamome Shirahama"}', 416, '2026-01-01', '2026-01-01', 'https://www.milkywayediciones.com/cdn/shop/files/Atelier_of_Witch_Hat_Ed_Grimorio_01_31c01cc6-9139-4257-8f22-3c80dc8db4af.jpg', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (13, 2026, 'Atelier of Witch Hat - Ed. Grimorio - Vol. 2', '{"Kamome Shirahama"}', 416, '2026-01-01', '2026-01-01', 'https://www.milkywayediciones.com/cdn/shop/files/Atelier_of_Witch_Hat_Ed_Grimorio_02.jpg', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (14, 2026, 'Harry Potter y la Orden del Fénix', '{"J. K. Rowling"}', 976, '2026-01-01', '2026-01-01', 'https://imagessl6.casadellibro.com/a/l/s7/36/9788418174636.webp', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (15, 2026, 'Atelier of Witch Hat - Ed. Grimorio - Vol. 3', '{"Kamome Shirahama"}', 416, '2026-01-01', '2026-01-01', 'https://www.milkywayediciones.com/cdn/shop/files/Atelier_of_Witch_Hat_Ed_Grimorio_03.jpg', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (19, 2026, 'Tormenta de Flores', '{"Osamu Dazai"}', 204, '2026-08-09', '2026-08-17', 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/713reYQuFxL._SL1178_.jpg', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (17, 2026, 'Harry Potter y el Misterio del Príncipe', '{"J. K. Rowling"}', 624, '2026-07-10', '2026-07-31', 'https://m.media-amazon.com/images/I/91bb0pQABHL._SL1500_.jpg', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (21, 2026, 'Harry Potter y las Reliquias de la Muerte', '{"J. K. Rowling"}', 721, '2026-08-17', NULL, 'https://imagessl0.casadellibro.com/a/l/s7/40/9788418797040.webp', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (16, 2026, 'BSD light novel vol.9: The Day I Took In Dazai', '{"Asagiri Kafka"}', 116, '2026-07-03', '2026-07-10', 'https://m.media-amazon.com/images/I/91wzr18kWrL._SL1500_.jpg', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (6, 2026, 'State of Flux', '{Atiki}', 83, '2026-01-01', '2026-01-01', 'https://i.ibb.co/RpTP3wmK/JOHNLOCK-STATE-OF-FLUX-compressed.png', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (3, 2026, 'Basic Instincts', '{"Tophats and Teacups"}', 187, '2026-01-01', '2026-01-01', 'https://i.ibb.co/cKfZZvk6/BASIC-INSTINCTS-compressed.png', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (4, 2026, 'All Our Secrets Lay Bare', '{"Fire the Sound"}', 428, '2026-01-01', '2026-01-01', 'https://i.ibb.co/3mc5GkBR/ALL-OUR-SECRETS-LAY-BARE-compressed.png', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (2, 2026, 'No Place to Hide', '{Aneiria}', 42, '2026-01-01', '2026-01-01', 'https://i.ibb.co/0yfhxtT5/NO-PLACE-TO-HIDE.png', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (5, 2026, 'We Go Anywhere But To The Ground', '{"Geordie Lover"}', 83, '2026-01-01', '2026-01-01', 'https://i.ibb.co/5h5Fw1sG/WE-GO-ANYWHERE-BUT-TO-THE-GROUND.png', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (7, 2026, 'The Gilded Cage', '{"Beautiful Fiction"}', 878, '2026-01-01', '2026-01-01', 'https://i.ibb.co/p6kV4SvF/THE-GILDED-CAGE.png', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (20, 2026, 'Atelier of Witch Hat - Ed. Grimorio - Vol. 4', '{"Kamome Shirahama"}', 416, '2026-09-10', '2026-09-14', 'https://www.milkywayediciones.com/cdn/shop/files/Atelier_of_Witch_Hat_Ed_Grimorio_04_4a10204c-32ef-4446-8dc3-c3cd6f250793.jpg', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (18, 2026, 'A Twist of Fate', '{Oakstone370}', 1398, '2026-07-31', '2026-08-04', 'https://i.ibb.co/QFrZ5BS9/TWIST-OF-FATE.png', '2026-09-11 12:16:29.871254+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (22, 2026, 'Pandora Hearts Vol. 2', '{"Jun Mochizuki"}', 167, '2025-08-08', '2026-09-22', 'https://m.media-amazon.com/images/I/61hs6Mw+luL._SL1113_.jpg', '2026-09-21 22:01:41.194225+00');
INSERT INTO public.yearly_readings OVERRIDING SYSTEM VALUE VALUES (23, 2026, 'El Hobbit', '{"J.R.R. Tolkien"}', 310, '2025-08-08', NULL, 'https://imagessl9.casadellibro.com/a/l/s7/09/9788445011409.webp', '2026-09-21 22:10:13.575731+00');


--
-- TOC entry 4158 (class 0 OID 0)
-- Dependencies: 366
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authors_id_seq', 172, true);


--
-- TOC entry 4159 (class 0 OID 0)
-- Dependencies: 368
-- Name: book_series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.book_series_id_seq', 42, true);


--
-- TOC entry 4160 (class 0 OID 0)
-- Dependencies: 370
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_id_seq', 371, true);


--
-- TOC entry 4161 (class 0 OID 0)
-- Dependencies: 364
-- Name: editorials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.editorials_id_seq', 70, true);


--
-- TOC entry 4162 (class 0 OID 0)
-- Dependencies: 391
-- Name: fandoms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fandoms_id_seq', 4, true);


--
-- TOC entry 4163 (class 0 OID 0)
-- Dependencies: 395
-- Name: fanfics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fanfics_id_seq', 18, true);


--
-- TOC entry 4164 (class 0 OID 0)
-- Dependencies: 378
-- Name: manga_volumes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.manga_volumes_id_seq', 422, true);


--
-- TOC entry 4165 (class 0 OID 0)
-- Dependencies: 374
-- Name: mangas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mangas_id_seq', 39, true);


--
-- TOC entry 4166 (class 0 OID 0)
-- Dependencies: 389
-- Name: reading_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reading_plan_id_seq', 10, true);


--
-- TOC entry 4167 (class 0 OID 0)
-- Dependencies: 393
-- Name: ships_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ships_id_seq', 4, true);


--
-- TOC entry 4168 (class 0 OID 0)
-- Dependencies: 381
-- Name: yearly_readings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.yearly_readings_id_seq', 23, true);


--
-- TOC entry 3800 (class 2606 OID 17592)
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- TOC entry 3810 (class 2606 OID 17636)
-- Name: book_authors book_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_pkey PRIMARY KEY (book_id, author_id);


--
-- TOC entry 3812 (class 2606 OID 17651)
-- Name: book_genres book_genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_genres
    ADD CONSTRAINT book_genres_pkey PRIMARY KEY (book_id, genre);


--
-- TOC entry 3802 (class 2606 OID 17601)
-- Name: book_series book_series_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_series
    ADD CONSTRAINT book_series_pkey PRIMARY KEY (id);


--
-- TOC entry 3805 (class 2606 OID 17618)
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- TOC entry 3798 (class 2606 OID 17583)
-- Name: editorials editorials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.editorials
    ADD CONSTRAINT editorials_pkey PRIMARY KEY (id);


--
-- TOC entry 3833 (class 2606 OID 18301)
-- Name: fandoms fandoms_name_origin_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fandoms
    ADD CONSTRAINT fandoms_name_origin_key UNIQUE (name, origin);


--
-- TOC entry 3835 (class 2606 OID 18299)
-- Name: fandoms fandoms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fandoms
    ADD CONSTRAINT fandoms_pkey PRIMARY KEY (id);


--
-- TOC entry 3843 (class 2606 OID 18380)
-- Name: fanfic_fandoms fanfic_fandoms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fanfic_fandoms
    ADD CONSTRAINT fanfic_fandoms_pkey PRIMARY KEY (fanfic_id, fandom_id);


--
-- TOC entry 3845 (class 2606 OID 18395)
-- Name: fanfic_ships fanfic_ships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fanfic_ships
    ADD CONSTRAINT fanfic_ships_pkey PRIMARY KEY (fanfic_id, ship_id);


--
-- TOC entry 3840 (class 2606 OID 18347)
-- Name: fanfics fanfics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fanfics
    ADD CONSTRAINT fanfics_pkey PRIMARY KEY (id);


--
-- TOC entry 3816 (class 2606 OID 17670)
-- Name: manga_authors manga_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manga_authors
    ADD CONSTRAINT manga_authors_pkey PRIMARY KEY (manga_id, author_id);


--
-- TOC entry 3818 (class 2606 OID 17685)
-- Name: manga_genres manga_genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manga_genres
    ADD CONSTRAINT manga_genres_pkey PRIMARY KEY (manga_id, genre);


--
-- TOC entry 3825 (class 2606 OID 17721)
-- Name: manga_volume_authors manga_volume_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manga_volume_authors
    ADD CONSTRAINT manga_volume_authors_pkey PRIMARY KEY (manga_volume_id, author_id);


--
-- TOC entry 3823 (class 2606 OID 17701)
-- Name: manga_volumes manga_volumes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manga_volumes
    ADD CONSTRAINT manga_volumes_pkey PRIMARY KEY (id);


--
-- TOC entry 3814 (class 2606 OID 17665)
-- Name: mangas mangas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mangas
    ADD CONSTRAINT mangas_pkey PRIMARY KEY (id);


--
-- TOC entry 3831 (class 2606 OID 18262)
-- Name: reading_plan reading_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reading_plan
    ADD CONSTRAINT reading_plan_pkey PRIMARY KEY (id);


--
-- TOC entry 3838 (class 2606 OID 18316)
-- Name: ships ships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ships
    ADD CONSTRAINT ships_pkey PRIMARY KEY (id);


--
-- TOC entry 3827 (class 2606 OID 17783)
-- Name: yearly_readings yearly_readings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.yearly_readings
    ADD CONSTRAINT yearly_readings_pkey PRIMARY KEY (id);


--
-- TOC entry 3803 (class 1259 OID 17607)
-- Name: idx_book_series_editorial; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_book_series_editorial ON public.book_series USING btree (editorial_id);


--
-- TOC entry 3806 (class 1259 OID 17629)
-- Name: idx_books_editorial; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_books_editorial ON public.books USING btree (editorial_id);


--
-- TOC entry 3807 (class 1259 OID 17631)
-- Name: idx_books_reading_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_books_reading_status ON public.books USING btree (reading_status);


--
-- TOC entry 3808 (class 1259 OID 17630)
-- Name: idx_books_serie; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_books_serie ON public.books USING btree (serie_id);


--
-- TOC entry 3841 (class 1259 OID 18360)
-- Name: idx_fanfics_reading_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_fanfics_reading_status ON public.fanfics USING btree (reading_status);


--
-- TOC entry 3819 (class 1259 OID 17715)
-- Name: idx_manga_volumes_editorial; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_manga_volumes_editorial ON public.manga_volumes USING btree (editorial_id);


--
-- TOC entry 3820 (class 1259 OID 17714)
-- Name: idx_manga_volumes_manga; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_manga_volumes_manga ON public.manga_volumes USING btree (manga_id);


--
-- TOC entry 3821 (class 1259 OID 17716)
-- Name: idx_manga_volumes_reading_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_manga_volumes_reading_status ON public.manga_volumes USING btree (reading_status);


--
-- TOC entry 3836 (class 1259 OID 18322)
-- Name: idx_ships_fandom; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ships_fandom ON public.ships USING btree (fandom_id);


--
-- TOC entry 3829 (class 1259 OID 18263)
-- Name: reading_plan_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reading_plan_order_idx ON public.reading_plan USING btree ("order");


--
-- TOC entry 3828 (class 1259 OID 17784)
-- Name: yearly_readings_year_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX yearly_readings_year_idx ON public.yearly_readings USING btree (year);


--
-- TOC entry 3849 (class 2606 OID 17642)
-- Name: book_authors book_authors_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE CASCADE;


--
-- TOC entry 3850 (class 2606 OID 17637)
-- Name: book_authors book_authors_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- TOC entry 3851 (class 2606 OID 17652)
-- Name: book_genres book_genres_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_genres
    ADD CONSTRAINT book_genres_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- TOC entry 3846 (class 2606 OID 17602)
-- Name: book_series book_series_editorial_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_series
    ADD CONSTRAINT book_series_editorial_id_fkey FOREIGN KEY (editorial_id) REFERENCES public.editorials(id) ON DELETE RESTRICT;


--
-- TOC entry 3847 (class 2606 OID 17619)
-- Name: books books_editorial_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_editorial_id_fkey FOREIGN KEY (editorial_id) REFERENCES public.editorials(id) ON DELETE RESTRICT;


--
-- TOC entry 3848 (class 2606 OID 17624)
-- Name: books books_serie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_serie_id_fkey FOREIGN KEY (serie_id) REFERENCES public.book_series(id) ON DELETE SET NULL;


--
-- TOC entry 3860 (class 2606 OID 18386)
-- Name: fanfic_fandoms fanfic_fandoms_fandom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fanfic_fandoms
    ADD CONSTRAINT fanfic_fandoms_fandom_id_fkey FOREIGN KEY (fandom_id) REFERENCES public.fandoms(id) ON DELETE RESTRICT;


--
-- TOC entry 3861 (class 2606 OID 18381)
-- Name: fanfic_fandoms fanfic_fandoms_fanfic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fanfic_fandoms
    ADD CONSTRAINT fanfic_fandoms_fanfic_id_fkey FOREIGN KEY (fanfic_id) REFERENCES public.fanfics(id) ON DELETE CASCADE;


--
-- TOC entry 3862 (class 2606 OID 18396)
-- Name: fanfic_ships fanfic_ships_fanfic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fanfic_ships
    ADD CONSTRAINT fanfic_ships_fanfic_id_fkey FOREIGN KEY (fanfic_id) REFERENCES public.fanfics(id) ON DELETE CASCADE;


--
-- TOC entry 3863 (class 2606 OID 18401)
-- Name: fanfic_ships fanfic_ships_ship_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fanfic_ships
    ADD CONSTRAINT fanfic_ships_ship_id_fkey FOREIGN KEY (ship_id) REFERENCES public.ships(id) ON DELETE RESTRICT;


--
-- TOC entry 3852 (class 2606 OID 17676)
-- Name: manga_authors manga_authors_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manga_authors
    ADD CONSTRAINT manga_authors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE CASCADE;


--
-- TOC entry 3853 (class 2606 OID 17671)
-- Name: manga_authors manga_authors_manga_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manga_authors
    ADD CONSTRAINT manga_authors_manga_id_fkey FOREIGN KEY (manga_id) REFERENCES public.mangas(id) ON DELETE CASCADE;


--
-- TOC entry 3854 (class 2606 OID 17686)
-- Name: manga_genres manga_genres_manga_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manga_genres
    ADD CONSTRAINT manga_genres_manga_id_fkey FOREIGN KEY (manga_id) REFERENCES public.mangas(id) ON DELETE CASCADE;


--
-- TOC entry 3857 (class 2606 OID 17727)
-- Name: manga_volume_authors manga_volume_authors_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manga_volume_authors
    ADD CONSTRAINT manga_volume_authors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE CASCADE;


--
-- TOC entry 3858 (class 2606 OID 17722)
-- Name: manga_volume_authors manga_volume_authors_manga_volume_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manga_volume_authors
    ADD CONSTRAINT manga_volume_authors_manga_volume_id_fkey FOREIGN KEY (manga_volume_id) REFERENCES public.manga_volumes(id) ON DELETE CASCADE;


--
-- TOC entry 3855 (class 2606 OID 17709)
-- Name: manga_volumes manga_volumes_editorial_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manga_volumes
    ADD CONSTRAINT manga_volumes_editorial_id_fkey FOREIGN KEY (editorial_id) REFERENCES public.editorials(id) ON DELETE RESTRICT;


--
-- TOC entry 3856 (class 2606 OID 17704)
-- Name: manga_volumes manga_volumes_manga_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manga_volumes
    ADD CONSTRAINT manga_volumes_manga_id_fkey FOREIGN KEY (manga_id) REFERENCES public.mangas(id) ON DELETE CASCADE;


--
-- TOC entry 3859 (class 2606 OID 18317)
-- Name: ships ships_fandom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ships
    ADD CONSTRAINT ships_fandom_id_fkey FOREIGN KEY (fandom_id) REFERENCES public.fandoms(id) ON DELETE RESTRICT;


--
-- TOC entry 4050 (class 3256 OID 18099)
-- Name: authors admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.authors FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4067 (class 3256 OID 18115)
-- Name: book_authors admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.book_authors FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4071 (class 3256 OID 18119)
-- Name: book_genres admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.book_genres FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4059 (class 3256 OID 18107)
-- Name: book_series admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.book_series FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4063 (class 3256 OID 18111)
-- Name: books admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.books FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4055 (class 3256 OID 18103)
-- Name: editorials admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.editorials FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4114 (class 3256 OID 18409)
-- Name: fanfic_fandoms admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.fanfic_fandoms FOR DELETE USING ((auth.role() = 'authenticated'::text));


--
-- TOC entry 4118 (class 3256 OID 18413)
-- Name: fanfic_ships admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.fanfic_ships FOR DELETE USING ((auth.role() = 'authenticated'::text));


--
-- TOC entry 4053 (class 3256 OID 18127)
-- Name: manga_authors admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.manga_authors FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4082 (class 3256 OID 18131)
-- Name: manga_genres admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.manga_genres FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4090 (class 3256 OID 18139)
-- Name: manga_volume_authors admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.manga_volume_authors FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4086 (class 3256 OID 18135)
-- Name: manga_volumes admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.manga_volumes FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4075 (class 3256 OID 18123)
-- Name: mangas admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.mangas FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4094 (class 3256 OID 18143)
-- Name: yearly_readings admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_delete ON public.yearly_readings FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4048 (class 3256 OID 18097)
-- Name: authors admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.authors FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4065 (class 3256 OID 18113)
-- Name: book_authors admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.book_authors FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4069 (class 3256 OID 18117)
-- Name: book_genres admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.book_genres FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4057 (class 3256 OID 18105)
-- Name: book_series admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.book_series FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4061 (class 3256 OID 18109)
-- Name: books admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.books FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4052 (class 3256 OID 18101)
-- Name: editorials admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.editorials FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4112 (class 3256 OID 18407)
-- Name: fanfic_fandoms admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.fanfic_fandoms FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- TOC entry 4116 (class 3256 OID 18411)
-- Name: fanfic_ships admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.fanfic_ships FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- TOC entry 4077 (class 3256 OID 18125)
-- Name: manga_authors admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.manga_authors FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4080 (class 3256 OID 18129)
-- Name: manga_genres admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.manga_genres FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4088 (class 3256 OID 18137)
-- Name: manga_volume_authors admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.manga_volume_authors FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4084 (class 3256 OID 18133)
-- Name: manga_volumes admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.manga_volumes FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4073 (class 3256 OID 18121)
-- Name: mangas admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.mangas FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4092 (class 3256 OID 18141)
-- Name: yearly_readings admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_insert ON public.yearly_readings FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4049 (class 3256 OID 18098)
-- Name: authors admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.authors FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4066 (class 3256 OID 18114)
-- Name: book_authors admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.book_authors FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4070 (class 3256 OID 18118)
-- Name: book_genres admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.book_genres FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4058 (class 3256 OID 18106)
-- Name: book_series admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.book_series FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4062 (class 3256 OID 18110)
-- Name: books admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.books FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4054 (class 3256 OID 18102)
-- Name: editorials admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.editorials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4113 (class 3256 OID 18408)
-- Name: fanfic_fandoms admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.fanfic_fandoms FOR UPDATE USING ((auth.role() = 'authenticated'::text));


--
-- TOC entry 4117 (class 3256 OID 18412)
-- Name: fanfic_ships admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.fanfic_ships FOR UPDATE USING ((auth.role() = 'authenticated'::text));


--
-- TOC entry 4078 (class 3256 OID 18126)
-- Name: manga_authors admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.manga_authors FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4081 (class 3256 OID 18130)
-- Name: manga_genres admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.manga_genres FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4089 (class 3256 OID 18138)
-- Name: manga_volume_authors admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.manga_volume_authors FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4085 (class 3256 OID 18134)
-- Name: manga_volumes admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.manga_volumes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4074 (class 3256 OID 18122)
-- Name: mangas admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.mangas FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4093 (class 3256 OID 18142)
-- Name: yearly_readings admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_update ON public.yearly_readings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4033 (class 3256 OID 17733)
-- Name: authors allow_all_anon; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY allow_all_anon ON public.authors TO authenticated, anon USING (true) WITH CHECK (true);


--
-- TOC entry 4036 (class 3256 OID 17736)
-- Name: book_authors allow_all_anon; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY allow_all_anon ON public.book_authors TO authenticated, anon USING (true) WITH CHECK (true);


--
-- TOC entry 4037 (class 3256 OID 17737)
-- Name: book_genres allow_all_anon; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY allow_all_anon ON public.book_genres TO authenticated, anon USING (true) WITH CHECK (true);


--
-- TOC entry 4034 (class 3256 OID 17734)
-- Name: book_series allow_all_anon; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY allow_all_anon ON public.book_series TO authenticated, anon USING (true) WITH CHECK (true);


--
-- TOC entry 4035 (class 3256 OID 17735)
-- Name: books allow_all_anon; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY allow_all_anon ON public.books TO authenticated, anon USING (true) WITH CHECK (true);


--
-- TOC entry 4032 (class 3256 OID 17732)
-- Name: editorials allow_all_anon; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY allow_all_anon ON public.editorials TO authenticated, anon USING (true) WITH CHECK (true);


--
-- TOC entry 4039 (class 3256 OID 17739)
-- Name: manga_authors allow_all_anon; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY allow_all_anon ON public.manga_authors TO authenticated, anon USING (true) WITH CHECK (true);


--
-- TOC entry 4040 (class 3256 OID 17740)
-- Name: manga_genres allow_all_anon; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY allow_all_anon ON public.manga_genres TO authenticated, anon USING (true) WITH CHECK (true);


--
-- TOC entry 4042 (class 3256 OID 17742)
-- Name: manga_volume_authors allow_all_anon; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY allow_all_anon ON public.manga_volume_authors TO authenticated, anon USING (true) WITH CHECK (true);


--
-- TOC entry 4041 (class 3256 OID 17741)
-- Name: manga_volumes allow_all_anon; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY allow_all_anon ON public.manga_volumes TO authenticated, anon USING (true) WITH CHECK (true);


--
-- TOC entry 4038 (class 3256 OID 17738)
-- Name: mangas allow_all_anon; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY allow_all_anon ON public.mangas TO authenticated, anon USING (true) WITH CHECK (true);


--
-- TOC entry 4015 (class 0 OID 17585)
-- Dependencies: 367
-- Name: authors; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4018 (class 0 OID 17632)
-- Dependencies: 372
-- Name: book_authors; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.book_authors ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4019 (class 0 OID 17647)
-- Dependencies: 373
-- Name: book_genres; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.book_genres ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4016 (class 0 OID 17594)
-- Dependencies: 369
-- Name: book_series; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.book_series ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4017 (class 0 OID 17609)
-- Dependencies: 371
-- Name: books; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4014 (class 0 OID 17576)
-- Dependencies: 365
-- Name: editorials; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.editorials ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4027 (class 0 OID 18292)
-- Dependencies: 392
-- Name: fandoms; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.fandoms ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4102 (class 3256 OID 18305)
-- Name: fandoms fandoms_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY fandoms_delete ON public.fandoms FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4100 (class 3256 OID 18303)
-- Name: fandoms fandoms_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY fandoms_insert ON public.fandoms FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4099 (class 3256 OID 18302)
-- Name: fandoms fandoms_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY fandoms_select ON public.fandoms FOR SELECT TO authenticated, anon USING (true);


--
-- TOC entry 4101 (class 3256 OID 18304)
-- Name: fandoms fandoms_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY fandoms_update ON public.fandoms FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4030 (class 0 OID 18376)
-- Dependencies: 397
-- Name: fanfic_fandoms; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.fanfic_fandoms ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4031 (class 0 OID 18391)
-- Dependencies: 398
-- Name: fanfic_ships; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.fanfic_ships ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4029 (class 0 OID 18328)
-- Dependencies: 396
-- Name: fanfics; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.fanfics ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4110 (class 3256 OID 18364)
-- Name: fanfics fanfics_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY fanfics_delete ON public.fanfics FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4108 (class 3256 OID 18362)
-- Name: fanfics fanfics_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY fanfics_insert ON public.fanfics FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4107 (class 3256 OID 18361)
-- Name: fanfics fanfics_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY fanfics_select ON public.fanfics FOR SELECT TO authenticated, anon USING (true);


--
-- TOC entry 4109 (class 3256 OID 18363)
-- Name: fanfics fanfics_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY fanfics_update ON public.fanfics FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4021 (class 0 OID 17666)
-- Dependencies: 376
-- Name: manga_authors; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.manga_authors ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4022 (class 0 OID 17681)
-- Dependencies: 377
-- Name: manga_genres; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.manga_genres ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4024 (class 0 OID 17717)
-- Dependencies: 380
-- Name: manga_volume_authors; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.manga_volume_authors ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4023 (class 0 OID 17692)
-- Dependencies: 379
-- Name: manga_volumes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.manga_volumes ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4020 (class 0 OID 17658)
-- Dependencies: 375
-- Name: mangas; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.mangas ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4047 (class 3256 OID 18096)
-- Name: authors public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.authors FOR SELECT USING (true);


--
-- TOC entry 4064 (class 3256 OID 18112)
-- Name: book_authors public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.book_authors FOR SELECT USING (true);


--
-- TOC entry 4068 (class 3256 OID 18116)
-- Name: book_genres public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.book_genres FOR SELECT USING (true);


--
-- TOC entry 4056 (class 3256 OID 18104)
-- Name: book_series public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.book_series FOR SELECT USING (true);


--
-- TOC entry 4060 (class 3256 OID 18108)
-- Name: books public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.books FOR SELECT USING (true);


--
-- TOC entry 4051 (class 3256 OID 18100)
-- Name: editorials public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.editorials FOR SELECT USING (true);


--
-- TOC entry 4111 (class 3256 OID 18406)
-- Name: fanfic_fandoms public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.fanfic_fandoms FOR SELECT USING (true);


--
-- TOC entry 4115 (class 3256 OID 18410)
-- Name: fanfic_ships public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.fanfic_ships FOR SELECT USING (true);


--
-- TOC entry 4076 (class 3256 OID 18124)
-- Name: manga_authors public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.manga_authors FOR SELECT USING (true);


--
-- TOC entry 4079 (class 3256 OID 18128)
-- Name: manga_genres public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.manga_genres FOR SELECT USING (true);


--
-- TOC entry 4087 (class 3256 OID 18136)
-- Name: manga_volume_authors public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.manga_volume_authors FOR SELECT USING (true);


--
-- TOC entry 4083 (class 3256 OID 18132)
-- Name: manga_volumes public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.manga_volumes FOR SELECT USING (true);


--
-- TOC entry 4072 (class 3256 OID 18120)
-- Name: mangas public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.mangas FOR SELECT USING (true);


--
-- TOC entry 4091 (class 3256 OID 18140)
-- Name: yearly_readings public_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_select ON public.yearly_readings FOR SELECT USING (true);


--
-- TOC entry 4026 (class 0 OID 18252)
-- Dependencies: 390
-- Name: reading_plan; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.reading_plan ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4098 (class 3256 OID 18267)
-- Name: reading_plan reading_plan_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY reading_plan_delete ON public.reading_plan FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4096 (class 3256 OID 18265)
-- Name: reading_plan reading_plan_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY reading_plan_insert ON public.reading_plan FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4095 (class 3256 OID 18264)
-- Name: reading_plan reading_plan_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY reading_plan_select ON public.reading_plan FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4097 (class 3256 OID 18266)
-- Name: reading_plan reading_plan_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY reading_plan_update ON public.reading_plan FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4028 (class 0 OID 18307)
-- Dependencies: 394
-- Name: ships; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.ships ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4106 (class 3256 OID 18326)
-- Name: ships ships_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY ships_delete ON public.ships FOR DELETE TO authenticated USING (true);


--
-- TOC entry 4104 (class 3256 OID 18324)
-- Name: ships ships_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY ships_insert ON public.ships FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 4103 (class 3256 OID 18323)
-- Name: ships ships_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY ships_select ON public.ships FOR SELECT TO authenticated, anon USING (true);


--
-- TOC entry 4105 (class 3256 OID 18325)
-- Name: ships ships_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY ships_update ON public.ships FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4025 (class 0 OID 17773)
-- Dependencies: 382
-- Name: yearly_readings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.yearly_readings ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4046 (class 3256 OID 17788)
-- Name: yearly_readings yearly_readings_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY yearly_readings_delete ON public.yearly_readings FOR DELETE USING (true);


--
-- TOC entry 4044 (class 3256 OID 17786)
-- Name: yearly_readings yearly_readings_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY yearly_readings_insert ON public.yearly_readings FOR INSERT WITH CHECK (true);


--
-- TOC entry 4043 (class 3256 OID 17785)
-- Name: yearly_readings yearly_readings_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY yearly_readings_select ON public.yearly_readings FOR SELECT USING (true);


--
-- TOC entry 4045 (class 3256 OID 17787)
-- Name: yearly_readings yearly_readings_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY yearly_readings_update ON public.yearly_readings FOR UPDATE USING (true);


-- Completed on 2026-09-23 18:34:35

--
-- PostgreSQL database dump complete
--

