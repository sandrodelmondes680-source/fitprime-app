import { createClient } from '@supabase/supabase-js'

// No Next.js, variáveis de ambiente do cliente precisam ter NEXT_PUBLIC_
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Variáveis de ambiente Supabase não configuradas!')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
