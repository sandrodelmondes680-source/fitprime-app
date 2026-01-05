"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, ArrowLeft, ArrowRight, Check, User, Calendar, Clock, AlertTriangle, TrendingUp, Target, Utensils, Droplets, Moon, Flame } from "lucide-react";

interface QuizAnswers {
  name: string;
  age: string;
  timeAvailable: string;
  physicalLimitations: string;
  currentConditioning: string;
  currentFrequency: string;
  mainObjective: string;
  nutrition: string;
  hydration: string;
  sleep: string;
  mainMotivation: string;
}

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswers>({
    name: "",
    age: "",
    timeAvailable: "",
    physicalLimitations: "",
    currentConditioning: "",
    currentFrequency: "",
    mainObjective: "",
    nutrition: "",
    hydration: "",
    sleep: "",
    mainMotivation: "",
  });

  const totalSteps = 11;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Armazenar respostas localmente
      localStorage.setItem('quizAnswers', JSON.stringify(answers));

      // Redirecionar para análise e geração do treino
      router.push("/workout-analysis");
    } catch (error) {
      console.error("Erro ao processar quiz:", error);
      alert("Erro ao processar suas respostas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const updateAnswer = (key: keyof QuizAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return answers.name.trim().length > 0;
      case 2: return answers.age !== "";
      case 3: return answers.timeAvailable !== "";
      case 4: return answers.physicalLimitations !== "";
      case 5: return answers.currentConditioning !== "";
      case 6: return answers.currentFrequency !== "";
      case 7: return answers.mainObjective !== "";
      case 8: return answers.nutrition !== "";
      case 9: return answers.hydration !== "";
      case 10: return answers.sleep !== "";
      case 11: return answers.mainMotivation !== "";
      default: return false;
    }
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
            <div className="text-sm text-white/60">
              Quiz Personalizado
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#0D0D0D] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">
              Pergunta {step} de {totalSteps}
            </span>
            <span className="text-sm text-[#00FF00] font-medium">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-36 pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-in fade-in duration-500">
          {/* Step 1: Name */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <User className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Qual é o seu nome?</h2>
                <p className="text-white/60">Vamos nos conhecer melhor! 💪</p>
              </div>

              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  value={answers.name}
                  onChange={(e) => updateAnswer('name', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-lg focus:border-[#00FF00]/50 focus:outline-none transition-colors placeholder:text-white/40"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 2: Age */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Calendar className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Qual é a sua idade?</h2>
                <p className="text-white/60">Isso nos ajuda a personalizar seu treino</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "18-25", label: "18-25 anos" },
                  { value: "26-35", label: "26-35 anos" },
                  { value: "36-45", label: "36-45 anos" },
                  { value: "46+", label: "46+ anos" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateAnswer('age', option.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-center ${
                      answers.age === option.value
                        ? "border-[#00FF00] bg-[#00FF00]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <h3 className="font-bold text-lg">{option.label}</h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Time Available */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Clock className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Quanto tempo você tem disponível para treinar?</h2>
                <p className="text-white/60">Por sessão de treino</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: "30min", label: "30 minutos", desc: "Treino rápido e intenso" },
                  { value: "45-60min", label: "45-60 minutos", desc: "Treino completo" },
                  { value: "60min+", label: "Mais de 60 min", desc: "Treino detalhado" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateAnswer('timeAvailable', option.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-center ${
                      answers.timeAvailable === option.value
                        ? "border-[#00FF00] bg-[#00FF00]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-1">{option.label}</h3>
                    <p className="text-white/60 text-sm">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Physical Limitations */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <AlertTriangle className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Você tem alguma limitação física?</h2>
                <p className="text-white/60">Lesões, dores ou restrições que devemos considerar</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { value: "nenhuma", label: "Nenhuma limitação", desc: "Estou 100% saudável" },
                  { value: "leve", label: "Limitações leves", desc: "Dores ocasionais ou mobilidade reduzida" },
                  { value: "moderada", label: "Limitações moderadas", desc: "Lesões antigas ou condições crônicas" },
                  { value: "grave", label: "Limitações graves", desc: "Preciso de exercícios adaptados" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateAnswer('physicalLimitations', option.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      answers.physicalLimitations === option.value
                        ? "border-[#00FF00] bg-[#00FF00]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-1">{option.label}</h3>
                    <p className="text-white/60 text-sm">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Current Conditioning */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <TrendingUp className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Qual é o seu condicionamento atual?</h2>
                <p className="text-white/60">Seu nível de forma física geral</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { value: "sedentario", label: "Sedentário", desc: "Pouca ou nenhuma atividade física" },
                  { value: "leve", label: "Atividade leve", desc: "Caminhadas ocasionais ou exercícios leves" },
                  { value: "moderado", label: "Moderadamente ativo", desc: "Treinos regulares 2-3x por semana" },
                  { value: "ativo", label: "Muito ativo", desc: "Treinos intensos várias vezes por semana" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateAnswer('currentConditioning', option.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      answers.currentConditioning === option.value
                        ? "border-[#00FF00] bg-[#00FF00]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-1">{option.label}</h3>
                    <p className="text-white/60 text-sm">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Current Frequency */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Target className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Qual é a sua frequência atual de treino?</h2>
                <p className="text-white/60">Quantas vezes você treina por semana atualmente</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "0", label: "Nunca treino" },
                  { value: "1-2", label: "1-2x por semana" },
                  { value: "3-4", label: "3-4x por semana" },
                  { value: "5+", label: "5+ vezes por semana" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateAnswer('currentFrequency', option.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-center ${
                      answers.currentFrequency === option.value
                        ? "border-[#00FF00] bg-[#00FF00]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <h3 className="font-bold text-lg">{option.label}</h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Main Objective */}
          {step === 7 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Flame className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Qual é o seu objetivo principal?</h2>
                <p className="text-white/60">O que você quer alcançar com os treinos</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { value: "perder_peso", label: "Perder peso", icon: "🔥" },
                  { value: "ganhar_massa", label: "Ganhar massa muscular", icon: "💪" },
                  { value: "definicao", label: "Definição muscular", icon: "⚡" },
                  { value: "saude", label: "Melhorar saúde geral", icon: "❤️" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateAnswer('mainObjective', option.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      answers.mainObjective === option.value
                        ? "border-[#00FF00] bg-[#00FF00]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <h3 className="font-bold text-lg">{option.label}</h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 8: Nutrition */}
          {step === 8 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Utensils className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Como está a sua alimentação?</h2>
                <p className="text-white/60">Sua dieta atual influencia muito nos resultados</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { value: "ruim", label: "Precisa melhorar muito", desc: "Fast food, processados, pouca variedade" },
                  { value: "regular", label: "Regular", desc: "Algumas refeições saudáveis, mas poderia ser melhor" },
                  { value: "boa", label: "Boa", desc: "Alimentação balanceada na maioria das refeições" },
                  { value: "excelente", label: "Excelente", desc: "Dieta rica em nutrientes, bem planejada" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateAnswer('nutrition', option.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      answers.nutrition === option.value
                        ? "border-[#00FF00] bg-[#00FF00]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-1">{option.label}</h3>
                    <p className="text-white/60 text-sm">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 9: Hydration */}
          {step === 9 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Droplets className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Como está a sua hidratação?</h2>
                <p className="text-white/60">A água é essencial para o desempenho</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { value: "ruim", label: "Bebo pouco", desc: "Menos de 1 litro por dia" },
                  { value: "regular", label: "Regular", desc: "1-2 litros por dia" },
                  { value: "boa", label: "Boa", desc: "2-3 litros por dia" },
                  { value: "excelente", label: "Excelente", desc: "Mais de 3 litros por dia" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateAnswer('hydration', option.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      answers.hydration === option.value
                        ? "border-[#00FF00] bg-[#00FF00]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-1">{option.label}</h3>
                    <p className="text-white/60 text-sm">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 10: Sleep */}
          {step === 10 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Moon className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Como está o seu sono?</h2>
                <p className="text-white/60">O descanso é fundamental para recuperação</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { value: "ruim", label: "Ruim", desc: "Menos de 6 horas por noite" },
                  { value: "regular", label: "Regular", desc: "6-7 horas por noite" },
                  { value: "bom", label: "Bom", desc: "7-8 horas por noite" },
                  { value: "excelente", label: "Excelente", desc: "Mais de 8 horas por noite" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateAnswer('sleep', option.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      answers.sleep === option.value
                        ? "border-[#00FF00] bg-[#00FF00]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-1">{option.label}</h3>
                    <p className="text-white/60 text-sm">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 11: Main Motivation */}
          {step === 11 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Flame className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Qual é a sua motivação principal?</h2>
                <p className="text-white/60">O que te impulsiona a treinar</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { value: "aparencia", label: "Melhorar aparência", desc: "Quer ficar mais bonito(a)" },
                  { value: "saude", label: "Saúde e bem-estar", desc: "Se sentir melhor fisicamente" },
                  { value: "forca", label: "Ganhar força", desc: "Ficar mais forte e capaz" },
                  { value: "desafio", label: "Superar desafios", desc: "Provar para si mesmo(a)" },
                  { value: "social", label: "Razões sociais", desc: "Pression social ou atividades em grupo" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateAnswer('mainMotivation', option.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      answers.mainMotivation === option.value
                        ? "border-[#00FF00] bg-[#00FF00]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-1">{option.label}</h3>
                    <p className="text-white/60 text-sm">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid() || loading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00FF00]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Processando..."
              ) : step === totalSteps ? (
                <>
                  <Check className="w-5 h-5" />
                  Finalizar Quiz
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}