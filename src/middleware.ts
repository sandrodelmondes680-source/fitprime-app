import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Verificar se há um token de autenticação
  const token = request.cookies.get('sb-access-token');
  
  if (!token) {
    // Se não há token e está tentando acessar rota protegida, redireciona para login
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  } else {
    // Se há token e está tentando acessar login/signup, redireciona para dashboard
    if (request.nextUrl.pathname.startsWith('/auth/')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/:path*'],
};
