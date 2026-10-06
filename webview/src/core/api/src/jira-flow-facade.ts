import { InjectionToken } from '@angular/core';
import type { FocusedIssue, JiraIssueListResponse, JiraIssueDetails } from '@workpulse/api';
import type { Observable } from 'rxjs';

export interface IJiraFlowFacade {
  getIssueByKey(key: string): Observable<JiraIssueDetails | null>;

  list(): Observable<JiraIssueListResponse>;

  getCurrentInProgressTask(): Observable<FocusedIssue | null>;
}

export const JiraFlowFacade = new InjectionToken<IJiraFlowFacade>(
  'Jira Flow Facade um Daten von Jira abzugreifen',
);
