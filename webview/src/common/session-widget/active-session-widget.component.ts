import { DatePipe } from '@angular/common';
import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import {
  WORKPULSE_WIDGET,
  type WorkpulseWidget,
  type WorkpulseWidgetAction,
} from '@workpulse/common';
import { SessionStateSelectors, StopSession } from '@workpulse/core/state';
import { EMPTY, map, timer } from 'rxjs';

@Component({
  selector: 'jiraflow-active-session',
  templateUrl: './active-session-widget.component.html',
  imports: [DatePipe],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: WORKPULSE_WIDGET, useExisting: ActiveSessionWidgetComponent }],
})
export class ActiveSessionWidgetComponent implements WorkpulseWidget {
  private readonly store = inject(Store);

  // --- Widget contract ---

  readonly title = 'Aktive Session';

  readonly actions: WorkpulseWidgetAction[] = [
    { icon: 'workpulse-icon-stop', key: '[Session]: stop session' },
  ];

  // --- Session data ---

  protected readonly activeSession = this.store.selectSignal(SessionStateSelectors.activeSession);
  protected readonly sessionKey = computed(() => this.activeSession()?.issueKey ?? null);
  protected readonly startAt = computed(() => this.activeSession()?.startAt ?? null);

  // --- Live elapsed timer ---

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

  // --- Widget actions ---

  actionDispatched(action: WorkpulseWidgetAction): void {
    if (action.key === '[Session]: stop session') {
      this.stop();
    }
  }

  // --- Internal methods ---

  private stop(): void {
    this.store.dispatch(new StopSession());
  }

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
