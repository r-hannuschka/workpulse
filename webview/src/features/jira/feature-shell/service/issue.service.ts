import { inject, Service } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { JiraStateSelectors } from '@workpulse/jira/data-access';
import { Store } from '@ngxs/store';
import type { IssueListItem, JiraIssueDetails } from '@workpulse/api';
import { JiraFlowFacade } from '@workpulse/core/api';
import { SessionStateSelectors, StartSession, StopSession } from '@workpulse/core/state';
import { map } from 'rxjs';

/**
 * Service für Issue-Abfragen.
 *
 * Liefert Issue-Details (einzeln) und die komplette Issue-Liste
 * mit Tracking-Highlight für den aktiven Session-Issue.
 */
@Service()
export class IssueService {
  private readonly store = inject(Store);
  private readonly jiraApi = inject(JiraFlowFacade);

  private readonly issueList = this.store.select(JiraStateSelectors.issues);
  private readonly activeSession = this.store.selectSignal(SessionStateSelectors.activeSession);


  /** Issue-Liste mit Tracking-Highlight – der Issue mit aktivem Timer ist über isTracking erkennbar */
  readonly list = rxResource({
    params: () => ({ activeSession: this.activeSession() }),
    stream: ({ params }) => {
      return this.issueList.pipe(
        map((list) => {
          if (!list) {
            return { count: 0, total: 0, data: [] as IssueListItem[] };
          }

          const { data } = list;
          const { activeSession } = params;

          // Markiere Issues mit aktivem Timer
          const mappedData = data.map((item) => ({
            ...item,
            isTracking: activeSession ? item.key === activeSession.issueKey : false,
          }));

          return { ...list, data: mappedData };
        }),
      );
    },
  });

  /** Issue-Details via Jira REST API nach Key laden */
  getDetails(key: JiraIssueDetails['key']) {
    return this.jiraApi.getIssueByKey(key);
  }

  startSession(issue: IssueListItem) {
    this.store.dispatch(new StartSession({ issueKey: issue.key }));
  }

  stopSession() {
    this.store.dispatch(new StopSession());
  }
}
