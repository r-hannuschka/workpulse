/**
 * Liste-Item mit zusätzlichen renderedFields — für den fokussierten Detailansatz
 *
 * Im Gegensatz zu JiraIssueListItemDTO enthält dieses Interface
 * gerenderte (HTML-formatierte) Felder, insbesondere die vollständige
 * Beschreibung und detailliertes TimeTracking.
 */

import type { JiraIssueListItemDTO } from "./jira-issue-list.dto";

export interface FocusedIssueDTO extends JiraIssueListItemDTO {
  renderedFields: {
    description: string | null;
    timetracking: {
      originalEstimate: string | null;
      originalEstimateSeconds: number | null;
      remainingEstimate: string | null;
      remainingEstimateSeconds: number | null;
      timeSpent: string | null;
      timeSpentSeconds: number | null;
    };
  };
}
