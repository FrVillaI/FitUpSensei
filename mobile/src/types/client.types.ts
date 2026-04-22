export interface ClientProfile {
  nombre: string;
  apellido: string;
  avatar_id: number | null;
  peso_kg: number | null;
  estatura_cm: number | null;
  edad: number | null;
  objetivo: string | null;
}

export interface ClientStats {
  totalWorkouts: number;
  currentStreak: number;
  achievements: number;
}

export interface EditableClientFields {
  peso_kg: number | null;
  estatura_cm: number | null;
  objetivo: string | null;
}
