import type { TimeEntry } from '@workpulse/api';

export interface SessionStateModel {
  activeSession: TimeEntry | null;
}
