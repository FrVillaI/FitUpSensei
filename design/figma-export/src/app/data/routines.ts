export interface RoutineExercise {
  exerciseId: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: string;
}

export interface Routine {
  id: string;
  name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: RoutineExercise[];
  image?: string;
}

export const routines: Routine[] = [
  {
    id: '1',
    name: 'Pecho y Tríceps',
    difficulty: 'intermediate',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    exercises: [
      { exerciseId: '1', sets: 4, reps: 10, weight: 60 },
      { exerciseId: '6', sets: 3, reps: 12 },
      { exerciseId: '9', sets: 3, reps: 12, weight: 15 }
    ]
  },
  {
    id: '2',
    name: 'Rutina Volumen Piernas',
    difficulty: 'advanced',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800',
    exercises: [
      { exerciseId: '2', sets: 5, reps: 8, weight: 100 },
      { exerciseId: '4', sets: 4, reps: 6, weight: 120 },
      { exerciseId: '10', sets: 3, reps: 12 }
    ]
  },
  {
    id: '3',
    name: 'HIIT Casa',
    difficulty: 'beginner',
    exercises: [
      { exerciseId: '8', sets: 4, reps: 15 },
      { exerciseId: '12', sets: 4, duration: '30s' },
      { exerciseId: '7', sets: 3, duration: '60s' }
    ]
  }
];
