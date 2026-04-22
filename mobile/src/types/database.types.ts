export interface Profile {
  id: string;
  role: 'coach' | 'client';
  nombre: string;
  apellido: string;
  avatar_id: number | null;
  created_at: string;
  updated_at: string | null;
}

export interface Cliente {
  id: string;
  edad: number | null;
  peso_kg: number | null;
  estatura_cm: number | null;
  imc: number | null;
  objetivo: string | null;
  enfermedades: string | null;
  lesiones: string | null;
  condiciones_especiales: string | null;
  horas_sueno_promedio: number | null;
  consume_alcohol: boolean | null;
  consume_tabaco: boolean | null;
  fc_reposo: number | null;
  presion_arterial: string | null;
  coach_id: string | null;
  created_at: string;
}

export interface Entrenador {
  id: string;
  presentacion: string | null;
  ejercicio_favorito: string | null;
  puntuacion: number | null;
  created_at: string;
}

export interface Ejercicio {
  id: string;
  nombre: string;
  categoria: string | null;
  musculos_implicados: string[] | null;
  descripcion: string | null;
  foto_url: string | null;
  video_youtube_id: string | null;
  es_global: boolean;
  creado_por: string | null;
  created_at: string;
}

export interface Rutina {
  id: string;
  coach_id: string;
  nombre: string;
  descripcion: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface RutinaEjercicio {
  id: string;
  rutina_id: string;
  ejercicio_id: string;
  orden: number;
  series: number | null;
  repeticiones: number | null;
  peso_objetivo_kg: number | null;
  tiempo_descanso_seg: number | null;
  notas: string | null;
}

export interface RutinaAsignada {
  id: string;
  rutina_id: string;
  cliente_id: string;
  fecha_asignacion: string | null;
  activa: boolean;
  created_at: string;
}

export interface Sesion {
  id: string;
  cliente_id: string;
  rutina_id: string;
  fecha: string;
  completada: boolean;
  duracion_min: number | null;
  created_at: string;
}

export interface SesionEjercicio {
  id: string;
  sesion_id: string;
  rutina_ejercicio_id: string;
  serie_numero: number | null;
  repeticiones_realizadas: number | null;
  peso_realizado_kg: number | null;
  rpe: number | null;
  completado: boolean;
  notas_cliente: string | null;
  created_at: string;
}
