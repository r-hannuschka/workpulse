export const routerConfig = {
  dashboard: () => import('./components/dashboard.component').then((m) => m.DashboardComponent),
  jiraIssuesList: () => import('@jira-flow/jira/feature-shell').then((m) => m.JiraIssuesListComponent)
};