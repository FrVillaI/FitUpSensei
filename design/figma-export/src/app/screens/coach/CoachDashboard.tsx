import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Users, Dumbbell, AlertCircle, TrendingUp } from 'lucide-react';
import { clients, recentActivities } from '../../data/clients';

export function CoachDashboard() {
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalRoutines = clients.filter(c => c.assignedRoutineId).length;

  const alerts = [
    { id: '1', clientName: 'María López', message: 'Sin actividad hace 4 días', type: 'warning' },
    { id: '2', clientName: 'Ana García', message: 'Progreso irregular', type: 'info' }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) return `hace ${diffMins} min`;
    if (diffHours < 24) return `hace ${diffHours}h`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen px-6 pt-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Hola, Coach
        </h1>
        <p className="text-muted-foreground">Panel de control</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <Link to="/coach/clients">
          <div className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
              <Users size={20} className="text-accent" />
            </div>
            <div className="text-3xl font-bold mb-1">{activeClients}</div>
            <div className="text-xs text-muted-foreground">Clientes activos</div>
          </div>
        </Link>

        <Link to="/coach/routines">
          <div className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
              <Dumbbell size={20} className="text-accent" />
            </div>
            <div className="text-3xl font-bold mb-1">{totalRoutines}</div>
            <div className="text-xs text-muted-foreground">Rutinas asignadas</div>
          </div>
        </Link>

        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-3">
            <AlertCircle size={20} className="text-red-600" />
          </div>
          <div className="text-3xl font-bold mb-1">{alerts.length}</div>
          <div className="text-xs text-muted-foreground">Alertas</div>
        </div>
      </motion.div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-medium mb-4">Alertas importantes</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-card rounded-xl p-4 shadow-sm border-l-4 border-yellow-500"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{alert.clientName}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Actividad reciente</h3>
          <Link to="/coach/tracking" className="text-sm text-accent">
            Ver todo
          </Link>
        </div>
        <div className="space-y-3">
          {recentActivities.slice(0, 5).map((activity) => (
            <div
              key={activity.id}
              className="bg-card rounded-xl p-4 shadow-sm flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={18} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{activity.clientName}</h4>
                <p className="text-sm text-muted-foreground">
                  {activity.action} {activity.routineName && `- ${activity.routineName}`}
                </p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatDate(activity.date)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
