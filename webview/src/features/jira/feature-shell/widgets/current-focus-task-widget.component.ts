import { Component, computed, inject } from '@angular/core';
import {
  SafeHtmlPipe,
  WORKPULSE_WIDGET,
  workpulseTeaserComponent,
  type WorkpulseWidget,
} from '@workpulse/common';
import { Store } from '@ngxs/store';
import { JiraStateSelectors } from '../../data-access';

@Component({
  selector: 'jiraflow-current-focus-task',
  templateUrl: './current-focus-task-widget.component.html',
  imports: [SafeHtmlPipe, workpulseTeaserComponent],
  providers: [
    {
      provide: WORKPULSE_WIDGET,
      useExisting: CurrentFocusTaskWidgetComponent,
    },
  ],
  exportAs: 'currentFocusTask',
})
export class CurrentFocusTaskWidgetComponent implements WorkpulseWidget {
  private readonly store = inject(Store);

  protected readonly focusedTask = this.store.selectSignal(JiraStateSelectors.currentFocusedTask);

  readonly title = 'Aktuellster Issue';

  readonly taskKey = computed(() => {
    return this.focusedTask()?.key ?? null;
  });
}
