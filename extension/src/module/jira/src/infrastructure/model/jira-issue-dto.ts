export interface JiraIssueListDTO<T extends JiraIssueListItemDTO = JiraIssueListItemDTO> {
  total: number;
  maxResults: number;
  startAt: number;
  issues: T[];
}

export interface JiraIssueListItemDTO {
  id: string;
  key: string;
  fields: {
    summary: string;
    issuetype: {
      id: string;
      name: string;
      subtask: boolean;
    };
    priority: {
      id: string;
      name: string;
    };
    status: {
      id: string;
      name: string;
    };
    timetracking: {
      originalEstimate?: string;
      remainingEstimate?: string;
      timeSpent?: string;
      originalEstimateSeconds?: number;
      remainingEstimateSeconds?: number;
      timeSpentSeconds?: number;
    };
  };
}

export interface FocusedIssueDTO extends JiraIssueListItemDTO {
  renderedFields: {
    description: string | null;
    timetracking: {
      originalEstimate: string | null;
      originalEstimateSeconds: number | null;
      remainingEstimate: string | null;
      remainingEstimateSeconds: number | null;
      timeSpend: string | null;
      timeSpentSeconds: number | null;
    };
  };
}
