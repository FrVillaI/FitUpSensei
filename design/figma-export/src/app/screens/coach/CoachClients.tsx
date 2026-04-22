import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Search, User } from 'lucide-react';
import { clients } from '../../data/clients';

export function CoachClients() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="min-h-screen px-6 pt-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Clientes
        </h1>

        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cliente..."
            className="w-full pl-12 pr-4 py-3 bg-card rounded-2xl shadow-sm border border-border focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <div className="bg-card rounded-xl p-3 shadow-sm text-center">
          <div className="text-xl font-bold">{clients.length}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
        <div className="bg-card rounded-xl p-3 shadow-sm text-center">
          <div className="text-xl font-bold text-green-600">
            {clients.filter(c => c.status === 'active').length}
          </div>
          <div className="text-xs text-muted-foreground">Activos</div>
        </div>
        <div className="bg-card rounded-xl p-3 shadow-sm text-center">
          <div className="text-xl font-bold text-red-600">
            {clients.filter(c => c.status === 'inactive').length}
          </div>
          <div className="text-xs text-muted-foreground">Inactivos</div>
        </div>
      </motion.div>

      {/* Clients List */}
      <div className="space-y-3">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link to={`/coach/client/${client.id}`}>
              <div className="bg-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center flex-shrink-0">
                    <User size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{client.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground capitalize">
                        {client.objetivo}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(client.status)}`}>
                        {getStatusLabel(client.status)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-medium">{client.progress}%</div>
                    <div className="text-xs text-muted-foreground">Progreso</div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <User size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            No se encontraron clientes
          </h3>
          <p className="text-muted-foreground">
            Intenta con otro término de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
