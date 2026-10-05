import type { TimeEntry } from '@timetracker/api';

export interface SessionStateModel {
  activeSession: TimeEntry | null;
}
