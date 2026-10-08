import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, type RippleGlobalOptions } from '@angular/material/core';
import { JiraState } from '@workpulse/jira/data-access';
import { TimetrackerState } from '@workpulse/timetracker/data-access';
import { provideStore } from '@ngxs/store';
import { JiraFlowFacade, TimeTrackerFlowFacade } from '@workpulse/core/api';
import { providePortalRouter } from '@workpulse/core/portal-router';
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
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: { disabled: true } satisfies RippleGlobalOptions,
    },
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
