import { Link } from 'react-router';
import { Play, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { exercises } from '../data/exercises';

export function Home() {
  const stats = {
    peso: 75,
    imc: 23.4,
    progreso: 68
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen px-6 pt-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Hola, Isaac
        </h1>
        <p className="text-muted-foreground">Listo para entrenar</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Active Routine Card */}
        <motion.div variants={item}>
          <Link to="/user/training/1">
            <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Rutina de hoy</p>
                    <h2 className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                      Pecho y Tríceps
                    </h2>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                    <Play fill="white" className="text-white ml-1" size={24} />
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Ejercicios:</span>
                    <span className="ml-2 font-medium">3</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duración:</span>
                    <span className="ml-2 font-medium">~45 min</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold mb-1">{stats.peso}</div>
            <div className="text-xs text-muted-foreground">Peso (kg)</div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold mb-1">{stats.imc}</div>
            <div className="text-xs text-muted-foreground">IMC</div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold mb-1">{stats.progreso}%</div>
            <div className="text-xs text-muted-foreground">Progreso</div>
          </div>
        </motion.div>

        {/* Suggested Exercises */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg" style={{ fontFamily: 'var(--font-display)' }}>
              Sugeridos para ti
            </h3>
            <Link to="/user/explore" className="text-sm text-accent">
              Ver más
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {exercises.slice(0, 5).map((exercise) => (
              <Link
                key={exercise.id}
                to={`/user/exercise/${exercise.id}`}
                className="flex-shrink-0"
              >
                <div className="w-40 group">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2 shadow-md group-hover:shadow-xl transition-shadow">
                    <img
                      src={exercise.image}
                      alt={exercise.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-white text-sm font-medium">
                        {exercise.name}
                      </div>
                      <div className="text-white/80 text-xs">
                        {exercise.category}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
