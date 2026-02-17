import { supabase } from './supabase';

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        name: fullName, // Também adiciona 'name' para garantir
      },
    },
  });

  if (error) throw error;

  // O perfil é criado automaticamente pelo trigger 'on_auth_user_created'
  // no banco de dados, então não precisamos criar manualmente aqui

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  try {
    // Primeiro verifica se existe uma sessão ativa
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Erro ao obter sessão:', sessionError);
      return null;
    }
    
    // Se não há sessão, retorna null sem erro
    if (!session) {
      return null;
    }
    
    // Se há sessão, obtém os dados do usuário
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Erro ao obter usuário:', userError);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Erro inesperado ao obter usuário:', error);
    return null;
  }
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
