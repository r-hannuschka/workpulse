import { DatePipe } from '@angular/common';
import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { JIRA_FLOW_WIDGET, type JiraFlowWidget } from '@jira-flow/common';
import { Store } from '@ngxs/store';
import { FetchActiveSession, SessionStateSelectors } from '@workpulse/core/state';
import { EMPTY, map, timer } from 'rxjs';

@Component({
  selector: 'jiraflow-active-session',
  templateUrl: './active-session-widget.component.html',
  imports: [DatePipe],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: JIRA_FLOW_WIDGET,
      useExisting: ActiveSessionWidgetComponent,
    },
  ],
})
export class ActiveSessionWidgetComponent implements JiraFlowWidget {
  private readonly store = inject(Store);

  // Core session data from NgXS store
  protected readonly activeSession = this.store.selectSignal(SessionStateSelectors.activeSession);
  protected readonly sessionKey = computed(() => this.activeSession()?.issueKey ?? null);
  protected readonly startAt = computed(() => this.activeSession()?.startAt ?? null);

  readonly title = 'Aktive Session';

  // rxResource with timer(0, 1000) emits immediately and then every second.
  // loaderKey [this.startAt] ensures the stream restarts when the session changes.
  // When startAt is null (no active session), the stream returns EMPTY — no subscription.
  protected readonly elapsed = rxResource({
    params: () => ({ startAt: this.startAt() }),
    stream: ({ params }) => {
      const { startAt } = params;
      if (!startAt) return EMPTY;

      return timer(0, 1000).pipe(
        map(() => {
          const diffMs = Date.now() - new Date(startAt).getTime();
          return this.formatElapsed(diffMs);
        }),
      );
    },
  });

  // Refresh the session state from the extension (e.g. on reload button click)
  refresh(): void {
    this.store.dispatch(new FetchActiveSession());
  }

  // Convert milliseconds to HH:MM:SS for live elapsed time display
  private formatElapsed(ms: number): string {
    const hours = Math.floor(ms / 3600_000);
    const minutes = Math.floor((ms % 3600_000) / 60_000);
    const seconds = Math.floor((ms % 60_000) / 1000);

    return [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0'),
      String(seconds).padStart(2, '0'),
    ].join(':');
  }
}
