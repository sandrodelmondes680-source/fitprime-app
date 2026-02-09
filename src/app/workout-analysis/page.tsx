"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Dumbbell, 
  TrendingUp, 
  Target, 
  AlertCircle, 
  Clock, 
  Calendar,
  CheckCircle,
  Zap,
  Award,
  ArrowRight,
  Sparkles
} from "lucide-react";

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

interface UserProfile {
  classification: string;
  strengths: string[];
  weaknesses: string[];
  mainObjective: string;
  physicalLevel: string;
  physicalRestrictions: string;
  availableTime: string;
}

interface WorkoutPlan {
  trainingType: string;
  weeklyFrequency: string;
  trainingDivision: string;
  exercises: Array<{
    name: string;
    sets: string;
    reps: string;
    rest: string;
  }>;
  motivationalNotes: string[];
  practicalTips: string[];
}

export default function WorkoutAnalysisPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const [showWorkout, setShowWorkout] = useState(false);

  useEffect(() => {
    analyzeQuizAndGenerateWorkout();
  }, []);

  const analyzeQuizAndGenerateWorkout = () => {
    // Recuperar respostas do quiz
    const answersStr = localStorage.getItem('quizAnswers');
    if (!answersStr) {
      router.push('/');
      return;
    }

    const answers: QuizAnswers = JSON.parse(answersStr);

    // Gerar perfil do usuário
    const userProfile = generateUserProfile(answers);
    setProfile(userProfile);

    // Gerar treino personalizado
    const workoutPlan = generateWorkoutPlan(answers, userProfile);
    setWorkout(workoutPlan);

    // Simular tempo de análise
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const generateUserProfile = (answers: QuizAnswers): UserProfile => {
    // Classificação do usuário
    let classification = "";
    if (answers.currentConditioning === "sedentario") {
      classification = "Iniciante - Foco em criar hábitos";
    } else if (answers.currentConditioning === "leve") {
      classification = "Iniciante Ativo - Pronto para evoluir";
    } else if (answers.currentConditioning === "moderado") {
      classification = "Intermediário - Construindo base sólida";
    } else {
      classification = "Avançado - Otimizando performance";
    }

    // Pontos fortes
    const strengths: string[] = [];
    if (answers.nutrition === "boa" || answers.nutrition === "excelente") {
      strengths.push("Alimentação equilibrada");
    }
    if (answers.hydration === "boa" || answers.hydration === "excelente") {
      strengths.push("Boa hidratação");
    }
    if (answers.sleep === "bom" || answers.sleep === "excelente") {
      strengths.push("Sono adequado");
    }
    if (answers.currentFrequency !== "0") {
      strengths.push("Já possui rotina de treinos");
    }
    if (answers.physicalLimitations === "nenhuma") {
      strengths.push("Sem limitações físicas");
    }
    if (strengths.length === 0) {
      strengths.push("Motivação para começar");
    }

    // Pontos fracos
    const weaknesses: string[] = [];
    if (answers.nutrition === "ruim" || answers.nutrition === "regular") {
      weaknesses.push("Alimentação precisa melhorar");
    }
    if (answers.hydration === "ruim" || answers.hydration === "regular") {
      weaknesses.push("Hidratação insuficiente");
    }
    if (answers.sleep === "ruim" || answers.sleep === "regular") {
      weaknesses.push("Sono inadequado");
    }
    if (answers.currentFrequency === "0") {
      weaknesses.push("Falta de rotina de exercícios");
    }
    if (answers.physicalLimitations !== "nenhuma") {
      weaknesses.push("Possui limitações físicas");
    }
    if (weaknesses.length === 0) {
      weaknesses.push("Nenhum ponto fraco identificado");
    }

    // Objetivo principal interpretado
    let mainObjective = "";
    switch (answers.mainObjective) {
      case "perder_peso":
        mainObjective = "Emagrecimento e queima de gordura";
        break;
      case "ganhar_massa":
        mainObjective = "Hipertrofia e ganho de massa muscular";
        break;
      case "definicao":
        mainObjective = "Definição muscular e tonificação";
        break;
      case "saude":
        mainObjective = "Saúde geral e qualidade de vida";
        break;
      default:
        mainObjective = "Melhoria geral do condicionamento";
    }

    // Nível físico
    let physicalLevel = "";
    switch (answers.currentConditioning) {
      case "sedentario":
        physicalLevel = "Sedentário - Começando do zero";
        break;
      case "leve":
        physicalLevel = "Iniciante - Atividade física leve";
        break;
      case "moderado":
        physicalLevel = "Intermediário - Treinos regulares";
        break;
      case "ativo":
        physicalLevel = "Avançado - Muito ativo";
        break;
      default:
        physicalLevel = "A definir";
    }

    // Restrições físicas
    let physicalRestrictions = "";
    switch (answers.physicalLimitations) {
      case "nenhuma":
        physicalRestrictions = "Nenhuma restrição identificada";
        break;
      case "leve":
        physicalRestrictions = "Limitações leves - Exercícios adaptados";
        break;
      case "moderada":
        physicalRestrictions = "Limitações moderadas - Cuidado especial";
        break;
      case "grave":
        physicalRestrictions = "Limitações graves - Acompanhamento necessário";
        break;
      default:
        physicalRestrictions = "A avaliar";
    }

    return {
      classification,
      strengths,
      weaknesses,
      mainObjective,
      physicalLevel,
      physicalRestrictions,
      availableTime: answers.timeAvailable,
    };
  };

  const generateWorkoutPlan = (answers: QuizAnswers, profile: UserProfile): WorkoutPlan => {
    // Tipo de treino (casa ou academia)
    let trainingType = "";
    if (answers.timeAvailable === "30min") {
      trainingType = "Treino em Casa - Rápido e eficiente";
    } else if (answers.currentConditioning === "sedentario" || answers.currentConditioning === "leve") {
      trainingType = "Treino em Casa ou Academia - Flexível";
    } else {
      trainingType = "Academia - Equipamentos completos";
    }

    // Frequência semanal
    let weeklyFrequency = "";
    if (answers.currentConditioning === "sedentario") {
      weeklyFrequency = "3x por semana (Segunda, Quarta, Sexta)";
    } else if (answers.currentConditioning === "leve") {
      weeklyFrequency = "4x por semana (Segunda, Terça, Quinta, Sexta)";
    } else if (answers.currentConditioning === "moderado") {
      weeklyFrequency = "5x por semana (Segunda a Sexta)";
    } else {
      weeklyFrequency = "6x por semana (Segunda a Sábado)";
    }

    // Divisão de treino
    let trainingDivision = "";
    if (answers.currentConditioning === "sedentario" || answers.currentConditioning === "leve") {
      trainingDivision = "Full Body - Corpo inteiro em cada treino";
    } else if (answers.currentConditioning === "moderado") {
      trainingDivision = "Divisão A/B - Superiores e Inferiores alternados";
    } else {
      trainingDivision = "Divisão ABC - Peito/Costas, Pernas, Ombros/Braços";
    }

    // Exercícios personalizados
    let exercises: Array<{ name: string; sets: string; reps: string; rest: string }> = [];

    if (answers.mainObjective === "perder_peso") {
      exercises = [
        { name: "Burpees", sets: "3", reps: "10-15", rest: "45s" },
        { name: "Mountain Climbers", sets: "3", reps: "20-30", rest: "45s" },
        { name: "Agachamento com salto", sets: "3", reps: "12-15", rest: "60s" },
        { name: "Prancha", sets: "3", reps: "30-45s", rest: "45s" },
        { name: "Polichinelos", sets: "3", reps: "30-40", rest: "30s" },
      ];
    } else if (answers.mainObjective === "ganhar_massa") {
      exercises = [
        { name: "Supino reto", sets: "4", reps: "8-12", rest: "90s" },
        { name: "Agachamento livre", sets: "4", reps: "8-12", rest: "90s" },
        { name: "Remada curvada", sets: "4", reps: "8-12", rest: "90s" },
        { name: "Desenvolvimento militar", sets: "3", reps: "10-12", rest: "75s" },
        { name: "Rosca direta", sets: "3", reps: "10-12", rest: "60s" },
      ];
    } else if (answers.mainObjective === "definicao") {
      exercises = [
        { name: "Flexão de braço", sets: "3", reps: "12-15", rest: "60s" },
        { name: "Agachamento", sets: "3", reps: "15-20", rest: "60s" },
        { name: "Prancha lateral", sets: "3", reps: "30s cada", rest: "45s" },
        { name: "Afundo", sets: "3", reps: "12-15 cada", rest: "60s" },
        { name: "Abdominal bicicleta", sets: "3", reps: "20-25", rest: "45s" },
      ];
    } else {
      exercises = [
        { name: "Caminhada rápida", sets: "1", reps: "20-30min", rest: "-" },
        { name: "Agachamento", sets: "3", reps: "10-15", rest: "60s" },
        { name: "Flexão (joelhos se necessário)", sets: "3", reps: "8-12", rest: "60s" },
        { name: "Prancha", sets: "3", reps: "20-30s", rest: "45s" },
        { name: "Alongamento completo", sets: "1", reps: "10min", rest: "-" },
      ];
    }

    // Notas motivadoras
    const motivationalNotes = [
      `${answers.name}, você está no caminho certo! 💪`,
      "Cada treino é um passo em direção ao seu objetivo",
      "A consistência é mais importante que a perfeição",
      "Seu corpo é capaz de coisas incríveis - acredite!",
    ];

    // Dicas práticas
    const practicalTips = [
      "Aqueça sempre antes de começar (5-10 minutos)",
      "Mantenha a postura correta em todos os exercícios",
      "Beba água antes, durante e depois do treino",
      "Respeite os dias de descanso - eles são essenciais",
      "Aumente a intensidade gradualmente, sem pressa",
    ];

    return {
      trainingType,
      weeklyFrequency,
      trainingDivision,
      exercises,
      motivationalNotes,
      practicalTips,
    };
  };

  const handleContinue = () => {
    if (!showWorkout) {
      setShowWorkout(true);
    } else {
      // Salvar perfil e treino no localStorage
      localStorage.setItem('userProfile', JSON.stringify(profile));
      localStorage.setItem('workoutPlan', JSON.stringify(workout));
      
      // Redirecionar para tela de pagamento premium
      router.push('/premium');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[#00FF00]/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#00FF00] border-t-transparent rounded-full animate-spin"></div>
            <Sparkles className="absolute inset-0 m-auto w-12 h-12 text-[#00FF00]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Analisando suas respostas...</h2>
          <p className="text-white/60">Gerando seu treino personalizado 🔥</p>
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
            <div className="w-10 h-10 bg-gradient-to-br from-[#00FF00] to-[#00CC00] rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-[#0D0D0D]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Fit<span className="text-[#00FF00]">Prime</span>
            </h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {!showWorkout ? (
          // Análise do Perfil
          <div className="animate-in fade-in duration-700">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00FF00]/10 rounded-full mb-6">
                <Award className="w-10 h-10 text-[#00FF00]" />
              </div>
              <h2 className="text-4xl font-bold mb-3">Seu Perfil Personalizado</h2>
              <p className="text-white/60 text-lg">Análise completa baseada nas suas respostas</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Classificação */}
              <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/5 border border-[#00FF00]/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-[#00FF00]" />
                  <h3 className="text-xl font-bold">Classificação</h3>
                </div>
                <p className="text-lg text-white/90">{profile?.classification}</p>
              </div>

              {/* Objetivo Principal */}
              <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/5 border border-[#00FF00]/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-[#00FF00]" />
                  <h3 className="text-xl font-bold">Objetivo Principal</h3>
                </div>
                <p className="text-lg text-white/90">{profile?.mainObjective}</p>
              </div>

              {/* Nível Físico */}
              <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/5 border border-[#00FF00]/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-[#00FF00]" />
                  <h3 className="text-xl font-bold">Nível Físico</h3>
                </div>
                <p className="text-lg text-white/90">{profile?.physicalLevel}</p>
              </div>

              {/* Tempo Disponível */}
              <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/5 border border-[#00FF00]/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-[#00FF00]" />
                  <h3 className="text-xl font-bold">Tempo Disponível</h3>
                </div>
                <p className="text-lg text-white/90">{profile?.availableTime} por treino</p>
              </div>
            </div>

            {/* Pontos Fortes e Fracos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Pontos Fortes */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-[#00FF00]" />
                  <h3 className="text-xl font-bold">Pontos Fortes</h3>
                </div>
                <ul className="space-y-2">
                  {profile?.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/80">
                      <span className="text-[#00FF00] mt-1">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pontos Fracos */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-bold">Pontos a Melhorar</h3>
                </div>
                <ul className="space-y-2">
                  {profile?.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/80">
                      <span className="text-orange-400 mt-1">!</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Restrições Físicas */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-[#00FF00]" />
                <h3 className="text-xl font-bold">Restrições Físicas</h3>
              </div>
              <p className="text-lg text-white/80">{profile?.physicalRestrictions}</p>
            </div>

            {/* Botão Continuar */}
            <div className="text-center">
              <button
                onClick={handleContinue}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] text-lg font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00FF00]/30"
              >
                Ver Meu Treino Personalizado
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          // Treino Personalizado
          <div className="animate-in fade-in duration-700">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00FF00]/10 rounded-full mb-6">
                <Dumbbell className="w-10 h-10 text-[#00FF00]" />
              </div>
              <h2 className="text-4xl font-bold mb-3">Seu Treino Base</h2>
              <p className="text-white/60 text-lg">Treino 100% personalizado para você</p>
            </div>

            {/* Informações do Treino */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/5 border border-[#00FF00]/20 rounded-2xl p-6 text-center">
                <Target className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
                <h3 className="font-bold mb-2">Tipo de Treino</h3>
                <p className="text-white/80 text-sm">{workout?.trainingType}</p>
              </div>

              <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/5 border border-[#00FF00]/20 rounded-2xl p-6 text-center">
                <Calendar className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
                <h3 className="font-bold mb-2">Frequência</h3>
                <p className="text-white/80 text-sm">{workout?.weeklyFrequency}</p>
              </div>

              <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/5 border border-[#00FF00]/20 rounded-2xl p-6 text-center">
                <TrendingUp className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
                <h3 className="font-bold mb-2">Divisão</h3>
                <p className="text-white/80 text-sm">{workout?.trainingDivision}</p>
              </div>
            </div>

            {/* Exercícios */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-[#00FF00]" />
                Exercícios
              </h3>
              <div className="space-y-4">
                {workout?.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#00FF00]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">{exercise.name}</h4>
                      <span className="text-[#00FF00] text-sm font-medium">#{index + 1}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Séries:</span>
                        <span className="ml-2 text-white font-medium">{exercise.sets}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Repetições:</span>
                        <span className="ml-2 text-white font-medium">{exercise.reps}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Descanso:</span>
                        <span className="ml-2 text-white font-medium">{exercise.rest}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notas Motivadoras */}
            <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/5 border border-[#00FF00]/20 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#00FF00]" />
                Mensagens Motivadoras
              </h3>
              <ul className="space-y-2">
                {workout?.motivationalNotes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/80">
                    <span className="text-[#00FF00] mt-1">💪</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dicas Práticas */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#00FF00]" />
                Dicas Práticas
              </h3>
              <ul className="space-y-2">
                {workout?.practicalTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/80">
                    <span className="text-[#00FF00] mt-1">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botão Continuar */}
            <div className="text-center">
              <button
                onClick={handleContinue}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] text-lg font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00FF00]/30"
              >
                Continuar
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
