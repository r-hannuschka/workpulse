import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { JiraState } from '@jira-flow/jira/data-access';
import { TimetrackerState } from '@jira-flow/timetracker/data-access';
import { provideStore } from '@ngxs/store';
import { JiraFlowFacade, TimeTrackerFlowFacade } from '@workpulse/core/api';
import { providePortalRouter, Routes } from '@workpulse/core/portal-router';
import { SessionState } from '@workpulse/core/state';
import { routerConfig } from './router.config';
import { JiraVsCode } from './services/jira-vscode';
import { TimeTrackerVsCode } from './services/time-tracker-vscode';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideStore([SessionState, JiraState, TimetrackerState]),
    providePortalRouter(routerConfig),
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
