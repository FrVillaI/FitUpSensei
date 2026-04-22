import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, X, GripVertical, Save } from 'lucide-react';
import { exercises } from '../../data/exercises';

interface EditorExercise {
  id: string;
  exerciseId: string;
  sets?: number;
  reps?: number;
  weight?: number;
  rest?: number;
}

export function CoachCreate() {
  const navigate = useNavigate();
  const [routineName, setRoutineName] = useState('');
  const [objective, setObjective] = useState('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [selectedExercises, setSelectedExercises] = useState<EditorExercise[]>([]);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);

  const addExercise = (exerciseId: string) => {
    const newExercise: EditorExercise = {
      id: `${exerciseId}-${Date.now()}`,
      exerciseId,
      sets: 3,
      reps: 10,
      rest: 60
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
    navigate('/coach/routines');
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
            className="px-6 py-2 bg-accent text-accent-foreground rounded-full font-medium disabled:opacity-50 flex items-center gap-2"
            disabled={!routineName || selectedExercises.length === 0}
          >
            <Save size={18} />
            Guardar rutina
          </button>
        </div>

        <h1 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Crear rutina
        </h1>
      </div>

      {/* Form */}
      <div className="px-6 py-6">
        {/* Step 1: General Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-sm mb-6"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Datos generales
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nombre de la rutina</label>
              <input
                type="text"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
                placeholder="Ej: Fuerza básica"
                className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Objetivo</label>
              <input
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="Ej: Desarrollo de fuerza"
                className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Nivel</label>
              <div className="flex gap-2">
                {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      difficulty === level
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    {level === 'beginner' ? 'Principiante' : level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 2: Exercises */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Ejercicios ({selectedExercises.length})
            </h3>
          </div>

          {selectedExercises.length === 0 ? (
            <div className="bg-card rounded-2xl p-10 text-center shadow-sm mb-4">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Plus size={28} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Agrega ejercicios
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Construye tu rutina agregando ejercicios
              </p>
              <button
                onClick={() => setShowExerciseSelector(true)}
                className="px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium"
              >
                + Agregar primer ejercicio
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
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-card rounded-2xl shadow-md overflow-hidden"
                    >
                      {/* Card Header */}
                      <div className="relative h-24 overflow-hidden">
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <GripVertical size={16} className="text-white" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{exercise.name}</h4>
                              <p className="text-white/80 text-xs capitalize">{exercise.category}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeExercise(editorEx.id)}
                            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Parameters */}
                      <div className="p-4 grid grid-cols-4 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Series</label>
                          <input
                            type="number"
                            value={editorEx.sets || ''}
                            onChange={(e) => updateExercise(editorEx.id, 'sets', parseInt(e.target.value))}
                            className="w-full px-2 py-2 bg-muted rounded-lg text-center font-medium text-sm"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Reps</label>
                          <input
                            type="number"
                            value={editorEx.reps || ''}
                            onChange={(e) => updateExercise(editorEx.id, 'reps', parseInt(e.target.value))}
                            className="w-full px-2 py-2 bg-muted rounded-lg text-center font-medium text-sm"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Peso (kg)</label>
                          <input
                            type="number"
                            value={editorEx.weight || ''}
                            onChange={(e) => updateExercise(editorEx.id, 'weight', parseInt(e.target.value))}
                            placeholder="--"
                            className="w-full px-2 py-2 bg-muted rounded-lg text-center font-medium text-sm placeholder:text-muted-foreground"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Desc (s)</label>
                          <input
                            type="number"
                            value={editorEx.rest || ''}
                            onChange={(e) => updateExercise(editorEx.id, 'rest', parseInt(e.target.value))}
                            className="w-full px-2 py-2 bg-muted rounded-lg text-center font-medium text-sm"
                            min="0"
                            step="15"
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
                Agregar otro ejercicio
              </button>
            </>
          )}
        </motion.div>
      </div>

      {/* Exercise Selector Modal */}
      <AnimatePresence>
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
              <div className="sticky top-0 bg-card border-b border-border px-6 py-4 z-10">
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
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{exercise.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{exercise.category}</p>
                    </div>
                    <Plus size={20} className="text-muted-foreground flex-shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
