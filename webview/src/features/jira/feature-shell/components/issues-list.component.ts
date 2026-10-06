import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { JiraFlowFacade } from '@workpulse/core/api';

@Component({
  selector: 'jira-issues-list',
  templateUrl: './issues-list.component.html',
})
export class JiraIssuesListComponent {

  private jiraFlowFacade = inject(JiraFlowFacade);

  protected readonly resource = rxResource({
    stream: () => this.jiraFlowFacade.list(),
  });
}
