--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.0

-- Started on 2020-01-29 01:55:13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16384)
-- Name: credentials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credentials (
    user_id bigint NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.credentials OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16387)
-- Name: credential_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credential_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credential_user_id_seq OWNER TO postgres;

--
-- TOC entry 2976 (class 0 OID 0)
-- Dependencies: 203
-- Name: credential_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credential_user_id_seq OWNED BY public.credentials.user_id;


--
-- TOC entry 210 (class 1259 OID 16439)
-- Name: favourites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favourites (
    user_id bigint NOT NULL,
    score_id bigint NOT NULL
);


ALTER TABLE public.favourites OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 24633)
-- Name: recents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recents (
    user_id bigint NOT NULL,
    score_id bigint NOT NULL,
    "timestamp" time with time zone
);


ALTER TABLE public.recents OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16389)
-- Name: scores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scores (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    title character varying(100) NOT NULL,
    subtitle character varying(80),
    composer character varying(50),
    lyricist character varying(50),
    owner_id bigint NOT NULL,
    private boolean DEFAULT false NOT NULL,
    object_key character varying(200) NOT NULL
);


ALTER TABLE public.scores OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16394)
-- Name: score_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.score_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.score_id_seq OWNER TO postgres;

--
-- TOC entry 2977 (class 0 OID 0)
-- Dependencies: 205
-- Name: score_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.score_id_seq OWNED BY public.scores.id;


--
-- TOC entry 206 (class 1259 OID 16396)
-- Name: score_owner_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.score_owner_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.score_owner_id_seq OWNER TO postgres;

--
-- TOC entry 2978 (class 0 OID 0)
-- Dependencies: 206
-- Name: score_owner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.score_owner_id_seq OWNED BY public.scores.owner_id;


--
-- TOC entry 207 (class 1259 OID 16398)
-- Name: shares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shares (
    score_id bigint NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.shares OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16401)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    searchable boolean DEFAULT false NOT NULL,
    name character varying(15) NOT NULL,
    email character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16405)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 2979 (class 0 OID 0)
-- Dependencies: 209
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;


--
-- TOC entry 2818 (class 2604 OID 16407)
-- Name: credentials user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credentials ALTER COLUMN user_id SET DEFAULT nextval('public.credential_user_id_seq'::regclass);


--
-- TOC entry 2821 (class 2604 OID 16408)
-- Name: scores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores ALTER COLUMN id SET DEFAULT nextval('public.score_id_seq'::regclass);


--
-- TOC entry 2822 (class 2604 OID 16409)
-- Name: scores owner_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores ALTER COLUMN owner_id SET DEFAULT nextval('public.score_owner_id_seq'::regclass);


--
-- TOC entry 2824 (class 2604 OID 16410)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2834 (class 2606 OID 24652)
-- Name: favourites favourites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_pkey PRIMARY KEY (user_id, score_id);


--
-- TOC entry 2836 (class 2606 OID 24650)
-- Name: recents recents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recents
    ADD CONSTRAINT recents_pkey PRIMARY KEY (user_id, score_id);


--
-- TOC entry 2826 (class 2606 OID 16412)
-- Name: scores score_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT score_pkey PRIMARY KEY (id);


--
-- TOC entry 2828 (class 2606 OID 16414)
-- Name: users user_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_email UNIQUE (email);


--
-- TOC entry 2830 (class 2606 OID 16416)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2832 (class 2606 OID 16418)
-- Name: users username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username UNIQUE (name);


--
-- TOC entry 2842 (class 2606 OID 16447)
-- Name: favourites FK_score_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT "FK_score_id" FOREIGN KEY (score_id) REFERENCES public.scores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2844 (class 2606 OID 24644)
-- Name: recents FK_score_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recents
    ADD CONSTRAINT "FK_score_id" FOREIGN KEY (score_id) REFERENCES public.scores(id);


--
-- TOC entry 2841 (class 2606 OID 16442)
-- Name: favourites FK_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT "FK_user_id" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2843 (class 2606 OID 24639)
-- Name: recents FK_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recents
    ADD CONSTRAINT "FK_user_id" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2838 (class 2606 OID 16419)
-- Name: scores owner_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT owner_id FOREIGN KEY (id) REFERENCES public.users(id);


--
-- TOC entry 2839 (class 2606 OID 16424)
-- Name: shares score_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT score_id FOREIGN KEY (score_id) REFERENCES public.scores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2837 (class 2606 OID 16429)
-- Name: credentials user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2840 (class 2606 OID 16434)
-- Name: shares user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2020-01-29 01:55:13

--
-- PostgreSQL database dump complete
--

