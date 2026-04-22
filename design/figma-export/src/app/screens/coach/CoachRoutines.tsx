import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Plus, Eye, Edit, Copy } from 'lucide-react';
import { routines } from '../../data/routines';

export function CoachRoutines() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen px-6 pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Mis Rutinas
          </h1>
          <p className="text-muted-foreground">Gestiona y asigna rutinas</p>
        </div>
        <Link to="/coach/create">
          <button className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <Plus size={24} />
          </button>
        </Link>
      </div>

      {/* Routines List */}
      <div className="space-y-4">
        {routines.map((routine, index) => (
          <motion.div
            key={routine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {routine.image && (
              <div className="relative h-32 overflow-hidden">
                <img
                  src={routine.image}
                  alt={routine.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-white text-xl font-medium">
                    {routine.name}
                  </h3>
                </div>
              </div>
            )}

            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(routine.difficulty)}`}>
                    {getDifficultyLabel(routine.difficulty)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {routine.exercises.length} ejercicios
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link to={`/user/routine/${routine.id}`} className="flex-1">
                  <button className="w-full px-4 py-2 bg-muted hover:bg-accent/10 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                    <Eye size={16} />
                    Ver
                  </button>
                </Link>

                <Link to={`/coach/routine/${routine.id}/edit`} className="flex-1">
                  <button className="w-full px-4 py-2 bg-muted hover:bg-accent/10 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                    <Edit size={16} />
                    Editar
                  </button>
                </Link>

                <button className="px-4 py-2 bg-muted hover:bg-accent/10 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                  <Copy size={16} />
                  Duplicar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
