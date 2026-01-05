"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, ArrowRight, Sparkles, Target, Clock, Zap, Heart, Star } from "lucide-react";

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

interface WorkoutPlan {
  userClassification: string;
  strengths: string[];
  weaknesses: string[];
  objectiveInterpretation: string;
  physicalLevel: string;
  restrictions: string;
  timeAvailable: string;
  workoutType: string;
  weeklyFrequency: string;
  split: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: string;
    notes?: string;
  }>;
  motivationalNotes: string[];
  practicalTips: string[];
}

export default function WorkoutAnalysisPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  useEffect(() => {
    const quizAnswers = localStorage.getItem('quizAnswers');
    if (!quizAnswers) {
      router.push('/quiz');
      return;
    }

    const parsedAnswers = JSON.parse(quizAnswers) as QuizAnswers;
    setAnswers(parsedAnswers);

    // Simular análise e geração do treino
    setTimeout(() => {
      const plan = generateWorkoutPlan(parsedAnswers);
      setWorkoutPlan(plan);
      setLoading(false);
    }, 2000);
  }, [router]);

  const generateWorkoutPlan = (answers: QuizAnswers): WorkoutPlan => {
    // Lógica simplificada para gerar treino baseado nas respostas
    const basePlan: WorkoutPlan = {
      userClassification: "",
      strengths: [],
      weaknesses: [],
      objectiveInterpretation: "",
      physicalLevel: "",
      restrictions: "",
      timeAvailable: "",
      workoutType: "",
      weeklyFrequency: "",
      split: "",
      exercises: [],
      motivationalNotes: [],
      practicalTips: []
    };

    // Classificação do usuário
    if (answers.currentConditioning === "sedentario") {
      basePlan.userClassification = "Iniciante";
      basePlan.physicalLevel = "Nível Iniciante";
      basePlan.strengths = ["Disposição para começar", "Potencial de adaptação"];
      basePlan.weaknesses = ["Condicionamento cardiovascular", "Força muscular básica"];
    } else if (answers.currentConditioning === "leve") {
      basePlan.userClassification = "Intermediário";
      basePlan.physicalLevel = "Nível Intermediário";
      basePlan.strengths = ["Base cardiovascular", "Alguma experiência"];
      basePlan.weaknesses = ["Consistência nos treinos"];
    } else {
      basePlan.userClassification = "Avançado";
      basePlan.physicalLevel = "Nível Avançado";
      basePlan.strengths = ["Experiência sólida", "Boa base física"];
      basePlan.weaknesses = ["Pode precisar de variações"];
    }

    // Interpretação dos objetivos
    switch (answers.mainObjective) {
      case "perder_peso":
        basePlan.objectiveInterpretation = "Foco em queima calórica e definição";
        break;
      case "ganhar_massa":
        basePlan.objectiveInterpretation = "Ênfase em hipertrofia muscular";
        break;
      case "definicao":
        basePlan.objectiveInterpretation = "Combinação de força e cardio";
        break;
      default:
        basePlan.objectiveInterpretation = "Melhoria geral da saúde";
    }

    // Restrições e tempo
    basePlan.restrictions = answers.physicalLimitations === "nenhuma" ? "Sem restrições significativas" : `Considerar ${answers.physicalLimitations}`;
    basePlan.timeAvailable = answers.timeAvailable;

    // Tipo de treino
    basePlan.workoutType = answers.timeAvailable === "30min" ? "Casa (sem equipamentos)" : "Academia";

    // Frequência semanal
    const freq = parseInt(answers.currentFrequency.split('-')[0] || answers.currentFrequency);
    basePlan.weeklyFrequency = freq < 3 ? "3-4 dias por semana" : "4-5 dias por semana";

    // Divisão
    basePlan.split = answers.timeAvailable === "30min" ? "Full Body" : "ABC (grupos musculares)";

    // Exercícios baseados no objetivo
    if (answers.mainObjective === "perder_peso") {
      basePlan.exercises = [
        { name: "Agachamento", sets: 3, reps: "12-15", notes: "Com peso corporal" },
        { name: "Flexão de braço", sets: 3, reps: "8-12" },
        { name: "Corrida ou caminhada rápida", sets: 1, reps: "20-30 min" },
        { name: "Abdominal", sets: 3, reps: "15-20" },
        { name: "Polichinelo", sets: 3, reps: "30 seg" }
      ];
    } else if (answers.mainObjective === "ganhar_massa") {
      basePlan.exercises = [
        { name: "Supino reto", sets: 4, reps: "8-10" },
        { name: "Agachamento", sets: 4, reps: "8-10" },
        { name: "Puxada na barra", sets: 4, reps: "8-10" },
        { name: "Desenvolvimento de ombros", sets: 3, reps: "10-12" },
        { name: "Rosca direta", sets: 3, reps: "10-12" }
      ];
    } else {
      basePlan.exercises = [
        { name: "Supino inclinado", sets: 3, reps: "10-12" },
        { name: "Leg press", sets: 3, reps: "12-15" },
        { name: "Remada curvada", sets: 3, reps: "10-12" },
        { name: "Elevação lateral", sets: 3, reps: "12-15" },
        { name: "Abdominal na máquina", sets: 3, reps: "15-20" }
      ];
    }

    // Notas motivacionais
    basePlan.motivationalNotes = [
      "Cada treino é uma vitória sobre você mesmo!",
      "A consistência é a chave do sucesso.",
      "Seu corpo agradece cada esforço.",
      "Você é mais forte do que imagina!"
    ];

    // Dicas práticas
    basePlan.practicalTips = [
      "Mantenha uma alimentação balanceada",
      "Hidrate-se bem antes, durante e após os treinos",
      "Descanse adequadamente entre as sessões",
      "Acompanhe seu progresso semanalmente"
    ];

    return basePlan;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00FF00] to-[#00CC00] rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-[#0D0D0D]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Analisando suas respostas...</h2>
          <p className="text-white/60">Criando seu treino personalizado com IA</p>
        </div>
      </div>
    );
  }

  if (!workoutPlan || !answers) return null;

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
              Seu Treino Personalizado
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-in fade-in duration-500 space-y-8">
          {/* Welcome */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Olá, {answers.name}! 💪
            </h2>
            <p className="text-xl text-white/80">
              Seu treino personalizado está pronto!
            </p>
          </div>

          {/* Analysis Summary */}
          <div className="bg-gradient-to-br from-[#00FF00]/10 to-transparent border border-[#00FF00]/20 rounded-2xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-[#00FF00]" />
              Análise Personalizada
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg mb-3">Sua Classificação</h4>
                <p className="text-[#00FF00] font-semibold text-xl">{workoutPlan.userClassification}</p>
                <p className="text-white/60 mt-2">{workoutPlan.physicalLevel}</p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Objetivo</h4>
                <p className="text-[#00FF00] font-semibold">{workoutPlan.objectiveInterpretation}</p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Pontos Fortes</h4>
                <ul className="text-white/80 space-y-1">
                  {workoutPlan.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#00FF00]" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Áreas de Foco</h4>
                <ul className="text-white/80 space-y-1">
                  {workoutPlan.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#00FF00]" />
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Workout Plan */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Dumbbell className="w-6 h-6 text-[#00FF00]" />
              Seu Treino Base
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Clock className="w-8 h-8 text-[#00FF00] mx-auto mb-2" />
                <p className="font-semibold">{workoutPlan.timeAvailable}</p>
                <p className="text-sm text-white/60">Duração</p>
              </div>

              <div className="text-center">
                <Zap className="w-8 h-8 text-[#00FF00] mx-auto mb-2" />
                <p className="font-semibold">{workoutPlan.weeklyFrequency}</p>
                <p className="text-sm text-white/60">Frequência</p>
              </div>

              <div className="text-center">
                <Target className="w-8 h-8 text-[#00FF00] mx-auto mb-2" />
                <p className="font-semibold">{workoutPlan.split}</p>
                <p className="text-sm text-white/60">Divisão</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold">Exercícios</h4>
              {workoutPlan.exercises.map((exercise, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-lg">{exercise.name}</h5>
                      {exercise.notes && (
                        <p className="text-white/60 text-sm">{exercise.notes}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#00FF00]">{exercise.sets} séries</p>
                      <p className="text-sm text-white/60">{exercise.reps} repetições</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Notes */}
          <div className="bg-gradient-to-br from-[#00FF00]/5 to-transparent border border-[#00FF00]/20 rounded-2xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-[#00FF00]" />
              Mensagens Motivadoras
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {workoutPlan.motivationalNotes.map((note, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-lg font-medium">"{note}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Tips */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold mb-6">Dicas Práticas</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {workoutPlan.practicalTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#00FF00]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#00FF00] font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-white/80">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center pt-8">
            <button
              onClick={() => router.push('/premium')}
              className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-4 px-8 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00FF00]/20 text-lg"
            >
              Continuar
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}