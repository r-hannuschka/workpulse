import type { PortalRoute } from '@workpulse/core/portal-router';

export const routes: PortalRoute[] = [
  {
    path: 'jira:issue-list',
    component: () =>
      import('../components/issues-list.component').then((m) => m.JiraIssuesListComponent),
  },
  {
    path: 'jira:issue-detail',
    component: () =>
      import('../components/issue-details.component').then((m) => m.IssueDetailsComponent),
  },
];
