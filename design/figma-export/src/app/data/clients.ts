export interface Client {
  id: string;
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  objetivo: string;
  photo?: string;
  status: 'active' | 'inactive' | 'irregular';
  assignedRoutineId?: string;
  lastActivity?: string;
  progress: number;
  imc: number;
}

export const clients: Client[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    age: 28,
    weight: 75,
    height: 178,
    objetivo: 'Fuerza',
    status: 'active',
    assignedRoutineId: '1',
    lastActivity: '2026-04-17',
    progress: 80,
    imc: 23.7
  },
  {
    id: '2',
    name: 'María López',
    email: 'maria@example.com',
    age: 25,
    weight: 62,
    height: 165,
    objetivo: 'Definición',
    status: 'inactive',
    assignedRoutineId: '2',
    lastActivity: '2026-04-13',
    progress: 20,
    imc: 22.8
  },
  {
    id: '3',
    name: 'Carlos Ruiz',
    email: 'carlos@example.com',
    age: 35,
    weight: 88,
    height: 182,
    objetivo: 'Volumen',
    status: 'active',
    assignedRoutineId: '2',
    lastActivity: '2026-04-17',
    progress: 65,
    imc: 26.6
  },
  {
    id: '4',
    name: 'Ana García',
    email: 'ana@example.com',
    age: 30,
    weight: 58,
    height: 160,
    objetivo: 'Resistencia',
    status: 'irregular',
    assignedRoutineId: '3',
    lastActivity: '2026-04-15',
    progress: 45,
    imc: 22.7
  },
  {
    id: '5',
    name: 'Luis Martínez',
    email: 'luis@example.com',
    age: 42,
    weight: 92,
    height: 175,
    objetivo: 'Pérdida de peso',
    status: 'active',
    assignedRoutineId: '3',
    lastActivity: '2026-04-17',
    progress: 90,
    imc: 30.0
  }
];

export interface Activity {
  id: string;
  clientId: string;
  clientName: string;
  action: string;
  date: string;
  routineName?: string;
}

export const recentActivities: Activity[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Juan Pérez',
    action: 'completó rutina',
    date: '2026-04-17T10:30:00',
    routineName: 'Pecho y Tríceps'
  },
  {
    id: '2',
    clientId: '5',
    clientName: 'Luis Martínez',
    action: 'inició rutina',
    date: '2026-04-17T09:15:00',
    routineName: 'HIIT Casa'
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Carlos Ruiz',
    action: 'completó rutina',
    date: '2026-04-17T08:00:00',
    routineName: 'Rutina Volumen Piernas'
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Ana García',
    action: 'inició rutina',
    date: '2026-04-15T18:30:00',
    routineName: 'HIIT Casa'
  }
];
