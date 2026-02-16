-- Remover a policy incorreta que foi criada para authenticated
DROP POLICY IF EXISTS "Trigger pode criar perfil automaticamente" ON public.user_profiles;

-- Criar policy correta para permitir INSERT via trigger (que roda como SECURITY DEFINER)
-- O trigger executa com privilégios do owner (postgres), não como authenticated
CREATE POLICY "Permitir insert via trigger"
ON public.user_profiles
FOR INSERT
TO public
WITH CHECK (true);
