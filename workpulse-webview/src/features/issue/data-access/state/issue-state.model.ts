import type { FocusedIssue, IssueListItem, IssueList } from '@workpulse/api';

export interface IssueStateModel {
  issues: IssueList | null;

  selectedIssue?: IssueListItem;

  currentFocusTask: FocusedIssue | null;
}
