"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, Sparkles, TrendingUp, Target, Crown } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário já fez o quiz
    const quizCompleted = localStorage.getItem('quizAnswers');
    const isPremium = localStorage.getItem('isPremium');

    if (isPremium === 'true') {
      // Usuário Premium vai direto para o dashboard
      router.push('/dashboard');
    } else if (quizCompleted) {
      // Usuário que já fez quiz mas não é Premium vai para página Premium
      router.push('/premium');
    } else {
      // Usuário novo - mostrar landing page
      setLoading(false);
    }
  }, [router]);

  const handleStartQuiz = () => {
    router.push('/start-quiz');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="w-16 h-16 text-[#00FF00] mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold">Carregando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#00FF00]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00FF00] rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-[#0D0D0D]" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Fit<span className="text-[#00FF00]">Prime</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#00FF00]" />
              <span className="text-sm font-semibold text-[#00FF00]">Treino Personalizado com IA</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transforme Seu Corpo<br />
            Com Treinos<br />
            <span className="text-[#00FF00]">100% Personalizados</span>
          </h1>

          <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto">
            Responda um quiz rápido e receba um plano de treino criado especialmente para você,
            baseado em seus objetivos, tempo disponível e nível atual de condicionamento.
          </p>

          <button
            onClick={handleStartQuiz}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#00FF00] text-[#0D0D0D] text-lg font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00FF00]/30"
          >
            <Sparkles className="w-6 h-6" />
            Começar Agora - É Grátis!
          </button>

          <p className="mt-4 text-white/50 text-sm">
            Sem cartão de crédito • Quiz de 2 minutos • Resultado instantâneo
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#00FF00]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-[#00FF00]" />
            </div>
            <h3 className="text-xl font-bold mb-3">100% Personalizado</h3>
            <p className="text-white/60">
              Treino criado especialmente para seus objetivos, nível e tempo disponível
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#00FF00]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-[#00FF00]" />
            </div>
            <h3 className="text-xl font-bold mb-3">IA Avançada</h3>
            <p className="text-white/60">
              Inteligência artificial analisa suas respostas e cria o melhor plano para você
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#00FF00]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-[#00FF00]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Resultados Reais</h3>
            <p className="text-white/60">
              Mais de 10.000 pessoas já transformaram seus corpos com FitPrime
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-24 bg-[#00FF00]/10 border-2 border-[#00FF00]/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto Para Começar Sua Transformação?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Leva apenas 2 minutos para criar seu plano personalizado
          </p>
          <button
            onClick={handleStartQuiz}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#00FF00] text-[#0D0D0D] text-lg font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00FF00]/30"
          >
            Fazer Quiz Gratuito Agora
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/50 text-sm">
          <p>© 2026 FitPrime. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
