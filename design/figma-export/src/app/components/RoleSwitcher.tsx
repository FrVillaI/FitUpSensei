import { Link } from 'react-router';
import { UserCog, User } from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: 'user' | 'coach';
}

export function RoleSwitcher({ currentRole }: RoleSwitcherProps) {
  return (
    <Link to="/">
      <button className="fixed top-6 right-6 z-40 w-12 h-12 rounded-full bg-card shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-border">
        {currentRole === 'user' ? (
          <UserCog size={20} className="text-muted-foreground" />
        ) : (
          <User size={20} className="text-muted-foreground" />
        )}
      </button>
    </Link>
  );
}
