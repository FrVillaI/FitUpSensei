import { motion } from 'motion/react';
import { User, Target, TrendingUp, Award } from 'lucide-react';

export function Profile() {
  const userStats = {
    name: 'Isaac',
    peso: 75,
    altura: 178,
    edad: 28,
    objetivo: 'Definición',
    totalWorkouts: 42,
    currentStreak: 7,
    achievements: 12
  };

  const moods = [
    { id: 'fuerza', label: 'Fuerza', active: true },
    { id: 'definicion', label: 'Definición', active: true },
    { id: 'resistencia', label: 'Resistencia', active: false }
  ];

  return (
    <div className="min-h-screen px-6 pt-12">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent/60 mx-auto mb-4 flex items-center justify-center shadow-lg">
          <User size={40} className="text-white" />
        </div>
        <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          {userStats.name}
        </h1>
        <p className="text-muted-foreground">{userStats.objetivo}</p>
      </motion.div>

      {/* Physical Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 shadow-sm mb-6"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
          Datos físicos
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold mb-1">{userStats.peso}</div>
            <div className="text-xs text-muted-foreground">Peso (kg)</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">{userStats.altura}</div>
            <div className="text-xs text-muted-foreground">Altura (cm)</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">{userStats.edad}</div>
            <div className="text-xs text-muted-foreground">Edad</div>
          </div>
        </div>
      </motion.div>

      {/* Activity Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-card rounded-xl p-4 shadow-sm text-center">
          <div className="w-10 h-10 rounded-full bg-accent/10 mx-auto mb-2 flex items-center justify-center">
            <TrendingUp size={20} className="text-accent" />
          </div>
          <div className="text-xl font-bold mb-1">{userStats.totalWorkouts}</div>
          <div className="text-xs text-muted-foreground">Entrenamientos</div>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm text-center">
          <div className="w-10 h-10 rounded-full bg-green-500/10 mx-auto mb-2 flex items-center justify-center">
            <Target size={20} className="text-green-600" />
          </div>
          <div className="text-xl font-bold mb-1">{userStats.currentStreak}</div>
          <div className="text-xs text-muted-foreground">Racha (días)</div>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm text-center">
          <div className="w-10 h-10 rounded-full bg-yellow-500/10 mx-auto mb-2 flex items-center justify-center">
            <Award size={20} className="text-yellow-600" />
          </div>
          <div className="text-xl font-bold mb-1">{userStats.achievements}</div>
          <div className="text-xs text-muted-foreground">Logros</div>
        </div>
      </motion.div>

      {/* Moods/Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
          Objetivos activos
        </h3>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <div
              key={mood.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mood.active
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {mood.label}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
