"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, User, Settings, LogOut, Crown, Calendar, TrendingUp, Target } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de usuário premium
    const isPremium = localStorage.getItem('isPremium');
    if (!isPremium) {
      router.push('/premium');
      return;
    }

    // Simular dados do usuário
    setUser({
      name: "João Silva",
      email: "joao@email.com",
      plan: "Premium Anual",
      workoutsCompleted: 24,
      currentStreak: 7,
      nextWorkout: "Treino A - Peito e Tríceps"
    });

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isPremium');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="w-16 h-16 text-[#00FF00] mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold">Carregando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#00FF00]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00FF00] to-[#00CC00] rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-[#0D0D0D]" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Fit<span className="text-[#00FF00]">Prime</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/20 rounded-full px-3 py-1">
                <Crown className="w-4 h-4 text-[#00FF00]" />
                <span className="text-[#00FF00] text-sm font-medium">Premium</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="animate-in fade-in duration-500 space-y-8">
          {/* Welcome */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2">
              Bem-vindo de volta, {user?.name}! 💪
            </h2>
            <p className="text-xl text-white/80">
              Seu progresso está incrível. Vamos continuar!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
              <Target className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">{user?.workoutsCompleted}</div>
              <div className="text-white/60 text-sm">Treinos Completados</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">{user?.currentStreak}</div>
              <div className="text-white/60 text-sm">Dias de Sequência</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
              <Calendar className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
              <div className="text-lg font-bold mb-1">Hoje</div>
              <div className="text-white/60 text-sm">Próximo Treino</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
              <Crown className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
              <div className="text-lg font-bold mb-1">{user?.plan}</div>
              <div className="text-white/60 text-sm">Plano Ativo</div>
            </div>
          </div>

          {/* Next Workout */}
          <div className="bg-gradient-to-br from-[#00FF00]/10 to-transparent border border-[#00FF00]/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Dumbbell className="w-6 h-6 text-[#00FF00]" />
              Próximo Treino
            </h3>

            <div className="bg-white/5 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4">{user?.nextWorkout}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-white/60 text-sm">Duração Estimada</p>
                  <p className="font-semibold">45 minutos</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Dificuldade</p>
                  <p className="font-semibold">Intermediária</p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300">
                Iniciar Treino
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#00FF00]/30 transition-all duration-300 text-left">
              <User className="w-8 h-8 text-[#00FF00] mb-3" />
              <h4 className="text-lg font-bold mb-2">Meu Perfil</h4>
              <p className="text-white/60 text-sm">Atualizar informações pessoais</p>
            </button>

            <button className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#00FF00]/30 transition-all duration-300 text-left">
              <Settings className="w-8 h-8 text-[#00FF00] mb-3" />
              <h4 className="text-lg font-bold mb-2">Configurações</h4>
              <p className="text-white/60 text-sm">Preferências e notificações</p>
            </button>

            <button className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#00FF00]/30 transition-all duration-300 text-left">
              <TrendingUp className="w-8 h-8 text-[#00FF00] mb-3" />
              <h4 className="text-lg font-bold mb-2">Progresso</h4>
              <p className="text-white/60 text-sm">Acompanhe sua evolução</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}