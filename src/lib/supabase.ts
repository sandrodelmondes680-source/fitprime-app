import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  weight: number | null;
  height: number | null;
  goal: 'hipertrofia' | 'definicao' | 'forca' | 'resistencia' | null;
  notifications_enabled: boolean;
  daily_reminders: boolean;
  private_mode: boolean;
  unit_system: 'metric' | 'imperial';
  created_at: string;
  updated_at: string;
};

export type Workout = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  difficulty: 'iniciante' | 'intermediario' | 'avancado' | null;
  duration_min: number | null;
  exercises_count: number;
  is_template: boolean;
  created_at: string;
  updated_at: string;
};

export type Exercise = {
  id: string;
  workout_id: string;
  name: string;
  sets: number | null;
  reps: number | null;
  weight: number | null;
  rest_seconds: number | null;
  notes: string | null;
  order_index: number | null;
  created_at: string;
};

export type WorkoutSession = {
  id: string;
  user_id: string;
  workout_id: string | null;
  workout_name: string;
  duration_min: number | null;
  calories_burned: number | null;
  completed_at: string;
  notes: string | null;
};

export type Achievement = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  icon: string | null;
  earned_at: string;
};

export type MonthlyProgress = {
  id: string;
  user_id: string;
  month: number;
  year: number;
  workouts_count: number;
  total_calories: number;
  total_duration_min: number;
};
