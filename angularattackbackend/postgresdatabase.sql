--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.2
-- Dumped by pg_dump version 9.5beta2

-- Started on 2016-05-15 10:46:45 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- TOC entry 2130 (class 1262 OID 12379)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2131 (class 1262 OID 12379)
-- Dependencies: 2130
-- Name: postgres; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 2132 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 186 (class 3079 OID 12361)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2133 (class 0 OID 0)
-- Dependencies: 186
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 183 (class 1259 OID 24589)
-- Name: conversation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE conversation (
    conversation_id integer NOT NULL,
    conversation_name character varying(255)
);


--
-- TOC entry 182 (class 1259 OID 24587)
-- Name: conversation_conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE conversation_conversation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2134 (class 0 OID 0)
-- Dependencies: 182
-- Name: conversation_conversation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE conversation_conversation_id_seq OWNED BY conversation.conversation_id;


--
-- TOC entry 185 (class 1259 OID 24597)
-- Name: message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE message (
    message_id integer NOT NULL,
    message_text text,
    message_user integer,
    message_conversation integer,
    message_owner boolean DEFAULT false NOT NULL,
    message_time timestamp without time zone DEFAULT now(),
    message_sender character varying(50)
);


--
-- TOC entry 184 (class 1259 OID 24595)
-- Name: message_message_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE message_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2135 (class 0 OID 0)
-- Dependencies: 184
-- Name: message_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE message_message_id_seq OWNED BY message.message_id;


--
-- TOC entry 181 (class 1259 OID 24578)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    user_id integer NOT NULL,
    username character varying(255),
    hash character varying(255)
);


--
-- TOC entry 180 (class 1259 OID 24576)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2136 (class 0 OID 0)
-- Dependencies: 180
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_user_id_seq OWNED BY users.user_id;


--
-- TOC entry 2000 (class 2604 OID 24592)
-- Name: conversation_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY conversation ALTER COLUMN conversation_id SET DEFAULT nextval('conversation_conversation_id_seq'::regclass);


--
-- TOC entry 2001 (class 2604 OID 24600)
-- Name: message_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY message ALTER COLUMN message_id SET DEFAULT nextval('message_message_id_seq'::regclass);


--
-- TOC entry 1999 (class 2604 OID 24581)
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN user_id SET DEFAULT nextval('users_user_id_seq'::regclass);


--
-- TOC entry 2007 (class 2606 OID 24594)
-- Name: conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY conversation
    ADD CONSTRAINT conversation_pkey PRIMARY KEY (conversation_id);


--
-- TOC entry 2009 (class 2606 OID 24607)
-- Name: message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY message
    ADD CONSTRAINT message_pkey PRIMARY KEY (message_id);


--
-- TOC entry 2005 (class 2606 OID 24586)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2011 (class 2606 OID 24613)
-- Name: message_message_conversation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY message
    ADD CONSTRAINT message_message_conversation_fkey FOREIGN KEY (message_conversation) REFERENCES conversation(conversation_id);


--
-- TOC entry 2010 (class 2606 OID 24608)
-- Name: message_message_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY message
    ADD CONSTRAINT message_message_user_fkey FOREIGN KEY (message_user) REFERENCES users(user_id);


-- Completed on 2016-05-15 10:46:45 EDT

--
-- PostgreSQL database dump complete
--

