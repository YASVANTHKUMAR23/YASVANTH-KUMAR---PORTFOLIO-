-- Existing Portfolio Data Table
-- Use this in your Supabase SQL Editor
CREATE TABLE IF NOT EXISTS public.portfolio_data (
  id TEXT NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone ('utc'::text, now()),
  CONSTRAINT portfolio_data_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Enable Row Level Security
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;

-- Idempotent Policy Management
DO $$
BEGIN
    -- Drop policies if they exist
    DROP POLICY IF EXISTS "Allow public read-only access" ON public.portfolio_data;
    DROP POLICY IF EXISTS "Allow authenticated update access" ON public.portfolio_data;
    
    -- Create policies
    CREATE POLICY "Allow public read-only access" ON public.portfolio_data
        FOR SELECT USING (true);

    CREATE POLICY "Allow authenticated update access" ON public.portfolio_data
        FOR ALL USING (auth.role() = 'authenticated');
END
$$;

-- Initialize Hero Section data
INSERT INTO public.portfolio_data (id, content)
VALUES ('hero', '{
  "name": "YASVANTH",
  "imageSrc": "/avatar.png",
  "leftText": "AI & Data Science Engineer specialized in Expert Python & n8n RAG.",
  "rightText": "WhatsApp health bots and ML models are my specialty.",
  "twitterUrl": "#",
  "instagramUrl": "#",
  "youtubeUrl": "#",
  "buttonText": "Let''s Talk",
  "buttonUrl": "#",
  "resumeUrl": ""
}')
ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content;

-- Initialize About Section data
INSERT INTO public.portfolio_data (id, content)
VALUES ('about', '{
  "heading": "ABOUT ME",
  "imageSrc": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  "desc1": "I started as a small freelance designer aiming to help brands make do with the new digital space they had acquired.",
  "desc2": "Currently, I offer full-stack development, UI/UX design, and creative direction services.",
  "twitter": "#",
  "facebook": "#",
  "instagram": "#"
}')
ON CONFLICT (id) DO NOTHING;

-- Initialize Contact Section data
INSERT INTO public.portfolio_data (id, content)
VALUES ('contact', '{
  "heading": "Get In Touch",
  "description": "Have a project in mind? Let''s build something amazing together.",
  "email": "yasvanthkumar2306@gmail.com",
  "linkedin": "Yasvanth Kumar N",
  "location": "Tamil Nadu, India",
  "labelName": "NAME",
  "labelEmail": "EMAIL",
  "labelMessage": "MESSAGE",
  "labelButton": "Send Message"
}')
ON CONFLICT (id) DO NOTHING;
