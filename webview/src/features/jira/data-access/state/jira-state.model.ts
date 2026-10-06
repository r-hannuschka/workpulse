import type { JiraIssue, JiraIssueListItem, JiraIssueListResponse } from '@workpulse/api';

export interface JiraStateModel {
  issues: JiraIssueListResponse | null;

  selectedIssue?: JiraIssueListItem;

  currentFocusTask: JiraIssue | null;
}
