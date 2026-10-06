import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import type { JiraIssueDetails } from '@workpulse/api';
import { RouteParams } from '@workpulse/core/portal-router';
import { JiraIssueService } from '../service/issue.service';

@Component({
  selector: 'jira-issue-details',
  templateUrl: './issue-details.component.html',
})
export class IssueDetailsComponent {
  private readonly routeParams = inject<{ key: JiraIssueDetails['key'] }>(RouteParams);

  private readonly issueService = inject(JiraIssueService);

  protected readonly issueResource = rxResource({
    stream: () => this.issueService.getDetails(this.routeParams.key),
  });
}
