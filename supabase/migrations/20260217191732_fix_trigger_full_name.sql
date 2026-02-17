-- Atualizar função para criar perfil usando 'full_name' ou 'name' dos metadados
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email)
  )
  ON CONFLICT (id) DO UPDATE
  SET
    name = COALESCE(EXCLUDED.name, user_profiles.name),
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
