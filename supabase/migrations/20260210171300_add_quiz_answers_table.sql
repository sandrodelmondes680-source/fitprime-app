-- Tabela para armazenar respostas do quiz inicial
CREATE TABLE IF NOT EXISTS public.quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Dados pessoais
  name TEXT NOT NULL,
  age TEXT NOT NULL,

  -- Disponibilidade e limitações
  time_available TEXT NOT NULL,
  physical_limitations TEXT NOT NULL,

  -- Condicionamento atual
  current_conditioning TEXT NOT NULL,
  current_frequency TEXT NOT NULL,

  -- Objetivos e motivação
  main_objective TEXT NOT NULL,
  main_motivation TEXT NOT NULL,

  -- Hábitos de saúde
  nutrition TEXT NOT NULL,
  hydration TEXT NOT NULL,
  sleep TEXT NOT NULL
);

-- Index para consultas rápidas por data
CREATE INDEX IF NOT EXISTS idx_quiz_answers_created_at ON public.quiz_answers(created_at DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer pessoa pode inserir (usuários novos fazendo quiz)
CREATE POLICY "Permitir inserção pública de quiz_answers"
ON public.quiz_answers
FOR INSERT
TO anon
WITH CHECK (true);

-- Política: Apenas service role pode ler (para admin/analytics)
CREATE POLICY "Apenas service role pode ler quiz_answers"
ON public.quiz_answers
FOR SELECT
TO service_role
USING (true);
