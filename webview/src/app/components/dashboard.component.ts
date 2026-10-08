import { Component, ViewEncapsulation } from '@angular/core';
import { ActiveSessionWidgetComponent, TimerButtonsComponent, WidgetComponent } from '@workpulse/common';
import {
  CurrentFocusTaskWidgetComponent,
  IssueSelectorWidget,
} from '@workpulse/jira/feature-shell';
import { MonthBookingsComponent } from '@workpulse/timetracker/feature-shell';

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
