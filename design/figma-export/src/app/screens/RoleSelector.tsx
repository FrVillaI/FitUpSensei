import { Link } from 'react-router';
import { motion } from 'motion/react';
import { User, UserCog } from 'lucide-react';

export function RoleSelector() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          FitFlow
        </h1>
        <p className="text-muted-foreground text-lg">
          Selecciona tu perfil
        </p>
      </motion.div>

      <div className="w-full max-w-md space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link to="/user">
            <div className="bg-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all group cursor-pointer border-2 border-transparent hover:border-accent">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                  <User size={32} className="text-accent group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    Usuario
                  </h2>
                  <p className="text-muted-foreground">
                    Entrena y sigue tus rutinas
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/coach">
            <div className="bg-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all group cursor-pointer border-2 border-transparent hover:border-accent">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                  <UserCog size={32} className="text-accent group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    Entrenador
                  </h2>
                  <p className="text-muted-foreground">
                    Gestiona clientes y rutinas
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
