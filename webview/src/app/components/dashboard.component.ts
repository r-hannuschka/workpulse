import { Component } from '@angular/core';
import { TimerButtonsComponent, WidgetComponent } from '@jira-flow/common';
import {
  CurrentFocusTaskWidgetComponent,
  IssueSelectorWidget,
} from '@jira-flow/jira/feature-shell';
import { MonthBookingsComponent } from '@jira-flow/timetracker/feature-shell';

@Component({
  selector: 'jiraflow-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    WidgetComponent,
    MonthBookingsComponent,
    IssueSelectorWidget,
  ],
})
export class DashboardComponent {}
