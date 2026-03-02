"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";
import { LogIn, Dumbbell } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
router.push("/dashboard");

    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00FF00] to-[#00CC00] rounded-2xl mb-4">
            <Dumbbell className="w-8 h-8 text-[#0D0D0D]" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo ao <span className="text-[#00FF00]">FitPrime</span>
          </h1>
          <p className="text-white/60">Entre para continuar sua jornada fitness</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[#00FF00]/50 focus:outline-none transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[#00FF00]/50 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00FF00]/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                "Entrando..."
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Não tem uma conta?{" "}
              <a
                href="/auth/signup"
                className="text-[#00FF00] hover:underline font-medium"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/40 text-sm mt-8">
          Ao continuar, você concorda com nossos Termos de Uso
        </p>
      </div>
    </div>
  );
}
