-- Adicionar política de INSERT para user_profiles
-- Isso permite que usuários autenticados criem seu próprio perfil

CREATE POLICY "Usuários podem inserir próprio perfil"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);
