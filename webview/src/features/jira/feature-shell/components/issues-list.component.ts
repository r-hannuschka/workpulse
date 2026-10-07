import { CdkTableModule } from '@angular/cdk/table';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import type { IssueListItem } from '@workpulse/api';
import { JiraFlowFacade } from '@workpulse/core/api';
import { PortalRouterService } from '@workpulse/core/portal-router';
import { IssueService } from '../service/issue.service';

@Component({
  selector: 'jira-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrl: './issues-list.component.scss',
  imports: [CdkTableModule, MatIconButton, MatIcon],
  encapsulation: ViewEncapsulation.None
})
export class JiraIssuesListComponent {
  private readonly router = inject(PortalRouterService);

  protected readonly issueService = inject(IssueService)

  protected openDetail(key: IssueListItem['key']): void {
    this.router.navigate('jira:issue-detail', { key });
  }

  protected displayedColumns = [
    'key',
    'summary',
    'priority',
    'actions'
  ];

  protected trackByIssueKey(index: number, item: IssueListItem): string {
    return item.key;
  }

  protected startSession(issue: IssueListItem) {
    this.issueService.startSession(issue);
  }

  protected stopSession() {
    this.issueService.stopSession()
  }
}
