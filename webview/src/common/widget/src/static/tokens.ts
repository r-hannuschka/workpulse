import { InjectionToken, type Signal } from '@angular/core';
import type { JiraFlowWidget } from '../interfaces/jira-flow-widget';

export const JIRA_FLOW_WIDGET = new InjectionToken<JiraFlowWidget>(`Widget welches angezeigt wird`);
