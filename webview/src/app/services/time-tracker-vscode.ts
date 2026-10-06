import { inject } from '@angular/core';
import type { ITimeTrackerFlowFacade } from '@jira-flow/core/api';
import type {
  GetActiveTimerCommand,
  GetPeriodCommand,
  StartTrackingCommand,
  StartTrackingResponse,
  StopTrackingCommand,
  TimeEntry,
  TimeEntryList,
} from '@workpulse/api';
import type { Observable } from 'rxjs';
import { VsCodeBridge } from './vscode-bridge';

export class TimeTrackerVsCode implements ITimeTrackerFlowFacade {
  private readonly vscodeBridge = inject(VsCodeBridge);

  startTracking(issueKey: string): Observable<StartTrackingResponse> {
    const command: StartTrackingCommand = {
      type: 'timetracker:start-tracking',
      payload: { issueKey },
    };
    return this.vscodeBridge.request<StartTrackingResponse>(command);
  }

  stopTracking(): Observable<{ duration: number; date: string; id: string }> {
    const command: StopTrackingCommand = {
      type: 'timetracker:stop-tracking',
    };
    return this.vscodeBridge.request<{ duration: number; date: string; id: string }>(command);
  }

  getPeriod(startDate: string, endDate?: string): Observable<TimeEntryList | undefined> {
    const command: GetPeriodCommand = {
      type: 'timetracker:get-period',
      payload: { startDate, endDate },
    };
    return this.vscodeBridge.request<TimeEntryList>(command);
  }

  getActiveTimer(): Observable<TimeEntry | null> {
    const command: GetActiveTimerCommand = {
      type: 'timetracker:get-active-timer',
    };
    return this.vscodeBridge.request<TimeEntry | null>(command);
  }

  getMonth(month: string): Observable<Record<string, TimeEntry[]>> {
    const command = {
      type: 'timetracker:get-month',
      payload: { month },
    };
    return this.vscodeBridge.request<Record<string, TimeEntry[]>>(command);
  }
}
