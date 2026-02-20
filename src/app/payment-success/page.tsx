"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { isPremiumActive } from "@/utils/premium-validator";
import { Loader2, CheckCircle, AlertCircle, Crown, Sparkles } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { profile, loading: authLoading, refreshProfile } = useAuth();
  const [checkCount, setCheckCount] = useState(0);
  const [status, setStatus] = useState<'checking' | 'success' | 'timeout'>('checking');

  useEffect(() => {
    if (authLoading) return;

    if (!profile) {
      // Se não estiver logado, redirecionar para login
      router.push('/auth');
      return;
    }

    // Verificar se já tem Premium ativo
    if (isPremiumActive(profile)) {
      setStatus('success');
      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
      return;
    }

    // Iniciar polling para verificar atualização do webhook
    const maxChecks = 20; // 20 tentativas = ~60 segundos
    const interval = setInterval(async () => {
      setCheckCount(prev => prev + 1);

      // Atualizar perfil do banco
      await refreshProfile();

      // Verificar se atingiu limite de tentativas
      if (checkCount >= maxChecks) {
        setStatus('timeout');
        clearInterval(interval);
      }
    }, 3000); // Verificar a cada 3 segundos

    return () => clearInterval(interval);
  }, [authLoading, profile, checkCount, router, refreshProfile]);

  // Atualizar status quando profile mudar
  useEffect(() => {
    if (profile && isPremiumActive(profile) && status === 'checking') {
      setStatus('success');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }
  }, [profile, status, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#00FF00] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Checking Status */}
        {status === 'checking' && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center animate-in fade-in duration-500">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-[#00FF00]/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#00FF00] border-t-transparent rounded-full animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto w-12 h-12 text-[#00FF00]" />
            </div>

            <h2 className="text-2xl font-bold mb-3">Aguardando Confirmação...</h2>

            <p className="text-white/60 mb-6">
              Estamos processando seu pagamento. Isso pode levar alguns segundos.
            </p>

            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Tentativa:</span>
                <span className="text-[#00FF00] font-mono">{checkCount + 1} / 20</span>
              </div>

              <div className="mt-3 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] transition-all duration-300"
                  style={{ width: `${((checkCount + 1) / 20) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-xs text-white/40">
              A confirmação é enviada pela Kiwify e pode levar até 60 segundos
            </div>
          </div>
        )}

        {/* Success Status */}
        {status === 'success' && (
          <div className="bg-gradient-to-br from-[#00FF00]/10 to-transparent border-2 border-[#00FF00]/30 rounded-2xl p-8 text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 mx-auto mb-6 bg-[#00FF00]/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-[#00FF00]" />
            </div>

            <h2 className="text-3xl font-bold mb-3">Pagamento Confirmado! 🎉</h2>

            <p className="text-white/80 mb-6">
              Seu plano Premium foi ativado com sucesso!
            </p>

            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-[#00FF00]" />
                <span className="font-bold text-[#00FF00]">Premium Ativo</span>
              </div>
              <div className="text-sm text-white/60">
                Plano: {profile?.premium_plan === 'annual' ? 'Anual' : 'Mensal'}
              </div>
            </div>

            <p className="text-sm text-white/60">
              Redirecionando para seu dashboard...
            </p>
          </div>
        )}

        {/* Timeout Status */}
        {status === 'timeout' && (
          <div className="bg-white/5 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-8 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 mx-auto mb-6 bg-orange-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-orange-400" />
            </div>

            <h2 className="text-2xl font-bold mb-3">Confirmação Pendente</h2>

            <p className="text-white/80 mb-6">
              Ainda não recebemos a confirmação do pagamento da Kiwify.
            </p>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-6">
              <p className="text-sm text-white/80 mb-3">
                <strong>Não se preocupe!</strong> Seu pagamento está sendo processado.
              </p>
              <ul className="text-sm text-white/60 text-left space-y-2">
                <li>✓ O pagamento pode levar alguns minutos</li>
                <li>✓ Você receberá um email de confirmação</li>
                <li>✓ Seu acesso será liberado automaticamente</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setStatus('checking');
                  setCheckCount(0);
                  refreshProfile();
                }}
                className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300"
              >
                Verificar Novamente
              </button>

              <button
                onClick={() => router.push('/')}
                className="w-full bg-white/5 border border-white/10 text-white font-bold py-3 px-6 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Voltar para Início
              </button>
            </div>

            <p className="text-xs text-white/40 mt-4">
              Se o problema persistir, entre em contato com o suporte
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
