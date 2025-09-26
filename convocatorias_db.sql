--
-- PostgreSQL database dump
--

\restrict uwryunTP9zvEit9syQFwcZkljdABlPieAtZjponYIjp1WZIVETLDXtss3s0mqZt

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-09-26 12:34:36

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
-- TOC entry 2 (class 3079 OID 16715)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 5177 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 240 (class 1259 OID 16552)
-- Name: CallAdditionalInterests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CallAdditionalInterests" (
    id integer NOT NULL,
    "callId" integer NOT NULL,
    "interestId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 239 (class 1259 OID 16551)
-- Name: CallAdditionalInterests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."CallAdditionalInterests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5178 (class 0 OID 0)
-- Dependencies: 239
-- Name: CallAdditionalInterests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."CallAdditionalInterests_id_seq" OWNED BY public."CallAdditionalInterests".id;


--
-- TOC entry 238 (class 1259 OID 16540)
-- Name: CallHistories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CallHistories" (
    id integer NOT NULL,
    "originalId" integer,
    title character varying(255),
    description text,
    resources text,
    "callLink" character varying(255),
    "openDate" timestamp with time zone,
    "closeDate" timestamp with time zone,
    "pageName" character varying(255),
    "pageUrl" character varying(255),
    objective text,
    notes text,
    "imageUrl" character varying(255),
    "institutionId" integer,
    "lineId" integer,
    "targetAudienceId" integer,
    "interestId" integer,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "isActive" boolean,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 237 (class 1259 OID 16539)
-- Name: CallHistories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."CallHistories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5179 (class 0 OID 0)
-- Dependencies: 237
-- Name: CallHistories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."CallHistories_id_seq" OWNED BY public."CallHistories".id;


--
-- TOC entry 236 (class 1259 OID 16500)
-- Name: Calls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Calls" (
    id integer NOT NULL,
    title character varying(255),
    description text,
    resources text,
    "callLink" character varying(255),
    "openDate" timestamp with time zone,
    "closeDate" timestamp with time zone,
    "pageName" character varying(255),
    "pageUrl" character varying(255),
    objective text,
    notes text,
    "imageUrl" character varying(255),
    "institutionId" integer,
    "lineId" integer,
    "targetAudienceId" integer,
    "interestId" integer,
    "userId" integer,
    "clickCount" integer DEFAULT 0,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 235 (class 1259 OID 16499)
-- Name: Calls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Calls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5180 (class 0 OID 0)
-- Dependencies: 235
-- Name: Calls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Calls_id_seq" OWNED BY public."Calls".id;


--
-- TOC entry 244 (class 1259 OID 16587)
-- Name: Cities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Cities" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "departmentId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 243 (class 1259 OID 16586)
-- Name: Cities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Cities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5181 (class 0 OID 0)
-- Dependencies: 243
-- Name: Cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Cities_id_seq" OWNED BY public."Cities".id;


--
-- TOC entry 246 (class 1259 OID 16603)
-- Name: Companies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Companies" (
    id integer NOT NULL,
    name character varying(255),
    "taxId" character varying(255),
    "legalName" character varying(255),
    address character varying(255),
    phone character varying(255),
    website character varying(255),
    "employeeCount" integer,
    "economicSector" character varying(255),
    description text,
    "existenceYears" integer,
    "legalDocument" character varying(255),
    "legalFirstName" character varying(255),
    "legalLastName" character varying(255),
    "legalRepresentativeName" character varying(255),
    "legalRepresentativeRole" character varying(255),
    "legalRepresentativePhone" character varying(255),
    "legalRepresentativeEmail" character varying(255),
    landline character varying(255),
    "legalMobile" character varying(255),
    email character varying(255),
    "legalPosition" character varying(255),
    "cityId" integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 245 (class 1259 OID 16602)
-- Name: Companies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Companies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5182 (class 0 OID 0)
-- Dependencies: 245
-- Name: Companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Companies_id_seq" OWNED BY public."Companies".id;


