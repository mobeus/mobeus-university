CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


--
-- Name: update_user_last_seen(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_user_last_seen() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  UPDATE public.teleglass_users
  SET last_seen_at = NOW()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: conversation_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conversation_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    message_type text NOT NULL,
    message_content text NOT NULL,
    section_context text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT conversation_history_message_type_check CHECK ((message_type = ANY (ARRAY['user'::text, 'tele'::text, 'system'::text])))
);


--
-- Name: subsection_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subsection_images (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    subsection_id text NOT NULL,
    image_url text NOT NULL,
    prompt text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: teleglass_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teleglass_users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    cookie_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    last_seen_at timestamp with time zone DEFAULT now(),
    metadata jsonb DEFAULT '{}'::jsonb
);


--
-- Name: user_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_preferences (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    preference_key text NOT NULL,
    preference_value jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: conversation_history conversation_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_history
    ADD CONSTRAINT conversation_history_pkey PRIMARY KEY (id);


--
-- Name: subsection_images subsection_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subsection_images
    ADD CONSTRAINT subsection_images_pkey PRIMARY KEY (id);


--
-- Name: subsection_images subsection_images_subsection_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subsection_images
    ADD CONSTRAINT subsection_images_subsection_id_key UNIQUE (subsection_id);


--
-- Name: teleglass_users teleglass_users_cookie_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teleglass_users
    ADD CONSTRAINT teleglass_users_cookie_id_key UNIQUE (cookie_id);


--
-- Name: teleglass_users teleglass_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teleglass_users
    ADD CONSTRAINT teleglass_users_pkey PRIMARY KEY (id);


--
-- Name: user_preferences user_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_pkey PRIMARY KEY (id);


--
-- Name: user_preferences user_preferences_user_id_preference_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_user_id_preference_key_key UNIQUE (user_id, preference_key);


--
-- Name: idx_conversation_history_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_history_created_at ON public.conversation_history USING btree (created_at DESC);


--
-- Name: idx_conversation_history_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_history_user_id ON public.conversation_history USING btree (user_id);


--
-- Name: idx_subsection_images_subsection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subsection_images_subsection_id ON public.subsection_images USING btree (subsection_id);


--
-- Name: idx_teleglass_users_cookie_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_teleglass_users_cookie_id ON public.teleglass_users USING btree (cookie_id);


--
-- Name: idx_user_preferences_key; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_preferences_key ON public.user_preferences USING btree (user_id, preference_key);


--
-- Name: idx_user_preferences_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_preferences_user_id ON public.user_preferences USING btree (user_id);


--
-- Name: conversation_history update_last_seen_on_conversation; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_last_seen_on_conversation AFTER INSERT ON public.conversation_history FOR EACH ROW EXECUTE FUNCTION public.update_user_last_seen();


--
-- Name: user_preferences update_user_preferences_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: conversation_history conversation_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_history
    ADD CONSTRAINT conversation_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.teleglass_users(id) ON DELETE CASCADE;


--
-- Name: user_preferences user_preferences_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.teleglass_users(id) ON DELETE CASCADE;


--
-- Name: subsection_images Anon can insert subsection images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anon can insert subsection images" ON public.subsection_images FOR INSERT TO authenticated, anon WITH CHECK (true);


--
-- Name: subsection_images Anon can update subsection images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anon can update subsection images" ON public.subsection_images FOR UPDATE TO authenticated, anon USING (true) WITH CHECK (true);


--
-- Name: conversation_history Anyone can create conversation history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create conversation history" ON public.conversation_history FOR INSERT WITH CHECK (true);


--
-- Name: user_preferences Anyone can create preferences; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create preferences" ON public.user_preferences FOR INSERT WITH CHECK (true);


--
-- Name: teleglass_users Anyone can create user records; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create user records" ON public.teleglass_users FOR INSERT WITH CHECK (true);


--
-- Name: user_preferences Anyone can delete preferences; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can delete preferences" ON public.user_preferences FOR DELETE USING (true);


--
-- Name: user_preferences Anyone can update preferences; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can update preferences" ON public.user_preferences FOR UPDATE USING (true);


--
-- Name: teleglass_users Anyone can update their own user record; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can update their own user record" ON public.teleglass_users FOR UPDATE USING (true);


--
-- Name: conversation_history Anyone can view conversation history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view conversation history" ON public.conversation_history FOR SELECT USING (true);


--
-- Name: user_preferences Anyone can view preferences; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view preferences" ON public.user_preferences FOR SELECT USING (true);


--
-- Name: subsection_images Anyone can view subsection images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view subsection images" ON public.subsection_images FOR SELECT USING (true);


--
-- Name: teleglass_users Anyone can view their own user record; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view their own user record" ON public.teleglass_users FOR SELECT USING (true);


--
-- Name: subsection_images Service role can manage subsection images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Service role can manage subsection images" ON public.subsection_images TO service_role USING (true) WITH CHECK (true);


--
-- Name: conversation_history; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.conversation_history ENABLE ROW LEVEL SECURITY;

--
-- Name: subsection_images; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.subsection_images ENABLE ROW LEVEL SECURITY;

--
-- Name: teleglass_users; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.teleglass_users ENABLE ROW LEVEL SECURITY;

--
-- Name: user_preferences; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


