import type { JiraIssueListItem } from "@timetracker/api";

export class FetchTasks {
  static readonly type = '[Jira] fetch current tasks';
}

export class FetchCurrentFocusedTask {
  static readonly type = '[Jira] fetch current focused task';
}

export class SelectIssue {
  static readonly type = '[Jira] selektiere Issue';

  constructor(public readonly issue?: JiraIssueListItem) {}
}