--
-- TOC entry 242 (class 1259 OID 16576)
-- Name: Departments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Departments" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 241 (class 1259 OID 16575)
-- Name: Departments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Departments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5183 (class 0 OID 0)
-- Dependencies: 241
-- Name: Departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Departments_id_seq" OWNED BY public."Departments".id;


--
-- TOC entry 254 (class 1259 OID 16675)
-- Name: Favorites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Favorites" (
    id integer NOT NULL,
    "userId" integer,
    "callId" integer,
    "favoritedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 253 (class 1259 OID 16674)
-- Name: Favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Favorites_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5184 (class 0 OID 0)
-- Dependencies: 253
-- Name: Favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Favorites_id_seq" OWNED BY public."Favorites".id;


--
-- TOC entry 230 (class 1259 OID 16463)
-- Name: Institutions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Institutions" (
    id integer NOT NULL,
    name character varying(255),
    website character varying(255),
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 16462)
-- Name: Institutions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Institutions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5185 (class 0 OID 0)
-- Dependencies: 229
-- Name: Institutions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Institutions_id_seq" OWNED BY public."Institutions".id;


--
-- TOC entry 222 (class 1259 OID 16396)
-- Name: Interests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Interests" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 16395)
-- Name: Interests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Interests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5186 (class 0 OID 0)
-- Dependencies: 221
-- Name: Interests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Interests_id_seq" OWNED BY public."Interests".id;


--
-- TOC entry 232 (class 1259 OID 16477)
-- Name: Lines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Lines" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


--
-- TOC entry 231 (class 1259 OID 16476)
-- Name: Lines_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Lines_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5187 (class 0 OID 0)
-- Dependencies: 231
-- Name: Lines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Lines_id_seq" OWNED BY public."Lines".id;


--
-- TOC entry 248 (class 1259 OID 16622)
-- Name: RequirementCategories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RequirementCategories" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 247 (class 1259 OID 16621)
-- Name: RequirementCategories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."RequirementCategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5188 (class 0 OID 0)
-- Dependencies: 247
-- Name: RequirementCategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."RequirementCategories_id_seq" OWNED BY public."RequirementCategories".id;


--
-- TOC entry 256 (class 1259 OID 16685)
-- Name: RequirementChecks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RequirementChecks" (
    id integer NOT NULL,
    "isChecked" boolean,
    "companyId" integer,
    "requirementId" integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 255 (class 1259 OID 16684)
-- Name: RequirementChecks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."RequirementChecks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5189 (class 0 OID 0)
-- Dependencies: 255
-- Name: RequirementChecks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."RequirementChecks_id_seq" OWNED BY public."RequirementChecks".id;


--
-- TOC entry 250 (class 1259 OID 16635)
-- Name: RequirementGroups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RequirementGroups" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    "categoryId" integer,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 249 (class 1259 OID 16634)
-- Name: RequirementGroups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."RequirementGroups_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5190 (class 0 OID 0)
-- Dependencies: 249
-- Name: RequirementGroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."RequirementGroups_id_seq" OWNED BY public."RequirementGroups".id;


--
-- TOC entry 252 (class 1259 OID 16653)
-- Name: Requirements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Requirements" (
    id integer NOT NULL,
    name character varying(255),
    notes text,
    "institutionId" integer,
    "groupId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 251 (class 1259 OID 16652)
-- Name: Requirements_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Requirements_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5191 (class 0 OID 0)
-- Dependencies: 251
-- Name: Requirements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Requirements_id_seq" OWNED BY public."Requirements".id;


--
-- TOC entry 224 (class 1259 OID 16411)
-- Name: Roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Roles" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 16410)
-- Name: Roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5192 (class 0 OID 0)
-- Dependencies: 223
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Roles_id_seq" OWNED BY public."Roles".id;


--
-- TOC entry 220 (class 1259 OID 16389)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 16488)
-- Name: TargetAudiences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TargetAudiences" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 233 (class 1259 OID 16487)
-- Name: TargetAudiences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."TargetAudiences_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5193 (class 0 OID 0)
-- Dependencies: 233
-- Name: TargetAudiences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."TargetAudiences_id_seq" OWNED BY public."TargetAudiences".id;


