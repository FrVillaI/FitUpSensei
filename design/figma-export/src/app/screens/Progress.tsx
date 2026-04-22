import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export function Progress() {
  const stats = {
    peso: [
      { date: '15 Mar', value: 78 },
      { date: '22 Mar', value: 77 },
      { date: '29 Mar', value: 76.5 },
      { date: '5 Abr', value: 75.8 },
      { date: '12 Abr', value: 75 }
    ],
    imc: [
      { date: '15 Mar', value: 24.5 },
      { date: '22 Mar', value: 24.2 },
      { date: '29 Mar', value: 24.0 },
      { date: '5 Abr', value: 23.7 },
      { date: '12 Abr', value: 23.4 }
    ]
  };

  const recentWorkouts = [
    { date: '16 Abr', routine: 'Pecho y Tríceps', duration: '45 min' },
    { date: '14 Abr', routine: 'HIIT Casa', duration: '30 min' },
    { date: '12 Abr', routine: 'Rutina Volumen Piernas', duration: '55 min' }
  ];

  return (
    <div className="min-h-screen px-6 pt-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Progreso
        </h1>
        <p className="text-muted-foreground">Sigue tu evolución</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="text-green-600" size={20} />
            <span className="text-sm text-muted-foreground">Peso</span>
          </div>
          <div className="text-3xl font-bold mb-1">75 kg</div>
          <div className="text-sm text-green-600">-3 kg este mes</div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-accent" size={20} />
            <span className="text-sm text-muted-foreground">IMC</span>
          </div>
          <div className="text-3xl font-bold mb-1">23.4</div>
          <div className="text-sm text-muted-foreground">Saludable</div>
        </div>
      </motion.div>

      {/* Weight Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-6 shadow-sm mb-8"
      >
        <h3 className="text-lg font-medium mb-6">Evolución de peso</h3>
        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 300 150">
            <defs>
              <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * 37.5}
                x2="300"
                y2={i * 37.5}
                stroke="var(--border)"
                strokeWidth="1"
              />
            ))}

            {/* Area */}
            <path
              d="M 0 75 L 75 50 L 150 37.5 L 225 25 L 300 12.5 L 300 150 L 0 150 Z"
              fill="url(#weightGradient)"
            />

            {/* Line */}
            <path
              d="M 0 75 L 75 50 L 150 37.5 L 225 25 L 300 12.5"
              stroke="var(--accent)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Points */}
            {stats.peso.map((point, i) => (
              <circle
                key={i}
                cx={i * 75}
                cy={150 - (point.value - 73) * 25}
                r="5"
                fill="var(--accent)"
                className="drop-shadow-lg"
              />
            ))}
          </svg>

          {/* Labels */}
          <div className="flex justify-between mt-4 text-xs text-muted-foreground">
            {stats.peso.map((point, i) => (
              <span key={i}>{point.date}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Workouts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-medium mb-4">Entrenamientos recientes</h3>
        <div className="space-y-3">
          {recentWorkouts.map((workout, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-4 shadow-sm flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Calendar size={18} className="text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{workout.routine}</h4>
                <p className="text-sm text-muted-foreground">
                  {workout.date} • {workout.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
