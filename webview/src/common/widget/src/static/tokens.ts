import { InjectionToken, type Signal } from '@angular/core';
import type { WorkpulseWidget } from '../interfaces/workpulse-widget';

export const WORKPULSE_WIDGET = new InjectionToken<WorkpulseWidget>(`Widget welches angezeigt wird`);
