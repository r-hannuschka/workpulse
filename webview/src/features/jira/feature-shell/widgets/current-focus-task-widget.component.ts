import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  workpulseTeaserComponent,
  JIRA_FLOW_WIDGET,
  SafeHtmlPipe,
  type JiraFlowWidget,
} from '@jira-flow/common';
import { Store } from '@ngxs/store';
import { FetchCurrentFocusedTask, FetchTasks, JiraStateSelectors } from '../../data-access';

@Component({
  selector: 'jiraflow-current-focus-task',
  templateUrl: './current-focus-task-widget.component.html',
  imports: [SafeHtmlPipe, workpulseTeaserComponent],
  providers: [
    {
      provide: JIRA_FLOW_WIDGET,
      useExisting: CurrentFocusTaskWidgetComponent,
    },
  ],
  exportAs: 'currentFocusTask',
})
export class CurrentFocusTaskWidgetComponent implements JiraFlowWidget {
  private readonly store = inject(Store);

  protected readonly focusedTask = this.store.selectSignal(JiraStateSelectors.currentFocusedTask);

  readonly title = 'Aktuellster Issue';

  readonly taskKey = computed(() => {
    return this.focusedTask()?.key ?? null;
  })

  refresh(): void {
    this.store.dispatch(new FetchCurrentFocusedTask());
  }
}
