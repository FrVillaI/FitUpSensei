export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscles: string[];
  image: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Press Banca',
    category: 'fuerza',
    muscles: ['Pecho', 'Tríceps', 'Hombros'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    description: 'Ejercicio fundamental para desarrollar fuerza en el pecho superior e inferior.',
    difficulty: 'intermediate'
  },
  {
    id: '2',
    name: 'Sentadillas',
    category: 'piernas',
    muscles: ['Cuádriceps', 'Glúteos', 'Core'],
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800',
    description: 'El rey de los ejercicios de pierna. Construye fuerza funcional.',
    difficulty: 'intermediate'
  },
  {
    id: '3',
    name: 'Dominadas',
    category: 'espalda',
    muscles: ['Dorsales', 'Bíceps', 'Core'],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800',
    description: 'Ejercicio de peso corporal para desarrollar espalda ancha y fuerte.',
    difficulty: 'advanced'
  },
  {
    id: '4',
    name: 'Peso Muerto',
    category: 'fuerza',
    muscles: ['Espalda Baja', 'Glúteos', 'Isquios'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    description: 'Movimiento completo que trabaja toda la cadena posterior.',
    difficulty: 'advanced'
  },
  {
    id: '5',
    name: 'Press Militar',
    category: 'hombros',
    muscles: ['Hombros', 'Tríceps', 'Core'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800',
    description: 'Desarrolla hombros fuertes y estables con este ejercicio clásico.',
    difficulty: 'intermediate'
  },
  {
    id: '6',
    name: 'Fondos',
    category: 'pecho',
    muscles: ['Pecho', 'Tríceps', 'Hombros'],
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800',
    description: 'Ejercicio de peso corporal versátil para pecho y tríceps.',
    difficulty: 'intermediate'
  },
  {
    id: '7',
    name: 'Plancha',
    category: 'core',
    muscles: ['Abdominales', 'Core', 'Hombros'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
    description: 'Isométrico fundamental para estabilidad del core.',
    difficulty: 'beginner'
  },
  {
    id: '8',
    name: 'Burpees',
    category: 'hiit',
    muscles: ['Todo el cuerpo', 'Cardio'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    description: 'Ejercicio de cuerpo completo que eleva tu ritmo cardíaco.',
    difficulty: 'intermediate'
  },
  {
    id: '9',
    name: 'Curl Bíceps',
    category: 'brazos',
    muscles: ['Bíceps', 'Antebrazos'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800',
    description: 'Aislamiento clásico para desarrollar bíceps fuertes.',
    difficulty: 'beginner'
  },
  {
    id: '10',
    name: 'Zancadas',
    category: 'piernas',
    muscles: ['Cuádriceps', 'Glúteos', 'Equilibrio'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    description: 'Ejercicio unilateral que mejora equilibrio y fuerza de piernas.',
    difficulty: 'beginner'
  },
  {
    id: '11',
    name: 'Remo con Barra',
    category: 'espalda',
    muscles: ['Dorsales', 'Trapecio', 'Bíceps'],
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800',
    description: 'Construye grosor en la espalda con este movimiento compuesto.',
    difficulty: 'intermediate'
  },
  {
    id: '12',
    name: 'Mountain Climbers',
    category: 'hiit',
    muscles: ['Core', 'Cardio', 'Hombros'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    description: 'Ejercicio dinámico que combina cardio y trabajo de core.',
    difficulty: 'intermediate'
  }
];

export const categories = [
  'todos',
  'fuerza',
  'pecho',
  'espalda',
  'piernas',
  'hombros',
  'brazos',
  'core',
  'hiit',
  'casa'
];
