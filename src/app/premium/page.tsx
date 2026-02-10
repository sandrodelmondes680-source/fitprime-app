"use client";

import { useState } from "react";
import { Dumbbell, Check, Sparkles, TrendingUp, Calendar, Bell, Zap, Crown } from "lucide-react";

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  const handleSubscribe = (plan: 'monthly' | 'annual') => {
    const paymentLinks = {
      monthly: 'https://pay.kiwify.com.br/ZZ6yQv0',
      annual: 'https://pay.kiwify.com.br/Igb3YqS'
    };

    window.open(paymentLinks[plan], '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#00FF00]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00FF00] to-[#00CC00] rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-[#0D0D0D]" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Fit<span className="text-[#00FF00]">Prime</span>
              </h1>
            </div>
            <Crown className="w-6 h-6 text-[#00FF00]" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-in fade-in duration-500 space-y-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#00FF00]" />
              <span className="text-sm font-semibold text-[#00FF00]">Oferta Especial</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Desbloqueie Seu Treino<br />
              <span className="text-[#00FF00]">Premium</span> 🔥
            </h2>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Transforme seu corpo com treinos personalizados e acompanhamento inteligente
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Treinos Atualizados Toda Semana",
                description: "Novos exercícios e variações para evitar platô e manter a motivação"
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Programas Exclusivos",
                description: "Planos específicos para emagrecer, ganhar massa ou definir"
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "IA Avançada",
                description: "Inteligência artificial acompanhando sua evolução em tempo real"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Ajustes Automáticos",
                description: "Treino se adapta automaticamente ao seu progresso"
              },
              {
                icon: <Bell className="w-6 h-6" />,
                title: "Lembretes Inteligentes",
                description: "Notificações personalizadas para manter você no caminho certo"
              },
              {
                icon: <Crown className="w-6 h-6" />,
                title: "Acesso Vitalício",
                description: "Todos os recursos premium desbloqueados para sempre"
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#00FF00]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#00FF00]/10 rounded-xl flex items-center justify-center mb-4 text-[#00FF00]">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-white/60">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Pricing Plans */}
          <div className="bg-gradient-to-br from-[#00FF00]/10 to-transparent border border-[#00FF00]/20 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-center mb-8">Escolha Seu Plano</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Monthly Plan */}
              <div
                onClick={() => setSelectedPlan('monthly')}
                className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 ${
                  selectedPlan === 'monthly'
                    ? 'border-[#00FF00] bg-[#00FF00]/10 scale-105'
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                {selectedPlan === 'monthly' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#00FF00] text-[#0D0D0D] px-3 py-1 rounded-full text-sm font-bold">
                      Selecionado
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <h4 className="text-xl font-bold mb-2">Plano Mensal</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">R$ 24,90</span>
                    <span className="text-white/60">/mês</span>
                  </div>
                  <p className="text-white/60 text-sm">Flexibilidade total, cancele quando quiser</p>
                  
                  <div className="mt-6 space-y-3">
                    {[
                      "Todos os recursos Premium",
                      "Treinos ilimitados",
                      "Suporte prioritário"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-[#00FF00]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Annual Plan */}
              <div
                onClick={() => setSelectedPlan('annual')}
                className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 ${
                  selectedPlan === 'annual'
                    ? 'border-[#00FF00] bg-[#00FF00]/10 scale-105'
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                {selectedPlan === 'annual' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#00FF00] text-[#0D0D0D] px-3 py-1 rounded-full text-sm font-bold">
                      Selecionado
                    </div>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute -top-4 -right-4 bg-[#00FF00] text-[#0D0D0D] px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    ECONOMIZE 40%
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">Plano Anual</h4>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">R$ 14,92</span>
                      <span className="text-white/60">/mês</span>
                    </div>
                    <p className="text-sm text-[#00FF00] font-semibold mb-1">R$ 179,00 por ano</p>
                    <p className="text-white/60 text-sm">Melhor custo-benefício!</p>
                    
                    <div className="mt-6 space-y-3">
                      {[
                        "Todos os recursos Premium",
                        "Treinos ilimitados",
                        "Suporte prioritário",
                        "2 meses grátis"
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-[#00FF00]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscribe Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <button
                onClick={() => handleSubscribe('monthly')}
                className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-4 px-8 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00FF00]/20 text-lg"
              >
                Plano Mensal - R$ 24,90/mês
              </button>

              <button
                onClick={() => handleSubscribe('annual')}
                className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-4 px-8 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00FF00]/20 text-lg"
              >
                Plano Anual - R$ 179,00/ano
              </button>
            </div>

            <p className="text-center text-white/60 text-sm">
              Pagamento seguro • Cancele quando quiser • Garantia de 7 dias
            </p>
          </div>

          {/* Social Proof */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#00FF00] text-2xl">⭐</span>
              ))}
            </div>
            <p className="text-xl font-semibold mb-2">Mais de 10.000 usuários transformados</p>
            <p className="text-white/60">
              "O FitPrime mudou minha vida! Perdi 15kg em 3 meses e nunca me senti tão bem."
            </p>
            <p className="text-white/80 font-semibold mt-2">- Maria Silva, São Paulo</p>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center mb-6">Perguntas Frequentes</h3>
            
            {[
              {
                q: "Posso cancelar a qualquer momento?",
                a: "Sim! Você pode cancelar sua assinatura quando quiser, sem multas ou taxas."
              },
              {
                q: "Os treinos funcionam para iniciantes?",
                a: "Absolutamente! Nossos treinos são personalizados para todos os níveis, do iniciante ao avançado."
              },
              {
                q: "Preciso de equipamentos?",
                a: "Não necessariamente. Oferecemos treinos para casa (sem equipamentos) e para academia."
              },
              {
                q: "Como funciona a garantia?",
                a: "Se não ficar satisfeito nos primeiros 7 dias, devolvemos 100% do seu dinheiro."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                <p className="text-white/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
