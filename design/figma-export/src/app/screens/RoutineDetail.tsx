import { useParams, useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Edit } from 'lucide-react';
import { routines } from '../data/routines';
import { exercises } from '../data/exercises';

export function RoutineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const routine = routines.find(r => r.id === id);

  if (!routine) {
    return <div>Routine not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      {routine.image && (
        <div className="relative h-48">
          <img
            src={routine.image}
            alt={routine.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background" />

          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
          >
            <ArrowLeft size={20} />
          </button>

          <Link to={`/user/routine/${id}/edit`} className="absolute top-6 right-6">
            <button className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Edit size={18} />
            </button>
          </Link>
        </div>
      )}

      <div className="px-6 pt-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            {routine.name}
          </h1>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              routine.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              routine.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {routine.difficulty}
            </span>
            <span className="text-sm text-muted-foreground">
              {routine.exercises.length} ejercicios
            </span>
          </div>
        </motion.div>

        {/* Exercises List */}
        <div className="space-y-3 mb-8">
          {routine.exercises.map((routineEx, index) => {
            const exercise = exercises.find(ex => ex.id === routineEx.exerciseId);
            if (!exercise) return null;

            return (
              <motion.div
                key={`${exercise.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-4 shadow-sm flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{exercise.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {routineEx.sets && `${routineEx.sets} series`}
                    {routineEx.reps && ` × ${routineEx.reps} reps`}
                    {routineEx.weight && ` • ${routineEx.weight}kg`}
                    {routineEx.duration && ` • ${routineEx.duration}`}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Start Button */}
        <Link to={`/user/training/${routine.id}`}>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full bg-accent text-accent-foreground py-5 rounded-2xl font-medium flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:bg-accent/90 transition-all text-lg"
          >
            <Play size={24} fill="currentColor" />
            INICIAR RUTINA
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
