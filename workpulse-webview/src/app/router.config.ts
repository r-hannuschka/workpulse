import type { PortalRoute } from '@workpulse/core/portal-router';
import { routes as jiraRoutes } from '@workpulse/issue/feature-shell';
import { routes as timetrackerRouters } from '@workpulse/timetracker/feature-shell';

export const routerConfig: PortalRoute[] = [
  {
    path: 'dashboard',
    component: () => import('./components/dashboard.component').then((m) => m.DashboardComponent),
  },
  ...jiraRoutes,
  ...timetrackerRouters
];
