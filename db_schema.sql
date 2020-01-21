--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.0

-- Started on 2020-01-21 19:23:08

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

--
-- TOC entry 2 (class 3079 OID 16457)
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

--
-- TOC entry 209 (class 1259 OID 16417)
-- Name: credentials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credentials (
    user_id bigint NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.credentials OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16415)
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
-- TOC entry 3010 (class 0 OID 0)
-- Dependencies: 208
-- Name: credential_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credential_user_id_seq OWNED BY public.credentials.user_id;


--
-- TOC entry 207 (class 1259 OID 16401)
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
    link character varying(200) NOT NULL
);


ALTER TABLE public.scores OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16397)
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
-- TOC entry 3011 (class 0 OID 0)
-- Dependencies: 205
-- Name: score_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.score_id_seq OWNED BY public.scores.id;


--
-- TOC entry 206 (class 1259 OID 16399)
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
-- TOC entry 3012 (class 0 OID 0)
-- Dependencies: 206
-- Name: score_owner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.score_owner_id_seq OWNED BY public.scores.owner_id;


--
-- TOC entry 210 (class 1259 OID 16426)
-- Name: shares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shares (
    score_id bigint NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.shares OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16387)
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
-- TOC entry 203 (class 1259 OID 16385)
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
-- TOC entry 3013 (class 0 OID 0)
-- Dependencies: 203
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;


--
-- TOC entry 2865 (class 2604 OID 16420)
-- Name: credentials user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credentials ALTER COLUMN user_id SET DEFAULT nextval('public.credential_user_id_seq'::regclass);


--
-- TOC entry 2861 (class 2604 OID 16404)
-- Name: scores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores ALTER COLUMN id SET DEFAULT nextval('public.score_id_seq'::regclass);


--
-- TOC entry 2863 (class 2604 OID 16406)
-- Name: scores owner_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores ALTER COLUMN owner_id SET DEFAULT nextval('public.score_owner_id_seq'::regclass);


--
-- TOC entry 2859 (class 2604 OID 16390)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2873 (class 2606 OID 16409)
-- Name: scores score_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT score_pkey PRIMARY KEY (id);


--
-- TOC entry 2867 (class 2606 OID 16456)
-- Name: users user_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_email UNIQUE (email);


--
-- TOC entry 2869 (class 2606 OID 16396)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2871 (class 2606 OID 16454)
-- Name: users username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username UNIQUE (name);


--
-- TOC entry 2874 (class 2606 OID 16410)
-- Name: scores owner_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT owner_id FOREIGN KEY (id) REFERENCES public.users(id);


--
-- TOC entry 2877 (class 2606 OID 16434)
-- Name: shares score_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT score_id FOREIGN KEY (score_id) REFERENCES public.scores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2875 (class 2606 OID 16421)
-- Name: credentials user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2876 (class 2606 OID 16429)
-- Name: shares user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2020-01-21 19:23:08

--
-- PostgreSQL database dump complete
--

