import type { FocusedIssue, JiraIssueListItem, JiraIssueListResponse } from '@workpulse/api';

export interface JiraStateModel {
  issues: JiraIssueListResponse | null;

  selectedIssue?: JiraIssueListItem;

  currentFocusTask: FocusedIssue | null;
}
