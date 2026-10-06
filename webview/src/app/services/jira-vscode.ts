import { inject } from '@angular/core';
import type {
  FocusedIssue,
  GetFocusTaskCommand,
  GetIssueDetailCommand,
  GetIssuesCommand,
  JiraIssueDetails,
  JiraIssueListResponse,
} from '@workpulse/api';
import type { IJiraFlowFacade } from '@workpulse/core/api';
import type { Observable } from 'rxjs';
import { VsCodeBridge } from './vscode-bridge';

export class JiraVsCode implements IJiraFlowFacade {
  private readonly vscodeBridge = inject(VsCodeBridge);

  list(): Observable<JiraIssueListResponse> {
    const command: GetIssuesCommand = {
      type: 'jira:get-issues',
    };
    return this.vscodeBridge.request<JiraIssueListResponse>(command);
  }

  getCurrentInProgressTask(): Observable<FocusedIssue | null> {
    const command: GetFocusTaskCommand = {
      type: 'jira:get-focus-task',
    };
    return this.vscodeBridge.request<FocusedIssue | null>(command);
  }

  getIssueByKey(key: string): Observable<JiraIssueDetails | null> {
    const command: GetIssueDetailCommand = {
      type: 'jira:get-issue-detail',
      payload: { key },
    };
    return this.vscodeBridge.request<JiraIssueDetails | null>(command);
  }
}
