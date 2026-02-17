-- Criar tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Dados do usuário
  email TEXT NOT NULL UNIQUE,
  name TEXT,

  -- Status Premium
  is_premium BOOLEAN DEFAULT FALSE,
  premium_plan TEXT, -- 'monthly' ou 'annual'
  premium_started_at TIMESTAMPTZ,
  premium_expires_at TIMESTAMPTZ,

  -- Dados do pagamento Kiwify
  kiwify_order_id TEXT,
  kiwify_customer_id TEXT,

  -- Metadados
  last_login_at TIMESTAMPTZ,
  quiz_completed BOOLEAN DEFAULT FALSE,
  quiz_completed_at TIMESTAMPTZ
);

-- Criar índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_premium ON public.user_profiles(is_premium);
CREATE INDEX IF NOT EXISTS idx_user_profiles_kiwify_order ON public.user_profiles(kiwify_order_id);

-- Habilitar RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seu próprio perfil
CREATE POLICY "Usuários podem ver próprio perfil"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Política: Usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Usuários podem atualizar próprio perfil"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Política: Service role pode fazer tudo (para webhook)
CREATE POLICY "Service role acesso total"
ON public.user_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at
DROP TRIGGER IF EXISTS handle_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER handle_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
