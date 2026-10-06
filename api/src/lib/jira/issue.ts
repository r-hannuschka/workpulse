import type { IssueType } from "./mappings";
import type { IssueStatus } from "./mappings";

export interface JiraIssueListItem {
  id: string;
  key: string;
  summary: string;
  issueType: IssueType;
  priority: {
    id: string;
    name: string;
  };
  status: IssueStatus;
  remainingTimeSeconds: number | undefined;
  timeSpentSeconds: number | undefined;
}

export interface JiraIssueListResponse {
  total: number;
  count: number;
  data: JiraIssueListItem[];
}

export interface JiraIssue extends JiraIssueListItem {
  jiraUrl: string;
  description: string | null;
}
