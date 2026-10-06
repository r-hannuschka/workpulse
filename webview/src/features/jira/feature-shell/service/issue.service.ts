import { inject, Service } from '@angular/core';
import type { JiraIssueDetails } from '@workpulse/api';
import { JiraFlowFacade } from '@workpulse/core/api';

@Service()
export class JiraIssueService {
  private readonly jiraApi = inject(JiraFlowFacade);

  getDetails(key: JiraIssueDetails['key']) {
    return this.jiraApi.getIssueByKey(key);
  }
}
