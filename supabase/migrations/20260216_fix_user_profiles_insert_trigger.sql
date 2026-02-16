-- Adicionar policy de INSERT para permitir que o trigger crie perfis
-- O trigger handle_new_user precisa desta policy para funcionar

CREATE POLICY "Trigger pode criar perfil automaticamente"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (true);
