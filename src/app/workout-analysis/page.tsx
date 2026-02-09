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
    // ========================================
    // PERSONALIZAÇÃO AVANÇADA DO TREINO
    // ========================================

    // 1. NOME DO TREINO - Baseado em objetivo, tempo e nível
    const objectiveNames: Record<string, string> = {
      perder_peso: "Emagrecimento Acelerado",
      ganhar_massa: "Construção Muscular",
      definicao: "Definição e Tonificação",
      saude: "Saúde e Bem-Estar",
    };

    const timeLabel = answers.timeAvailable === "30min" ? "30 min" :
                     answers.timeAvailable === "45-60min" ? "60 min" : "Intensivo";

    const trainingType = `Projeto ${objectiveNames[answers.mainObjective] || "Transformação"} - ${timeLabel}`;

    // 2. FREQUÊNCIA SEMANAL - Baseada em condicionamento E frequência atual
    let weeklyFrequency = "";
    const conditioning = answers.currentConditioning;
    const currentFreq = answers.currentFrequency;

    // Lógica inteligente: não aumentar muito de uma vez
    if (conditioning === "sedentario" || currentFreq === "0") {
      weeklyFrequency = "3x por semana (Segunda, Quarta, Sexta)";
    } else if (conditioning === "leve" || currentFreq === "1-2") {
      weeklyFrequency = "4x por semana (Segunda, Terça, Quinta, Sexta)";
    } else if (conditioning === "moderado" || currentFreq === "3-4") {
      weeklyFrequency = "5x por semana (Segunda a Sexta)";
    } else {
      weeklyFrequency = "6x por semana (Segunda a Sábado)";
    }

    // 3. DIVISÃO DE TREINO - Baseada em tempo disponível, condicionamento E objetivo
    let trainingDivision = "";

    if (answers.timeAvailable === "30min") {
      // Treinos curtos = Full Body sempre
      trainingDivision = "Full Body - Corpo inteiro em cada sessão";
    } else if (conditioning === "sedentario" || conditioning === "leve") {
      // Iniciantes = Full Body ou Upper/Lower
      if (answers.mainObjective === "perder_peso") {
        trainingDivision = "Full Body com Cardio - Máxima queima calórica";
      } else {
        trainingDivision = "Full Body - Corpo inteiro 3x/semana";
      }
    } else if (conditioning === "moderado") {
      // Intermediários = A/B ou ABC conforme objetivo
      if (answers.mainObjective === "ganhar_massa") {
        trainingDivision = "Divisão ABC - Push/Pull/Legs";
      } else {
        trainingDivision = "Divisão A/B - Superior/Inferior";
      }
    } else {
      // Avançados = ABC ou especializada
      if (answers.mainObjective === "ganhar_massa") {
        trainingDivision = "Divisão ABC Avançada - Foco hipertrofia";
      } else if (answers.mainObjective === "definicao") {
        trainingDivision = "Divisão ABC - Volume alto, descanso curto";
      } else {
        trainingDivision = "Divisão ABCD - Alta frequência";
      }
    }

    // 4. EXERCÍCIOS ALTAMENTE PERSONALIZADOS
    let exercises: Array<{ name: string; sets: string; reps: string; rest: string }> = [];

    // Determinar nível de intensidade baseado em condicionamento e idade
    const age = answers.age;
    const isYoung = age === "18-25" || age === "26-35";
    const needsCare = answers.physicalLimitations !== "nenhuma" || age === "46+";
    const isAdvanced = conditioning === "moderado" || conditioning === "ativo";

    // PERDER PESO - Foco em cardio, alta intensidade, descanso curto
    if (answers.mainObjective === "perder_peso") {
      if (needsCare || conditioning === "sedentario") {
        // Versão adaptada para iniciantes/limitações
        exercises = [
          { name: "Caminhada rápida ou polichinelos leves", sets: "3", reps: "2-3 min", rest: "60s" },
          { name: "Agachamento sem peso", sets: "3", reps: "12-15", rest: "45s" },
          { name: "Flexão de parede ou joelhos", sets: "3", reps: "8-12", rest: "45s" },
          { name: "Prancha isométrica", sets: "3", reps: "20-30s", rest: "45s" },
          { name: "Mountain Climbers moderado", sets: "3", reps: "15-20", rest: "60s" },
        ];
      } else if (answers.timeAvailable === "30min") {
        // Versão curta e intensa
        exercises = [
          { name: "Burpees", sets: "4", reps: "10-12", rest: "30s" },
          { name: "Agachamento com salto", sets: "4", reps: "12-15", rest: "30s" },
          { name: "Mountain Climbers", sets: "4", reps: "25-30", rest: "30s" },
          { name: "Jump Jacks", sets: "3", reps: "40-50", rest: "30s" },
        ];
      } else {
        // Versão completa para intermediário/avançado
        exercises = [
          { name: "HIIT - Burpees", sets: "4", reps: "12-15", rest: "45s" },
          { name: "Agachamento com salto", sets: "4", reps: "15-20", rest: "45s" },
          { name: "Mountain Climbers", sets: "4", reps: "30-40", rest: "45s" },
          { name: "Prancha alta com toque no ombro", sets: "3", reps: "20-24", rest: "45s" },
          { name: "Jump Lunges (afundo com salto)", sets: "3", reps: "10-12 cada", rest: "60s" },
          { name: "Polichinelos", sets: "3", reps: "40-60", rest: "30s" },
        ];
      }
    }

    // GANHAR MASSA - Foco em peso, baixas reps, descanso longo
    else if (answers.mainObjective === "ganhar_massa") {
      if (needsCare || !isAdvanced) {
        // Versão iniciante/cuidado
        exercises = [
          { name: "Agachamento livre ou goblet", sets: "3", reps: "10-12", rest: "90s" },
          { name: "Flexão de braço (adaptada se necessário)", sets: "3", reps: "8-12", rest: "90s" },
          { name: "Remada com halteres", sets: "3", reps: "10-12", rest: "75s" },
          { name: "Desenvolvimento com halteres", sets: "3", reps: "10-12", rest: "75s" },
          { name: "Rosca direta", sets: "3", reps: "10-12", rest: "60s" },
        ];
      } else if (answers.timeAvailable === "30min") {
        // Versão curta focada em compostos
        exercises = [
          { name: "Agachamento livre (pesado)", sets: "4", reps: "6-8", rest: "120s" },
          { name: "Supino reto", sets: "4", reps: "6-8", rest: "120s" },
          { name: "Remada curvada", sets: "3", reps: "8-10", rest: "90s" },
          { name: "Desenvolvimento militar", sets: "3", reps: "8-10", rest: "90s" },
        ];
      } else {
        // Versão completa para hipertrofia
        exercises = [
          { name: "Agachamento livre", sets: "4", reps: "8-10", rest: "120s" },
          { name: "Supino reto", sets: "4", reps: "8-10", rest: "120s" },
          { name: "Levantamento terra", sets: "4", reps: "6-8", rest: "150s" },
          { name: "Remada curvada", sets: "4", reps: "8-10", rest: "90s" },
          { name: "Desenvolvimento militar", sets: "3", reps: "10-12", rest: "90s" },
          { name: "Rosca direta", sets: "3", reps: "10-12", rest: "60s" },
          { name: "Tríceps testa", sets: "3", reps: "10-12", rest: "60s" },
        ];
      }
    }

    // DEFINIÇÃO - Foco em volume, reps médias/altas, descanso médio
    else if (answers.mainObjective === "definicao") {
      if (needsCare || conditioning === "sedentario") {
        // Versão adaptada
        exercises = [
          { name: "Agachamento sem peso", sets: "3", reps: "15-20", rest: "45s" },
          { name: "Flexão de joelhos", sets: "3", reps: "12-15", rest: "45s" },
          { name: "Prancha", sets: "3", reps: "30-40s", rest: "45s" },
          { name: "Afundo alternado", sets: "3", reps: "12-15 cada", rest: "60s" },
          { name: "Abdominal crunch", sets: "3", reps: "20-25", rest: "45s" },
        ];
      } else if (answers.timeAvailable === "30min") {
        // Versão curta com superset
        exercises = [
          { name: "Flexão + Agachamento (superset)", sets: "4", reps: "12-15", rest: "45s" },
          { name: "Prancha lateral", sets: "3", reps: "30-45s cada", rest: "45s" },
          { name: "Afundo + Abdominal (superset)", sets: "3", reps: "15-20", rest: "60s" },
          { name: "Mountain Climbers", sets: "3", reps: "25-30", rest: "45s" },
        ];
      } else {
        // Versão completa com volume
        exercises = [
          { name: "Flexão de braço", sets: "4", reps: "12-15", rest: "60s" },
          { name: "Agachamento", sets: "4", reps: "15-20", rest: "60s" },
          { name: "Prancha lateral alternada", sets: "3", reps: "40s cada", rest: "45s" },
          { name: "Afundo com salto", sets: "3", reps: "12-15 cada", rest: "60s" },
          { name: "Abdominal bicicleta", sets: "3", reps: "25-30", rest: "45s" },
          { name: "Polichinelos", sets: "3", reps: "40-50", rest: "45s" },
        ];
      }
    }

    // SAÚDE GERAL - Foco em funcional, mobilidade, baixo impacto
    else {
      if (needsCare || conditioning === "sedentario") {
        // Versão muito adaptada
        exercises = [
          { name: "Caminhada leve", sets: "1", reps: "15-20 min", rest: "-" },
          { name: "Agachamento na cadeira (sentar e levantar)", sets: "3", reps: "10-12", rest: "60s" },
          { name: "Flexão de parede", sets: "3", reps: "10-15", rest: "60s" },
          { name: "Prancha nos joelhos", sets: "3", reps: "20-30s", rest: "45s" },
          { name: "Alongamento completo", sets: "1", reps: "10 min", rest: "-" },
        ];
      } else {
        // Versão geral balanceada
        exercises = [
          { name: "Caminhada rápida ou trote leve", sets: "1", reps: "20-30 min", rest: "-" },
          { name: "Agachamento", sets: "3", reps: "12-15", rest: "60s" },
          { name: "Flexão (adaptada conforme nível)", sets: "3", reps: "10-15", rest: "60s" },
          { name: "Prancha", sets: "3", reps: "30-45s", rest: "45s" },
          { name: "Ponte de glúteos", sets: "3", reps: "15-20", rest: "45s" },
          { name: "Alongamento e mobilidade", sets: "1", reps: "10 min", rest: "-" },
        ];
      }
    }

    // 5. NOTAS MOTIVADORAS PERSONALIZADAS - Baseadas em motivação e objetivo
    const motivationalNotes: string[] = [];

    motivationalNotes.push(`${answers.name}, você está no caminho certo para alcançar seu objetivo! 💪`);

    // Mensagem baseada na motivação
    if (answers.mainMotivation === "aparencia") {
      motivationalNotes.push("Cada treino te aproxima da melhor versão de você mesmo!");
    } else if (answers.mainMotivation === "saude") {
      motivationalNotes.push("Você está investindo no bem mais precioso: sua saúde!");
    } else if (answers.mainMotivation === "forca") {
      motivationalNotes.push("A força que você busca já existe dentro de você - só precisa ser despertada!");
    } else if (answers.mainMotivation === "desafio") {
      motivationalNotes.push("Você é capaz de superar qualquer desafio que aparecer no seu caminho!");
    } else {
      motivationalNotes.push("Treinar em grupo ou sozinho, o importante é dar o primeiro passo!");
    }

    // Mensagem baseada no objetivo
    if (answers.mainObjective === "perder_peso") {
      motivationalNotes.push("A perda de peso acontece com consistência e paciência - você vai conseguir!");
    } else if (answers.mainObjective === "ganhar_massa") {
      motivationalNotes.push("Músculo não cresce na academia, mas sim durante o descanso e com boa alimentação!");
    } else if (answers.mainObjective === "definicao") {
      motivationalNotes.push("Definição é resultado de treino + alimentação equilibrada. Você está no caminho certo!");
    }

    motivationalNotes.push("Lembre-se: a consistência sempre vence a intensidade!");

    // 6. DICAS PRÁTICAS PERSONALIZADAS - Baseadas em respostas do quiz
    const practicalTips: string[] = [];

    // Dicas gerais
    practicalTips.push("Aqueça sempre antes de começar (5-10 minutos de cardio leve)");

    // Baseado em limitações
    if (answers.physicalLimitations === "nenhuma") {
      practicalTips.push("Sem limitações: aproveite para aumentar a intensidade progressivamente");
    } else if (answers.physicalLimitations === "leve") {
      practicalTips.push("Com limitações leves: escute seu corpo e adapte exercícios se sentir desconforto");
    } else {
      practicalTips.push("Com limitações: consulte um profissional antes de iniciar e evite movimentos bruscos");
    }

    // Baseado em hidratação
    if (answers.hydration === "ruim" || answers.hydration === "regular") {
      practicalTips.push("IMPORTANTE: Aumente sua hidratação! Beba pelo menos 2-3L de água por dia");
    } else {
      practicalTips.push("Mantenha a boa hidratação antes, durante e após o treino");
    }

    // Baseado em sono
    if (answers.sleep === "ruim" || answers.sleep === "regular") {
      practicalTips.push("Seu sono precisa melhorar! Tente dormir 7-8h por noite para melhor recuperação");
    } else {
      practicalTips.push("Continue priorizando seu sono - ele é fundamental para resultados");
    }

    // Baseado em alimentação
    if (answers.nutrition === "ruim" || answers.nutrition === "regular") {
      practicalTips.push("Nutrição é 70% do resultado! Priorize proteínas, vegetais e carboidratos de qualidade");
    }

    // Dica sobre progressão
    practicalTips.push("Aumente cargas, repetições ou séries a cada 2-3 semanas (progressão gradual)");

    // Dica sobre descanso
    if (conditioning === "sedentario" || conditioning === "leve") {
      practicalTips.push("Descanse entre os treinos! Seu corpo precisa de tempo para se adaptar");
    } else {
      practicalTips.push("Respeite os dias de descanso - overtraining atrapalha os resultados");
    }

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
              <h2 className="text-4xl font-bold mb-3">{workout?.trainingType}</h2>
              <p className="text-white/60 text-lg">Treino Base Personalizado - Criado especialmente para você</p>
            </div>

            {/* Box de destaque - Treino Personalizado */}
            <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00CC00]/5 border-2 border-[#00FF00]/30 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <Sparkles className="w-8 h-8 text-[#00FF00] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#00FF00]">Treino Base Personalizado</h3>
                  <p className="text-white/80 leading-relaxed">
                    Este é seu <strong>treino base</strong> criado com base em: sua idade ({(() => {
                      const answersStr = localStorage.getItem('quizAnswers');
                      if (answersStr) {
                        const answers = JSON.parse(answersStr);
                        return answers.age;
                      }
                      return '';
                    })()} anos), tempo disponível ({(() => {
                      const answersStr = localStorage.getItem('quizAnswers');
                      if (answersStr) {
                        const answers = JSON.parse(answersStr);
                        return answers.timeAvailable;
                      }
                      return '';
                    })()}), seu nível atual de condicionamento, objetivo principal, limitações físicas e motivação.
                    Não é genérico - foi feito especialmente para <strong>você</strong>!
                  </p>
                </div>
              </div>
            </div>

            {/* Informações do Treino */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#00FF00]/30 transition-colors">
                <Calendar className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
                <h3 className="font-bold mb-2">Frequência Recomendada</h3>
                <p className="text-white/80 text-sm">{workout?.weeklyFrequency}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#00FF00]/30 transition-colors">
                <TrendingUp className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
                <h3 className="font-bold mb-2">Divisão do Treino</h3>
                <p className="text-white/80 text-sm">{workout?.trainingDivision}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#00FF00]/30 transition-colors">
                <Clock className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
                <h3 className="font-bold mb-2">Duração por Sessão</h3>
                <p className="text-white/80 text-sm">{(() => {
                  const answersStr = localStorage.getItem('quizAnswers');
                  if (answersStr) {
                    const answers = JSON.parse(answersStr);
                    return answers.timeAvailable === "30min" ? "30 minutos" :
                           answers.timeAvailable === "45-60min" ? "45-60 minutos" : "Mais de 60 minutos";
                  }
                  return 'Variável';
                })()}</p>
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
