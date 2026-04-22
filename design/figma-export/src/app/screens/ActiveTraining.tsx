import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ChevronRight } from 'lucide-react';
import { routines } from '../data/routines';
import { exercises } from '../data/exercises';

export function ActiveTraining() {
  const { id } = useParams();
  const navigate = useNavigate();
  const routine = routines.find(r => r.id === id);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  if (!routine) {
    return <div>Routine not found</div>;
  }

  const currentRoutineEx = routine.exercises[currentExerciseIndex];
  const currentExercise = exercises.find(ex => ex.id === currentRoutineEx.exerciseId);
  const progress = ((currentExerciseIndex + 1) / routine.exercises.length) * 100;

  const handleComplete = () => {
    const newCompleted = new Set(completedExercises);
    newCompleted.add(currentExerciseIndex);
    setCompletedExercises(newCompleted);

    if (currentExerciseIndex < routine.exercises.length - 1) {
      setTimeout(() => {
        setCurrentExerciseIndex(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        navigate('/user/routines');
      }, 1000);
    }
  };

  if (!currentExercise) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-sm"
          >
            <X size={20} />
          </button>
          <span className="text-sm text-muted-foreground">
            {currentExerciseIndex + 1} / {routine.exercises.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Exercise Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentExerciseIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col justify-center px-6"
        >
          {/* Exercise Image */}
          <div className="relative aspect-square max-w-sm mx-auto w-full mb-8 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={currentExercise.image}
              alt={currentExercise.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Exercise Info */}
          <div className="text-center mb-8">
            <h1 className="text-5xl mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              {currentExercise.name}
            </h1>

            <div className="flex items-center justify-center gap-6 text-2xl">
              {currentRoutineEx.sets && (
                <div>
                  <span className="text-muted-foreground text-lg">Series: </span>
                  <span className="font-bold">{currentRoutineEx.sets}</span>
                </div>
              )}
              {currentRoutineEx.reps && (
                <div>
                  <span className="text-muted-foreground text-lg">Reps: </span>
                  <span className="font-bold">{currentRoutineEx.reps}</span>
                </div>
              )}
              {currentRoutineEx.weight && (
                <div>
                  <span className="text-muted-foreground text-lg">Peso: </span>
                  <span className="font-bold">{currentRoutineEx.weight}kg</span>
                </div>
              )}
              {currentRoutineEx.duration && (
                <div>
                  <span className="text-muted-foreground text-lg">Tiempo: </span>
                  <span className="font-bold">{currentRoutineEx.duration}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="px-6 pb-8 space-y-3">
        <button
          onClick={handleComplete}
          className="w-full bg-accent text-accent-foreground py-5 rounded-2xl font-medium flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all text-lg"
        >
          {completedExercises.has(currentExerciseIndex) ? (
            <>
              <Check size={24} />
              Completado
            </>
          ) : (
            <>
              <Check size={24} />
              Marcar como completado
            </>
          )}
        </button>

        {currentExerciseIndex < routine.exercises.length - 1 && (
          <button
            onClick={() => setCurrentExerciseIndex(prev => prev + 1)}
            className="w-full bg-card text-foreground py-5 rounded-2xl font-medium flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all"
          >
            Siguiente ejercicio
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
