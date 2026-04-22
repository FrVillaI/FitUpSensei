import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, X, GripVertical } from 'lucide-react';
import { exercises } from '../data/exercises';

interface EditorExercise {
  id: string;
  exerciseId: string;
  sets?: number;
  reps?: number;
  weight?: number;
}

export function RoutineEditor() {
  const navigate = useNavigate();
  const [routineName, setRoutineName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<EditorExercise[]>([]);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);

  const addExercise = (exerciseId: string) => {
    const newExercise: EditorExercise = {
      id: `${exerciseId}-${Date.now()}`,
      exerciseId,
      sets: 3,
      reps: 10
    };
    setSelectedExercises([...selectedExercises, newExercise]);
    setShowExerciseSelector(false);
  };

  const removeExercise = (id: string) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.id !== id));
  };

  const updateExercise = (id: string, field: keyof EditorExercise, value: number) => {
    setSelectedExercises(selectedExercises.map(ex =>
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const handleSave = () => {
    navigate('/routines');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-accent text-accent-foreground rounded-full font-medium disabled:opacity-50"
            disabled={!routineName || selectedExercises.length === 0}
          >
            Guardar
          </button>
        </div>

        <input
          type="text"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          placeholder="Nombre de la rutina"
          className="w-full text-3xl bg-transparent border-none outline-none placeholder:text-muted-foreground"
          style={{ fontFamily: 'var(--font-display)' }}
        />
      </div>

      {/* Canvas */}
      <div className="px-6 py-6">
        {selectedExercises.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Plus size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Canvas vacío
            </h3>
            <p className="text-muted-foreground mb-6">
              Agrega ejercicios para construir tu rutina
            </p>
            <button
              onClick={() => setShowExerciseSelector(true)}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium"
            >
              + Agregar ejercicio
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {selectedExercises.map((editorEx, index) => {
                const exercise = exercises.find(ex => ex.id === editorEx.exerciseId);
                if (!exercise) return null;

                return (
                  <motion.div
                    key={editorEx.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-card rounded-2xl shadow-md overflow-hidden"
                  >
                    {/* Card Header with Image */}
                    <div className="relative h-24 overflow-hidden">
                      <img
                        src={exercise.image}
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{exercise.name}</h4>
                            <p className="text-white/80 text-xs">{exercise.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeExercise(editorEx.id)}
                          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Card Body - Exercise Parameters */}
                    <div className="p-4 flex gap-3">
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground mb-1 block">Series</label>
                        <input
                          type="number"
                          value={editorEx.sets || ''}
                          onChange={(e) => updateExercise(editorEx.id, 'sets', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-muted rounded-lg text-center font-medium"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground mb-1 block">Reps</label>
                        <input
                          type="number"
                          value={editorEx.reps || ''}
                          onChange={(e) => updateExercise(editorEx.id, 'reps', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-muted rounded-lg text-center font-medium"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground mb-1 block">Peso (kg)</label>
                        <input
                          type="number"
                          value={editorEx.weight || ''}
                          onChange={(e) => updateExercise(editorEx.id, 'weight', parseInt(e.target.value))}
                          placeholder="--"
                          className="w-full px-3 py-2 bg-muted rounded-lg text-center font-medium placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => setShowExerciseSelector(true)}
              className="w-full py-4 border-2 border-dashed border-muted-foreground/30 rounded-2xl text-muted-foreground hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={20} />
              Agregar ejercicio
            </button>
          </>
        )}
      </div>

      {/* Exercise Selector Modal */}
      {showExerciseSelector && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
          onClick={() => setShowExerciseSelector(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                  Seleccionar ejercicio
                </h3>
                <button
                  onClick={() => setShowExerciseSelector(false)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {exercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => addExercise(exercise.id)}
                  className="w-full bg-muted hover:bg-accent/10 rounded-xl p-4 flex items-center gap-4 transition-colors text-left"
                >
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{exercise.name}</h4>
                    <p className="text-sm text-muted-foreground">{exercise.category}</p>
                  </div>
                  <Plus size={20} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
