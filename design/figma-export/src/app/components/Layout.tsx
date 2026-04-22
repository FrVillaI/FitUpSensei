import { Outlet } from 'react-router';
import { BottomNav } from './BottomNav';
import { RoleSwitcher } from './RoleSwitcher';

export function Layout() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <RoleSwitcher currentRole="user" />
      <Outlet />
      <BottomNav />
    </div>
  );
}
