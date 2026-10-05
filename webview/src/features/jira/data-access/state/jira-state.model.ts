import type { JiraIssue, JiraIssueListItem, JiraIssueListResponse } from '@timetracker/api';

export interface JiraStateModel {
  issues: JiraIssueListResponse | null;

  selectedIssue?: JiraIssueListItem;

  currentFocusTask: JiraIssue | null;
}