--
-- TOC entry 228 (class 1259 OID 16443)
-- Name: UserInterests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UserInterests" (
    id integer NOT NULL,
    "userId" integer,
    "interestId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 227 (class 1259 OID 16442)
-- Name: UserInterests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."UserInterests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5194 (class 0 OID 0)
-- Dependencies: 227
-- Name: UserInterests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."UserInterests_id_seq" OWNED BY public."UserInterests".id;


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
-- TOC entry 5195 (class 0 OID 0)
-- Dependencies: 225
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 258 (class 1259 OID 16708)
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(45) NOT NULL
);


--
-- TOC entry 257 (class 1259 OID 16707)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.roles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4910 (class 2604 OID 16555)
-- Name: CallAdditionalInterests id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CallAdditionalInterests" ALTER COLUMN id SET DEFAULT nextval('public."CallAdditionalInterests_id_seq"'::regclass);


--
-- TOC entry 4909 (class 2604 OID 16543)
-- Name: CallHistories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CallHistories" ALTER COLUMN id SET DEFAULT nextval('public."CallHistories_id_seq"'::regclass);


--
-- TOC entry 4905 (class 2604 OID 16503)
-- Name: Calls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Calls" ALTER COLUMN id SET DEFAULT nextval('public."Calls_id_seq"'::regclass);


--
-- TOC entry 4914 (class 2604 OID 16590)
-- Name: Cities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Cities" ALTER COLUMN id SET DEFAULT nextval('public."Cities_id_seq"'::regclass);


--
-- TOC entry 4915 (class 2604 OID 16606)
-- Name: Companies id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Companies" ALTER COLUMN id SET DEFAULT nextval('public."Companies_id_seq"'::regclass);


--
-- TOC entry 4913 (class 2604 OID 16579)
-- Name: Departments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Departments" ALTER COLUMN id SET DEFAULT nextval('public."Departments_id_seq"'::regclass);


--
-- TOC entry 4925 (class 2604 OID 16678)
-- Name: Favorites id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Favorites" ALTER COLUMN id SET DEFAULT nextval('public."Favorites_id_seq"'::regclass);


--
-- TOC entry 4898 (class 2604 OID 16466)
-- Name: Institutions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Institutions" ALTER COLUMN id SET DEFAULT nextval('public."Institutions_id_seq"'::regclass);


--
-- TOC entry 4887 (class 2604 OID 16399)
-- Name: Interests id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Interests" ALTER COLUMN id SET DEFAULT nextval('public."Interests_id_seq"'::regclass);


--
-- TOC entry 4901 (class 2604 OID 16480)
-- Name: Lines id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Lines" ALTER COLUMN id SET DEFAULT nextval('public."Lines_id_seq"'::regclass);


--
-- TOC entry 4918 (class 2604 OID 16625)
-- Name: RequirementCategories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RequirementCategories" ALTER COLUMN id SET DEFAULT nextval('public."RequirementCategories_id_seq"'::regclass);


--
-- TOC entry 4926 (class 2604 OID 16688)
-- Name: RequirementChecks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RequirementChecks" ALTER COLUMN id SET DEFAULT nextval('public."RequirementChecks_id_seq"'::regclass);


--
-- TOC entry 4921 (class 2604 OID 16638)
-- Name: RequirementGroups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RequirementGroups" ALTER COLUMN id SET DEFAULT nextval('public."RequirementGroups_id_seq"'::regclass);


--
-- TOC entry 4924 (class 2604 OID 16656)
-- Name: Requirements id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Requirements" ALTER COLUMN id SET DEFAULT nextval('public."Requirements_id_seq"'::regclass);


--
-- TOC entry 4890 (class 2604 OID 16414)
-- Name: Roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);


--
-- TOC entry 4902 (class 2604 OID 16491)
-- Name: TargetAudiences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TargetAudiences" ALTER COLUMN id SET DEFAULT nextval('public."TargetAudiences_id_seq"'::regclass);


