import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import type { JiraIssueDetails } from '@workpulse/api';
import { RouteParams } from '@workpulse/core/portal-router';
import { IssueService } from '../service/issue.service';

@Component({
  selector: 'jira-issue-details',
  templateUrl: './issue-details.component.html',
})
export class IssueDetailsComponent {
  private readonly routeParams = inject<{ key: JiraIssueDetails['key'] }>(RouteParams);

  private readonly issueService = inject(IssueService);

  protected readonly issueResource = rxResource({
    stream: () => this.issueService.getDetails(this.routeParams.key),
  });
}
