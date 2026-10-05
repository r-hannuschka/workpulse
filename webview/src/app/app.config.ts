import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { JiraFlowFacade, TimeTrackerFlowFacade } from '@jira-flow/core/api';
import { SessionState } from '@jira-flow/core/state';
import { JiraState } from '@jira-flow/jira/data-access';
import { TimetrackerState } from '@jira-flow/timetracker/data-access';
import { provideStore } from '@ngxs/store';
import { JiraVsCode } from './services/jira-vscode';
import { TimeTrackerVsCode } from './services/time-tracker-vscode';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideStore([SessionState, JiraState, TimetrackerState]),
    {
      provide: JiraFlowFacade,
      useClass: JiraVsCode,
    },
    {
      provide: TimeTrackerFlowFacade,
      useClass: TimeTrackerVsCode,
    },
  ],
};
