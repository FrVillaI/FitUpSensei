import { useParams, useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, User, Activity, TrendingDown } from 'lucide-react';
import { clients } from '../../data/clients';
import { routines } from '../../data/routines';

export function CoachClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = clients.find(c => c.id === id);

  if (!client) {
    return <div>Cliente no encontrado</div>;
  }

  const assignedRoutine = client.assignedRoutineId
    ? routines.find(r => r.id === client.assignedRoutineId)
    : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'irregular': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'irregular': return 'Irregular';
      default: return status;
    }
  };

  const weightHistory = [
    { date: '15 Mar', value: client.weight + 5 },
    { date: '22 Mar', value: client.weight + 3 },
    { date: '29 Mar', value: client.weight + 2 },
    { date: '5 Abr', value: client.weight + 1 },
    { date: '12 Abr', value: client.weight }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-4"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center flex-shrink-0">
            <User size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              {client.name}
            </h1>
            <p className="text-muted-foreground text-sm mb-2">{client.email}</p>
            <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(client.status)}`}>
              {getStatusLabel(client.status)}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Physical Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Datos físicos
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold mb-1">{client.age}</div>
              <div className="text-xs text-muted-foreground">Edad</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">{client.weight}</div>
              <div className="text-xs text-muted-foreground">Peso (kg)</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">{client.height}</div>
              <div className="text-xs text-muted-foreground">Altura (cm)</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">{client.imc.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">IMC</div>
            </div>
          </div>
        </motion.div>

        {/* Objective & Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
              <Activity size={20} className="text-accent" />
            </div>
            <div className="text-sm text-muted-foreground mb-1">Objetivo</div>
            <div className="text-xl font-bold">{client.objetivo}</div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
              <TrendingDown size={20} className="text-green-600" />
            </div>
            <div className="text-sm text-muted-foreground mb-1">Progreso</div>
            <div className="text-xl font-bold">{client.progress}%</div>
          </div>
        </motion.div>

        {/* Assigned Routine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Rutina asignada</h3>
            <Link to="/coach/routines" className="text-sm text-accent">
              Cambiar
            </Link>
          </div>

          {assignedRoutine ? (
            <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
              {assignedRoutine.image && (
                <div className="relative h-24 overflow-hidden">
                  <img
                    src={assignedRoutine.image}
                    alt={assignedRoutine.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white font-medium">
                    {assignedRoutine.name}
                  </div>
                </div>
              )}
              <div className="p-4">
                <div className="text-sm text-muted-foreground">
                  {assignedRoutine.exercises.length} ejercicios • {assignedRoutine.difficulty}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-6 text-center shadow-sm">
              <p className="text-muted-foreground mb-4">Sin rutina asignada</p>
              <Link to="/coach/routines">
                <button className="px-6 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                  Asignar rutina
                </button>
              </Link>
            </div>
          )}
        </motion.div>

        {/* Weight Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-medium mb-6">Evolución de peso</h3>
          <div className="relative h-40">
            <svg className="w-full h-full" viewBox="0 0 300 120">
              <defs>
                <linearGradient id="clientWeightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 30}
                  x2="300"
                  y2={i * 30}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
              ))}

              <path
                d="M 0 90 L 75 60 L 150 40 L 225 25 L 300 10 L 300 120 L 0 120 Z"
                fill="url(#clientWeightGradient)"
              />

              <path
                d="M 0 90 L 75 60 L 150 40 L 225 25 L 300 10"
                stroke="var(--accent)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {weightHistory.map((point, i) => (
                <circle
                  key={i}
                  cx={i * 75}
                  cy={120 - (point.value - client.weight + 5) * 15}
                  r="5"
                  fill="var(--accent)"
                />
              ))}
            </svg>

            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              {weightHistory.map((point, i) => (
                <span key={i}>{point.date}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
