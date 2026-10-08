import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import type { JiraIssueDetails } from '@workpulse/api';
import { createElapsedTimer } from '@workpulse/common/utils';
import { RouteParams } from '@workpulse/core/portal-router';
import { SessionStateSelectors } from '@workpulse/core/state';
import { of } from 'rxjs';
import { IssueService } from '../service/issue.service';

@Component({
  selector: 'jira-issue-details',
  templateUrl: './issue-details.component.html',
})
export class IssueDetailsComponent {
  private readonly routeParams = inject<{ key?: JiraIssueDetails['key'] }>(RouteParams);
  private readonly store = inject(Store);
  private readonly issueService = inject(IssueService);

  private readonly activeSessionKey = this.store.selectSignal(
    SessionStateSelectors.activeSessionKey,
  );

  protected readonly issueResource = rxResource({
    params: () => ({ activeSessionKey: this.activeSessionKey() }),
    stream: ({ params }) => {
      const issueKey = this.routeParams.key ?? params.activeSessionKey;
      if (!issueKey) {
        return of(null);
      }
      return this.issueService.getDetails(issueKey);
    },
  });

  /** true wenn kein Key über RouteParams kam, also Session-Fallback */
  protected readonly isFromSession = computed(() => {
    return this.routeParams.key == null && this.activeSessionKey() !== null;
  });

  /** Live-Timer für die aktive Session */
  protected readonly elapsed = createElapsedTimer(
    this.store.selectSignal(SessionStateSelectors.activeSessionStartAt),
  );
}
