import { Component, computed, contentChild, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { WORKPULSE_WIDGET } from '../static/tokens';
import { MatIcon } from '@angular/material/icon';
import { WorkpulseWidgetAction } from '../interfaces/workpulse-widget';

@Component({
  selector: 'workpulse-widget',
  templateUrl: './widget.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconButton, MatIcon],
  host: {
    class: 'workpulse-widget',
  },
})
export class WidgetComponent {
  private readonly widget = contentChild(WORKPULSE_WIDGET);

  protected readonly title = computed(() => {
    const loadedWidget = this.widget();
    if (!loadedWidget) {
      return 'Loading ...';
    }
    return loadedWidget.title;
  });

  protected readonly actions = computed(() => {
    const { actions } = this.widget() ?? {};
    if (Array.isArray(actions) && actions.length > 0) {
      return actions;
    }
    return [];
  });

  protected dispatchAction(action: WorkpulseWidgetAction) {
    const widget = this.widget();
    if (widget && widget.actionDispatched) {
      widget.actionDispatched(action);
    }
  }
}
