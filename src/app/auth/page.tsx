"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, Mail, Lock, User, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { error: signInError } = await signIn(formData.email, formData.password);
        if (signInError) {
          setError("Email ou senha incorretos");
          setLoading(false);
          return;
        }
        router.push("/");
      } else {
        // Registro
        if (!formData.name.trim()) {
          setError("Por favor, informe seu nome");
          setLoading(false);
          return;
        }
        const { error: signUpError } = await signUp(formData.email, formData.password, formData.name);
        if (signUpError) {
          setError("Erro ao criar conta. Verifique os dados e tente novamente.");
          setLoading(false);
          return;
        }
        // Sucesso - redirecionar para fazer o quiz
        router.push("/start-quiz");
      }
    } catch (err) {
      setError("Ocorreu um erro. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#00FF00] rounded-lg flex items-center justify-center">
              <Dumbbell className="w-7 h-7 text-[#0D0D0D]" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Fit<span className="text-[#00FF00]">Prime</span>
            </h1>
          </div>
          <p className="text-white/60">
            {isLogin ? "Entre na sua conta" : "Crie sua conta gratuitamente"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome (apenas no registro) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00]/50"
                    placeholder="Seu nome"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00]/50"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00]/50"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              {!isLogin && (
                <p className="text-xs text-white/50 mt-1">Mínimo de 6 caracteres</p>
              )}
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00FF00] text-[#0D0D0D] font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar Conta"}
            </button>
          </form>

          {/* Toggle Login/Registro */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-white/60 hover:text-[#00FF00] transition-colors"
            >
              {isLogin ? (
                <>
                  Não tem conta? <span className="font-semibold">Cadastre-se</span>
                </>
              ) : (
                <>
                  Já tem conta? <span className="font-semibold">Faça login</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Voltar para home */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-white/50 hover:text-white/80 text-sm transition-colors"
          >
            ← Voltar para página inicial
          </button>
        </div>
      </div>
    </div>
  );
}
