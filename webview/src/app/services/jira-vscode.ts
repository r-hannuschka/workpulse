import { inject } from '@angular/core';
import type { IJiraFlowFacade } from '@jira-flow/core/api';
import type {
  GetFocusTaskCommand,
  GetIssuesCommand,
  JiraIssue,
  JiraIssueListResponse,
} from '@workpulse/api';
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

  getCurrentInProgressTask(): Observable<JiraIssue | null> {
    const command: GetFocusTaskCommand = {
      type: 'jira:get-focus-task',
    };
    return this.vscodeBridge.request<JiraIssue | null>(command);
  }
}
