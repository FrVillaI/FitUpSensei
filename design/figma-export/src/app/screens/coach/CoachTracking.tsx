import { Link } from 'react-router';
import { motion } from 'motion/react';
import { User, TrendingUp, AlertCircle } from 'lucide-react';
import { clients } from '../../data/clients';
import { routines } from '../../data/routines';

export function CoachTracking() {
  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'inactive': return '🔴';
      case 'irregular': return '🟡';
      default: return '⚪';
    }
  };

  const getDaysSinceActivity = (lastActivity?: string) => {
    if (!lastActivity) return 999;
    const date = new Date(lastActivity);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedClients = [...clients].sort((a, b) => {
    return getDaysSinceActivity(b.lastActivity) - getDaysSinceActivity(a.lastActivity);
  });

  return (
    <div className="min-h-screen px-6 pt-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Seguimiento
        </h1>
        <p className="text-muted-foreground">Monitorea a tus clientes</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-card rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-green-600">
            {clients.filter(c => c.status === 'active').length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Activos</div>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {clients.filter(c => c.status === 'irregular').length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Irregulares</div>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-red-600">
            {clients.filter(c => c.status === 'inactive').length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Inactivos</div>
        </div>
      </motion.div>

      {/* Clients Progress */}
      <div className="space-y-3">
        {sortedClients.map((client, index) => {
          const routine = client.assignedRoutineId
            ? routines.find(r => r.id === client.assignedRoutineId)
            : null;
          const daysSince = getDaysSinceActivity(client.lastActivity);
          const needsAttention = daysSince > 2;

          return (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/coach/client/${client.id}`}>
                <div className={`bg-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow ${
                  needsAttention ? 'border-l-4 border-yellow-500' : ''
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center flex-shrink-0 relative">
                      <User size={24} className="text-white" />
                      <div className="absolute -top-1 -right-1 text-lg">
                        {getStatusIndicator(client.status)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{client.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {routine ? routine.name : 'Sin rutina'}
                          </p>
                        </div>
                        {needsAttention && (
                          <AlertCircle size={20} className="text-yellow-600 flex-shrink-0" />
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progreso</span>
                          <span className="text-xs font-medium">{client.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all"
                            style={{ width: `${client.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Última actividad: {daysSince === 0 ? 'hoy' : `hace ${daysSince} días`}
                        </span>
                        {needsAttention && (
                          <span className="text-yellow-600 font-medium">
                            ⚠ Requiere atención
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
