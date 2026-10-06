/**
 * Single Issue Response von GET /rest/api/2/issue/{issueKey}
 *
 * Liefert ein einzelnes Jira-Issue mit allen Feldern,
 * im Gegensatz zu POST /search das nur die schlanke Liste liefert.
 */
export interface JiraIssueDTO {
  id: string;
  key: string;
  fields: JiraIssueFields;
}

export interface JiraIssueFields {
  issuetype: {
    id: string;
    name: string;
    iconUrl: string;
    subtask: boolean;
  };
  summary: string;
  description: string | null;
  priority: {
    id: string;
    name: string;
    iconUrl: string;
  };
  status: {
    id: string;
    name: string;
    iconUrl: string;
    statusCategory: {
      id: number;
      key: string;
      name: string;
    };
  };
  assignee?: {
    displayName: string;
    emailAddress: string;
    avatarUrls: Record<string, string>;
  };
  reporter: {
    displayName: string;
    emailAddress: string;
    avatarUrls: Record<string, string>;
  };
  created: string;
  updated: string;
  duedate?: string;
  timetracking: {
    originalEstimate?: string;
    originalEstimateSeconds?: number;
    remainingEstimate?: string;
    remainingEstimateSeconds?: number;
    timeSpent?: string;
    timeSpentSeconds?: number;
  };
  [key: string]: unknown;
}
