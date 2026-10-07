import { Component, ViewEncapsulation } from '@angular/core';
import { ActiveSessionWidgetComponent, TimerButtonsComponent, WidgetComponent } from '@jira-flow/common';
import {
  CurrentFocusTaskWidgetComponent,
  IssueSelectorWidget,
} from '@jira-flow/jira/feature-shell';
import { MonthBookingsComponent } from '@jira-flow/timetracker/feature-shell';

@Component({
  selector: 'workpulse-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    WidgetComponent,
    MonthBookingsComponent,
    IssueSelectorWidget,
    ActiveSessionWidgetComponent,
  ],
})
export class DashboardComponent {}
