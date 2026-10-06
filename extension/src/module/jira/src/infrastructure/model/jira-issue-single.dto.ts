/** Response von GET /rest/api/2/issue/{issueKey} — vollständiges Single-Issue */
export interface JiraSingleIssueResponse {
  id: string;
  key: string;
  fields: JiraSingleIssueFields;
}

export interface JiraSingleIssueFields {
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