--
-- TOC entry 4897 (class 2604 OID 16446)
-- Name: UserInterests id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserInterests" ALTER COLUMN id SET DEFAULT nextval('public."UserInterests_id_seq"'::regclass);


--
-- TOC entry 4893 (class 2604 OID 16426)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 5153 (class 0 OID 16552)
-- Dependencies: 240
-- Data for Name: CallAdditionalInterests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CallAdditionalInterests" (id, "callId", "interestId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5151 (class 0 OID 16540)
-- Dependencies: 238
-- Data for Name: CallHistories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CallHistories" (id, "originalId", title, description, resources, "callLink", "openDate", "closeDate", "pageName", "pageUrl", objective, notes, "imageUrl", "institutionId", "lineId", "targetAudienceId", "interestId", "userId", "createdAt", "isActive", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5149 (class 0 OID 16500)
-- Dependencies: 236
-- Data for Name: Calls; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Calls" (id, title, description, resources, "callLink", "openDate", "closeDate", "pageName", "pageUrl", objective, notes, "imageUrl", "institutionId", "lineId", "targetAudienceId", "interestId", "userId", "clickCount", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5157 (class 0 OID 16587)
-- Dependencies: 244
-- Data for Name: Cities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Cities" (id, name, "departmentId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5159 (class 0 OID 16603)
-- Dependencies: 246
-- Data for Name: Companies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Companies" (id, name, "taxId", "legalName", address, phone, website, "employeeCount", "economicSector", description, "existenceYears", "legalDocument", "legalFirstName", "legalLastName", "legalRepresentativeName", "legalRepresentativeRole", "legalRepresentativePhone", "legalRepresentativeEmail", landline, "legalMobile", email, "legalPosition", "cityId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5155 (class 0 OID 16576)
-- Dependencies: 242
-- Data for Name: Departments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Departments" (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5167 (class 0 OID 16675)
-- Dependencies: 254
-- Data for Name: Favorites; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Favorites" (id, "userId", "callId", "favoritedAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5143 (class 0 OID 16463)
-- Dependencies: 230
-- Data for Name: Institutions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Institutions" (id, name, website, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5135 (class 0 OID 16396)
-- Dependencies: 222
-- Data for Name: Interests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Interests" (id, name, description, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5145 (class 0 OID 16477)
-- Dependencies: 232
-- Data for Name: Lines; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Lines" (id, name, description) FROM stdin;
\.


--
-- TOC entry 5161 (class 0 OID 16622)
-- Dependencies: 248
-- Data for Name: RequirementCategories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RequirementCategories" (id, name, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 5169 (class 0 OID 16685)
-- Dependencies: 256
-- Data for Name: RequirementChecks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RequirementChecks" (id, "isChecked", "companyId", "requirementId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5163 (class 0 OID 16635)
-- Dependencies: 250
-- Data for Name: RequirementGroups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RequirementGroups" (id, name, "categoryId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5165 (class 0 OID 16653)
-- Dependencies: 252
-- Data for Name: Requirements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Requirements" (id, name, notes, "institutionId", "groupId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5137 (class 0 OID 16411)
-- Dependencies: 224
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Roles" (id, name, "createdAt", "updatedAt") FROM stdin;
1	Admin	2025-09-26 01:17:48.32957-05	2025-09-26 01:17:48.32957-05
2	Editor	2025-09-26 01:17:48.32957-05	2025-09-26 01:17:48.32957-05
3	Viewer	2025-09-26 01:17:48.32957-05	2025-09-26 01:17:48.32957-05
\.


--
-- TOC entry 5133 (class 0 OID 16389)
-- Dependencies: 220
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SequelizeMeta" (name) FROM stdin;
20250731043940-create-interests.js
20250731043944-create-role.js
20250731043945-create-user.js
20250731043946-create-user-interest.js
20250731043947-create-institution.js
20250731043947-create-line.js
20250731043948-create-target-audience.js
20250731043949-create-call.js
20250731043950-create-call-history.js
20250731043951-create-call-additional-interest.js
20250731043951-create-department.js
20250731043952-create-city.js
20250731043953-create-company.js
20250731043953-create-requirement-category.js
20250731043954-create-requirement-group.js
20250731043955-create-requirement.js
20250731043956-create-favorite.js
20250731043956-create-requirement-check.js
\.


