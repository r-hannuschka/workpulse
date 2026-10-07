import type { FocusedIssue, IssueListItem, IssueList } from '@workpulse/api';

export interface JiraStateModel {
  issues: IssueList | null;

  selectedIssue?: IssueListItem;

  currentFocusTask: FocusedIssue | null;
}
