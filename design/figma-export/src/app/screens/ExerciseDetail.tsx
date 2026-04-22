import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Plus } from 'lucide-react';
import { exercises } from '../data/exercises';

export function ExerciseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exercise = exercises.find(ex => ex.id === id);

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      {/* Hero Image */}
      <div className="relative h-[60vh]">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Muscle Hotspots (decorative) */}
        <div className="absolute inset-0 pointer-events-none">
          {exercise.muscles.slice(0, 3).map((muscle, index) => (
            <motion.div
              key={muscle}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="absolute w-3 h-3 rounded-full bg-accent shadow-lg"
              style={{
                top: `${30 + index * 15}%`,
                left: `${40 + index * 10}%`
              }}
            >
              <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-8 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-3xl shadow-2xl p-8"
        >
          {/* Title */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                {exercise.name}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {exercise.difficulty}
              </span>
            </div>
            <p className="text-muted-foreground text-lg capitalize">
              {exercise.category}
            </p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p
              className="text-foreground/90 leading-relaxed text-lg"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {exercise.description}
            </p>
          </div>

          {/* Muscles */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              Músculos implicados
            </h3>
            <div className="flex flex-wrap gap-2">
              {exercise.muscles.map((muscle) => (
                <div
                  key={muscle}
                  className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium"
                >
                  {muscle}
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-accent text-accent-foreground py-4 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:bg-accent/90 transition-all">
            <Plus size={20} />
            Agregar a rutina
          </button>
        </motion.div>

        {/* Additional spacing at bottom */}
        <div className="h-8" />
      </div>
    </motion.div>
  );
}