--
-- TOC entry 5147 (class 0 OID 16488)
-- Dependencies: 234
-- Data for Name: TargetAudiences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."TargetAudiences" (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5141 (class 0 OID 16443)
-- Dependencies: 228
-- Data for Name: UserInterests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UserInterests" (id, "userId", "interestId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5139 (class 0 OID 16423)
-- Dependencies: 226
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Users" (id, name, email, password, phone, is_active, role_id, created_at, updated_at, password_reset_token, password_reset_expires) FROM stdin;
4	Juan Pérez	juan@example.com	hash_o_clave	+57 3101234567	t	1	2025-09-26 01:18:28.037653-05	2025-09-26 01:18:28.037653-05	\N	\N
5	Carlos Ruiz	carlos@example.com	$2a$12$TCHwdzPA0XuByErJB.tTIeL6EdnNJc.W7zH829ZqtHDU1DioYIpkG	+57 3001234567	t	1	2025-09-26 01:31:29.410511-05	2025-09-26 12:13:20.908-05	355218c3ca793b422b61d59e77da874285372e0516cb92859c8c591894a94edb	2025-09-26 13:13:20.903-05
6	Usuario Ejemplo	amoamimamita12@gmail.com	$2a$12$MqD5XvqnJ4Vua/4HuPUD7ORp/jHWcY0Q3E6M7xBPnGqL/s7Q6.0Oy	+57 3001234567	t	1	2025-09-26 12:16:25.71377-05	2025-09-26 12:17:06.998-05	a4ebf95c7a2b91107a35fab4add84f2cc2feabafed859db3b1eb559a80b99ff0	2025-09-26 13:17:06.997-05
7	Usuario Ejemplo 2	juliesroman788@outlook.com	$2a$12$gUVFyZFHFEXMEiUgWLu1dOakVvHnGcrQwyFQ9S5ZUDJbsk3CcVihi	+57 3009876543	t	1	2025-09-26 12:18:57.407327-05	2025-09-26 12:22:15.169-05	9c386fefae4f8e9d235ee50d54059d3a1f444b32a2a2b9f40f56f1bc0cfaa1c3	2025-09-26 13:22:15.167-05
\.


--
-- TOC entry 5171 (class 0 OID 16708)
-- Dependencies: 258
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (id, name) FROM stdin;
1	Admin
2	Editor
3	Viewer
\.


--
-- TOC entry 5196 (class 0 OID 0)
-- Dependencies: 239
-- Name: CallAdditionalInterests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CallAdditionalInterests_id_seq"', 1, false);


--
-- TOC entry 5197 (class 0 OID 0)
-- Dependencies: 237
-- Name: CallHistories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CallHistories_id_seq"', 1, false);


--
-- TOC entry 5198 (class 0 OID 0)
-- Dependencies: 235
-- Name: Calls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Calls_id_seq"', 1, false);


--
-- TOC entry 5199 (class 0 OID 0)
-- Dependencies: 243
-- Name: Cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Cities_id_seq"', 1, false);


--
-- TOC entry 5200 (class 0 OID 0)
-- Dependencies: 245
-- Name: Companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Companies_id_seq"', 1, false);


--
-- TOC entry 5201 (class 0 OID 0)
-- Dependencies: 241
-- Name: Departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Departments_id_seq"', 1, false);


--
-- TOC entry 5202 (class 0 OID 0)
-- Dependencies: 253
-- Name: Favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Favorites_id_seq"', 1, false);


--
-- TOC entry 5203 (class 0 OID 0)
-- Dependencies: 229
-- Name: Institutions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Institutions_id_seq"', 1, false);


--
-- TOC entry 5204 (class 0 OID 0)
-- Dependencies: 221
-- Name: Interests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Interests_id_seq"', 1, false);


--
-- TOC entry 5205 (class 0 OID 0)
-- Dependencies: 231
-- Name: Lines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Lines_id_seq"', 1, false);


--
-- TOC entry 5206 (class 0 OID 0)
-- Dependencies: 247
-- Name: RequirementCategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."RequirementCategories_id_seq"', 1, false);


--
-- TOC entry 5207 (class 0 OID 0)
-- Dependencies: 255
-- Name: RequirementChecks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."RequirementChecks_id_seq"', 1, false);


--
-- TOC entry 5208 (class 0 OID 0)
-- Dependencies: 249
-- Name: RequirementGroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."RequirementGroups_id_seq"', 1, false);


--
-- TOC entry 5209 (class 0 OID 0)
-- Dependencies: 251
-- Name: Requirements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Requirements_id_seq"', 1, false);


--
-- TOC entry 5210 (class 0 OID 0)
-- Dependencies: 223
-- Name: Roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Roles_id_seq"', 3, true);


--
-- TOC entry 5211 (class 0 OID 0)
-- Dependencies: 233
-- Name: TargetAudiences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."TargetAudiences_id_seq"', 1, false);


--
-- TOC entry 5212 (class 0 OID 0)
-- Dependencies: 227
-- Name: UserInterests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."UserInterests_id_seq"', 1, false);


--
-- TOC entry 5213 (class 0 OID 0)
-- Dependencies: 225
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Users_id_seq"', 7, true);


--
-- TOC entry 5214 (class 0 OID 0)
-- Dependencies: 257
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 4950 (class 2606 OID 16564)
-- Name: CallAdditionalInterests CallAdditionalInterests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CallAdditionalInterests"
    ADD CONSTRAINT "CallAdditionalInterests_pkey" PRIMARY KEY (id);


--
-- TOC entry 4948 (class 2606 OID 16550)
-- Name: CallHistories CallHistories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CallHistories"
    ADD CONSTRAINT "CallHistories_pkey" PRIMARY KEY (id);


--
-- TOC entry 4946 (class 2606 OID 16513)
-- Name: Calls Calls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Calls"
    ADD CONSTRAINT "Calls_pkey" PRIMARY KEY (id);


--
-- TOC entry 4954 (class 2606 OID 16596)
-- Name: Cities Cities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Cities"
    ADD CONSTRAINT "Cities_pkey" PRIMARY KEY (id);


--
-- TOC entry 4956 (class 2606 OID 16615)
-- Name: Companies Companies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Companies"
    ADD CONSTRAINT "Companies_pkey" PRIMARY KEY (id);


--
-- TOC entry 4952 (class 2606 OID 16585)
-- Name: Departments Departments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Departments"
    ADD CONSTRAINT "Departments_pkey" PRIMARY KEY (id);


--
-- TOC entry 4964 (class 2606 OID 16683)
-- Name: Favorites Favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY (id);


--
-- TOC entry 4940 (class 2606 OID 16475)
-- Name: Institutions Institutions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Institutions"
    ADD CONSTRAINT "Institutions_pkey" PRIMARY KEY (id);


--
-- TOC entry 4932 (class 2606 OID 16409)
-- Name: Interests Interests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_pkey" PRIMARY KEY (id);


--
-- TOC entry 4942 (class 2606 OID 16486)
-- Name: Lines Lines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Lines"
    ADD CONSTRAINT "Lines_pkey" PRIMARY KEY (id);


--
-- TOC entry 4958 (class 2606 OID 16633)
-- Name: RequirementCategories RequirementCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RequirementCategories"
    ADD CONSTRAINT "RequirementCategories_pkey" PRIMARY KEY (id);


--
-- TOC entry 4966 (class 2606 OID 16695)
-- Name: RequirementChecks RequirementChecks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RequirementChecks"
    ADD CONSTRAINT "RequirementChecks_pkey" PRIMARY KEY (id);


--
-- TOC entry 4960 (class 2606 OID 16646)
-- Name: RequirementGroups RequirementGroups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RequirementGroups"
    ADD CONSTRAINT "RequirementGroups_pkey" PRIMARY KEY (id);


--
-- TOC entry 4962 (class 2606 OID 16663)
-- Name: Requirements Requirements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Requirements"
    ADD CONSTRAINT "Requirements_pkey" PRIMARY KEY (id);


--
-- TOC entry 4934 (class 2606 OID 16421)
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- TOC entry 4930 (class 2606 OID 16394)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 4944 (class 2606 OID 16498)
-- Name: TargetAudiences TargetAudiences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TargetAudiences"
    ADD CONSTRAINT "TargetAudiences_pkey" PRIMARY KEY (id);


--
-- TOC entry 4938 (class 2606 OID 16451)
-- Name: UserInterests UserInterests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserInterests"
    ADD CONSTRAINT "UserInterests_pkey" PRIMARY KEY (id);


--
-- TOC entry 4936 (class 2606 OID 16436)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 4968 (class 2606 OID 16714)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4977 (class 2606 OID 16565)
-- Name: CallAdditionalInterests CallAdditionalInterests_callId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CallAdditionalInterests"
    ADD CONSTRAINT "CallAdditionalInterests_callId_fkey" FOREIGN KEY ("callId") REFERENCES public."Calls"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4978 (class 2606 OID 16570)
-- Name: CallAdditionalInterests CallAdditionalInterests_interestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CallAdditionalInterests"
    ADD CONSTRAINT "CallAdditionalInterests_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES public."Interests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4972 (class 2606 OID 16514)
-- Name: Calls Calls_institutionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Calls"
    ADD CONSTRAINT "Calls_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES public."Institutions"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4973 (class 2606 OID 16529)
-- Name: Calls Calls_interestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Calls"
    ADD CONSTRAINT "Calls_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES public."Interests"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4974 (class 2606 OID 16519)
-- Name: Calls Calls_lineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Calls"
    ADD CONSTRAINT "Calls_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES public."Lines"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4975 (class 2606 OID 16524)
-- Name: Calls Calls_targetAudienceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Calls"
    ADD CONSTRAINT "Calls_targetAudienceId_fkey" FOREIGN KEY ("targetAudienceId") REFERENCES public."TargetAudiences"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4976 (class 2606 OID 16534)
-- Name: Calls Calls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Calls"
    ADD CONSTRAINT "Calls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4979 (class 2606 OID 16597)
-- Name: Cities Cities_departmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Cities"
    ADD CONSTRAINT "Cities_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES public."Departments"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4980 (class 2606 OID 16616)
-- Name: Companies Companies_cityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Companies"
    ADD CONSTRAINT "Companies_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES public."Cities"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4984 (class 2606 OID 16696)
-- Name: RequirementChecks RequirementChecks_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RequirementChecks"
    ADD CONSTRAINT "RequirementChecks_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Companies"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4985 (class 2606 OID 16701)
-- Name: RequirementChecks RequirementChecks_requirementId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RequirementChecks"
    ADD CONSTRAINT "RequirementChecks_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES public."Requirements"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4981 (class 2606 OID 16647)
-- Name: RequirementGroups RequirementGroups_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RequirementGroups"
    ADD CONSTRAINT "RequirementGroups_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."RequirementCategories"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4982 (class 2606 OID 16669)
-- Name: Requirements Requirements_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Requirements"
    ADD CONSTRAINT "Requirements_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."RequirementGroups"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4983 (class 2606 OID 16664)
-- Name: Requirements Requirements_institutionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Requirements"
    ADD CONSTRAINT "Requirements_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES public."Institutions"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4970 (class 2606 OID 16457)
-- Name: UserInterests UserInterests_interestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserInterests"
    ADD CONSTRAINT "UserInterests_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES public."Interests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4971 (class 2606 OID 16452)
-- Name: UserInterests UserInterests_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserInterests"
    ADD CONSTRAINT "UserInterests_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4969 (class 2606 OID 16437)
-- Name: Users Users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2025-09-26 12:34:36

--
-- PostgreSQL database dump complete
--

\unrestrict uwryunTP9zvEit9syQFwcZkljdABlPieAtZjponYIjp1WZIVETLDXtss3s0mqZt

