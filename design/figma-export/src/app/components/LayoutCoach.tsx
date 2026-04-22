import { Outlet } from 'react-router';
import { BottomNavCoach } from './BottomNavCoach';
import { RoleSwitcher } from './RoleSwitcher';

export function LayoutCoach() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <RoleSwitcher currentRole="coach" />
      <Outlet />
      <BottomNavCoach />
    </div>
  );
}
