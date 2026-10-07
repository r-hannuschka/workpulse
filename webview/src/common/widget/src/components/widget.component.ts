import { Component, computed, contentChild, ViewEncapsulation } from '@angular/core';
import { JIRA_FLOW_WIDGET } from '../static/tokens';

@Component({
  selector: 'workpulse-widget',
  templateUrl: './widget.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'workpulse-widget',
  },
})
export class WidgetComponent {
  private readonly widget = contentChild(JIRA_FLOW_WIDGET);

  protected readonly title = computed(() => {
    const loadedWidget = this.widget();

    if (!loadedWidget) {
      return 'Loading ...';
    }
    return loadedWidget.title;
  });

  reloadWidget() {
    this.widget()?.refresh();
  }
}
