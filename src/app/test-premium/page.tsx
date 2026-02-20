"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { isPremiumActive, getDaysUntilExpiration, getPremiumStatusMessage } from "@/utils/premium-validator";
import { CheckCircle, XCircle, AlertCircle, Calendar, Crown } from "lucide-react";

export default function TestPremiumPage() {
  const { profile, loading } = useAuth();
  const [validationResults, setValidationResults] = useState<{
    layer1: boolean;
    layer2: boolean;
    layer3: boolean;
    isPremium: boolean;
    daysLeft: number | null;
    statusMessage: string;
  } | null>(null);

  useEffect(() => {
    if (!loading && profile) {
      // Executar validação
      const layer1 = profile.is_premium === true;
      const layer2 = profile.premium_expires_at !== null;

      let layer3 = false;
      if (profile.premium_expires_at) {
        const expirationDate = new Date(profile.premium_expires_at);
        const now = new Date();
        layer3 = expirationDate > now;
      }

      setValidationResults({
        layer1,
        layer2,
        layer3,
        isPremium: isPremiumActive(profile),
        daysLeft: getDaysUntilExpiration(profile),
        statusMessage: getPremiumStatusMessage(profile),
      });
    }
  }, [profile, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white flex items-center justify-center">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white flex items-center justify-center">
        <div className="text-xl">Faça login para ver esta página</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🧪 Teste de Validação Premium
        </h1>

        {/* Dados brutos do banco */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-blue-400" />
            Dados do Banco de Dados
          </h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Email:</span>
              <span className="text-white">{profile.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">is_premium:</span>
              <span className={profile.is_premium ? "text-green-400" : "text-red-400"}>
                {String(profile.is_premium)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">premium_plan:</span>
              <span className="text-white">{profile.premium_plan || "null"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">premium_expires_at:</span>
              <span className="text-white">
                {profile.premium_expires_at
                  ? new Date(profile.premium_expires_at).toLocaleString('pt-BR')
                  : "null"}
              </span>
            </div>
          </div>
        </div>

        {/* Validação em 3 camadas */}
        {validationResults && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Crown className="w-6 h-6 text-[#00FF00]" />
              Validação (3 Camadas)
            </h2>

            <div className="space-y-4">
              {/* Camada 1 */}
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  {validationResults.layer1 ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                  <div>
                    <div className="font-bold">Camada 1: Flag Premium</div>
                    <div className="text-sm text-white/60">is_premium === true</div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${validationResults.layer1 ? 'text-green-400' : 'text-red-400'}`}>
                  {validationResults.layer1 ? '✅ PASSOU' : '❌ FALHOU'}
                </div>
              </div>

              {/* Camada 2 */}
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  {validationResults.layer2 ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                  <div>
                    <div className="font-bold">Camada 2: Data Existe</div>
                    <div className="text-sm text-white/60">premium_expires_at !== null</div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${validationResults.layer2 ? 'text-green-400' : 'text-red-400'}`}>
                  {validationResults.layer2 ? '✅ PASSOU' : '❌ FALHOU'}
                </div>
              </div>

              {/* Camada 3 */}
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  {validationResults.layer3 ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                  <div>
                    <div className="font-bold">Camada 3: Data Válida</div>
                    <div className="text-sm text-white/60">premium_expires_at {'>'} agora</div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${validationResults.layer3 ? 'text-green-400' : 'text-red-400'}`}>
                  {validationResults.layer3 ? '✅ PASSOU' : '❌ FALHOU'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resultado final */}
        {validationResults && (
          <div className={`border-2 rounded-2xl p-8 mb-6 ${
            validationResults.isPremium
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
          }`}>
            <h2 className="text-3xl font-bold mb-4 text-center">
              {validationResults.isPremium ? '✅ PREMIUM ATIVO' : '❌ PREMIUM INATIVO'}
            </h2>

            <div className="text-center space-y-2">
              <div className="text-lg text-white/80">
                {validationResults.statusMessage}
              </div>

              {validationResults.daysLeft !== null && validationResults.daysLeft > 0 && (
                <div className="flex items-center justify-center gap-2 text-white/60">
                  <Calendar className="w-5 h-5" />
                  <span>{validationResults.daysLeft} dias restantes</span>
                </div>
              )}
            </div>

            <div className="mt-6 bg-white/5 rounded-xl p-4">
              <div className="font-bold mb-2">Comportamento do Sistema:</div>
              <div className="text-sm text-white/80">
                {validationResults.isPremium ? (
                  <>
                    ✅ Usuário tem acesso ao <strong>/dashboard</strong> e todas as funcionalidades Premium
                  </>
                ) : (
                  <>
                    🚫 Usuário será <strong>redirecionado para /premium</strong> ao tentar acessar o dashboard
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Informações adicionais */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">ℹ️ Sobre este Teste</h2>
          <div className="text-sm text-white/80 space-y-2">
            <p>
              Esta página demonstra como o sistema valida o status Premium em <strong>tempo real</strong>.
            </p>
            <p>
              A validação acontece automaticamente quando o usuário tenta acessar páginas Premium como o <code className="bg-white/10 px-2 py-1 rounded">/dashboard</code>.
            </p>
            <p className="text-[#00FF00]">
              ✅ Se todas as 3 camadas passarem → Acesso liberado
            </p>
            <p className="text-red-400">
              ❌ Se qualquer camada falhar → Redirecionado para renovação
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
