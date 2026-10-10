import { Component, ViewEncapsulation } from '@angular/core';
import { ActiveSessionWidgetComponent } from '@workpulse/common/session-widget';
import { WidgetComponent } from '@workpulse/common/widget';
import { IssueSelectorWidget } from '@workpulse/issue/feature-shell';
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
