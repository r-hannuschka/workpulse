import { DatePipe } from '@angular/common';
import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { SessionStateSelectors, StopSession } from '@workpulse/core/state';
import { WORKPULSE_WIDGET, type WorkpulseWidget, type WorkpulseWidgetAction } from '@workpulse/common';
import { createElapsedTimer } from '../utils/create-elapsed-timer';

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
  protected readonly startAt = computed(() => this.activeSession()?.startAt ?? null);

  // --- Live elapsed timer ---
  protected readonly elapsed = createElapsedTimer(this.startAt);

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
}
