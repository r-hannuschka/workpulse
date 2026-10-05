import { InjectionToken, type Signal } from '@angular/core';
import { JiraIssueListResponse, type JiraIssue } from '@timetracker/api';
import type { Observable } from 'rxjs';

export interface IJiraFlowFacade {
  list(): Observable<JiraIssueListResponse>;

  getCurrentInProgressTask(): Observable<JiraIssue | null>;
}

export const JiraFlowFacade = new InjectionToken<IJiraFlowFacade>('Jira Flow Facade um Daten von Jira abzugreifen');