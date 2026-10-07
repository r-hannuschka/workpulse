/**
 * Paginierte Issue-Liste — POST /rest/api/2/search
 *
 * Antwort auf JQL-Abfragen, enthält schlanke Issue-Items
 * (keine renderedFields, keine vollständigen Beschreibungen).
 */

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
