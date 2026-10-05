import type { TimeEntry } from '@timetracker/api';

export interface TimetrackerStateModel {
  monthData: Record<string, TimeEntry[]> | null;
}
