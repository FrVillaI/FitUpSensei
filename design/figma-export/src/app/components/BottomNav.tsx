import { Link, useLocation } from 'react-router';
import { Home, Search, Dumbbell, TrendingUp, User } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();

  const tabs = [
    { path: '/user', icon: Home, label: 'Inicio' },
    { path: '/user/explore', icon: Search, label: 'Explorar' },
    { path: '/user/routines', icon: Dumbbell, label: 'Rutinas' },
    { path: '/user/progress', icon: TrendingUp, label: 'Progreso' },
    { path: '/user/profile', icon: User, label: 'Perfil' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around px-4 pb-safe">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center gap-1 py-3 px-4 transition-colors relative"
            >
              <div className={`transition-all duration-300 ${
                isActive
                  ? 'text-accent scale-110'
                  : 'text-muted-foreground'
              }`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] transition-all duration-300 ${
                isActive
                  ? 'text-accent opacity-100'
                  : 'text-muted-foreground opacity-70'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent rounded-b-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
