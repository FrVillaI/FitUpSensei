import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Plus, Play } from 'lucide-react';
import { routines } from '../data/routines';
import { exercises } from '../data/exercises';

export function Routines() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen px-6 pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
          Mis Rutinas
        </h1>
        <Link to="/user/routine/new">
          <button className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <Plus size={24} />
          </button>
        </Link>
      </div>

      {/* Routines List */}
      <div className="space-y-4">
        {routines.map((routine, index) => {
          const exerciseCount = routine.exercises.length;

          return (
            <motion.div
              key={routine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/user/routine/${routine.id}`}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  {routine.image && (
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={routine.image}
                        alt={routine.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                        <div>
                          <h3 className="text-white text-xl font-medium">
                            {routine.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(routine.difficulty)}`}>
                          {routine.difficulty}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {exerciseCount} ejercicios
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Play size={16} className="text-accent ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {routines.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <Plus size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            No hay rutinas aún
          </h3>
          <p className="text-muted-foreground mb-6">
            Crea tu primera rutina personalizada
          </p>
          <Link to="/user/routine/new">
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium">
              Crear rutina
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
