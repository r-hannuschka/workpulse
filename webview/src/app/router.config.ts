import type { PortalRoute } from '@workpulse/core/portal-router';
import { routes as jiraRoutes } from '@jira-flow/jira/feature-shell';

export const routerConfig: PortalRoute[] = [
  {
    path: 'dashboard',
    default: true,
    component: () => import('./components/dashboard.component').then((m) => m.DashboardComponent),
  },
  ...jiraRoutes
];
