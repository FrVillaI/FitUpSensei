import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { exercises, categories } from '../data/exercises';

export function Explore() {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const filteredExercises = selectedCategory === 'todos'
    ? exercises
    : exercises.filter(ex => ex.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-card sticky top-0 z-10 border-b border-border">
        <h1 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Explorar
        </h1>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Gallery */}
      <div className="px-4 py-6">
        <Masonry columnsCount={2} gutter="16px">
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/user/exercise/${exercise.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <img
                      src={exercise.image}
                      alt={exercise.name}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ aspectRatio: index % 3 === 0 ? '3/4' : index % 3 === 1 ? '4/5' : '1/1' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-medium mb-1">
                        {exercise.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          {exercise.category}
                        </span>
                        <span className={`text-xs text-white/80 ${
                          exercise.difficulty === 'beginner' ? 'bg-green-500/30' :
                          exercise.difficulty === 'intermediate' ? 'bg-yellow-500/30' :
                          'bg-red-500/30'
                        } backdrop-blur-sm px-2 py-1 rounded-full`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
