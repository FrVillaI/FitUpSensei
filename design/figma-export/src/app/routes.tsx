import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { LayoutCoach } from './components/LayoutCoach';
import { RoleSelector } from './screens/RoleSelector';
import { Home } from './screens/Home';
import { Explore } from './screens/Explore';
import { ExerciseDetail } from './screens/ExerciseDetail';
import { Routines } from './screens/Routines';
import { RoutineDetail } from './screens/RoutineDetail';
import { RoutineEditor } from './screens/RoutineEditor';
import { ActiveTraining } from './screens/ActiveTraining';
import { Progress } from './screens/Progress';
import { Profile } from './screens/Profile';
import { CoachDashboard } from './screens/coach/CoachDashboard';
import { CoachClients } from './screens/coach/CoachClients';
import { CoachClientDetail } from './screens/coach/CoachClientDetail';
import { CoachRoutines } from './screens/coach/CoachRoutines';
import { CoachCreate } from './screens/coach/CoachCreate';
import { CoachTracking } from './screens/coach/CoachTracking';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RoleSelector
  },
  {
    path: '/user',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'explore', Component: Explore },
      { path: 'exercise/:id', Component: ExerciseDetail },
      { path: 'routines', Component: Routines },
      { path: 'routine/:id', Component: RoutineDetail },
      { path: 'routine/:id/edit', Component: RoutineEditor },
      { path: 'routine/new', Component: RoutineEditor },
      { path: 'training/:id', Component: ActiveTraining },
      { path: 'progress', Component: Progress },
      { path: 'profile', Component: Profile }
    ]
  },
  {
    path: '/coach',
    Component: LayoutCoach,
    children: [
      { index: true, Component: CoachDashboard },
      { path: 'clients', Component: CoachClients },
      { path: 'client/:id', Component: CoachClientDetail },
      { path: 'routines', Component: CoachRoutines },
      { path: 'routine/:id/edit', Component: CoachCreate },
      { path: 'create', Component: CoachCreate },
      { path: 'tracking', Component: CoachTracking }
    ]
  }
]);
