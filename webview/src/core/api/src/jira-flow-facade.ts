import { InjectionToken } from '@angular/core';
import type { FocusedIssue, IssueList, JiraIssueDetails } from '@workpulse/api';
import type { Observable } from 'rxjs';

export interface IJiraFlowFacade {
  getIssueByKey(key: string): Observable<JiraIssueDetails | null>;

  list(): Observable<IssueList>;

  getCurrentInProgressTask(): Observable<FocusedIssue | null>;
}

export const JiraFlowFacade = new InjectionToken<IJiraFlowFacade>(
  'Jira Flow Facade um Daten von Jira abzugreifen',
);
