--
-- PostgreSQL database dump
--

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-09-26 12:55:45

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 16423)
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    phone character varying(255),
    is_active boolean DEFAULT true,
    role_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    password_reset_token character varying(255),
    password_reset_expires timestamp with time zone
);


--
-- TOC entry 225 (class 1259 OID 16422)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 225
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 4867 (class 2604 OID 16426)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 5022 (class 0 OID 16423)
-- Dependencies: 226
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Users" (id, name, email, password, phone, is_active, role_id, created_at, updated_at, password_reset_token, password_reset_expires) FROM stdin;
4	Juan Pérez	juan@example.com	hash_o_clave	+57 3101234567	t	1	2025-09-26 01:18:28.037653-05	2025-09-26 01:18:28.037653-05	\N	\N
5	Carlos Ruiz	carlos@example.com	$2a$12$TCHwdzPA0XuByErJB.tTIeL6EdnNJc.W7zH829ZqtHDU1DioYIpkG	+57 3001234567	t	1	2025-09-26 01:31:29.410511-05	2025-09-26 12:13:20.908-05	355218c3ca793b422b61d59e77da874285372e0516cb92859c8c591894a94edb	2025-09-26 13:13:20.903-05
6	Usuario Ejemplo	amoamimamita12@gmail.com	$2a$12$MqD5XvqnJ4Vua/4HuPUD7ORp/jHWcY0Q3E6M7xBPnGqL/s7Q6.0Oy	+57 3001234567	t	1	2025-09-26 12:16:25.71377-05	2025-09-26 12:17:06.998-05	a4ebf95c7a2b91107a35fab4add84f2cc2feabafed859db3b1eb559a80b99ff0	2025-09-26 13:17:06.997-05
7	Usuario Ejemplo 2	juliesroman788@outlook.com	$2a$12$gUVFyZFHFEXMEiUgWLu1dOakVvHnGcrQwyFQ9S5ZUDJbsk3CcVihi	+57 3009876543	t	1	2025-09-26 12:18:57.407327-05	2025-09-26 12:54:46.706-05	34c054fde960726c3b7b3b12c4d01fd644d3a660b0fca7481e0c6536a96b8f8a	2025-09-26 13:54:46.699-05
\.


--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 225
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Users_id_seq"', 7, true);


--
-- TOC entry 4872 (class 2606 OID 16436)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 4873 (class 2606 OID 16437)
-- Name: Users Users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2025-09-26 12:55:46

--
-- PostgreSQL database dump complete
--


