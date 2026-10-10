import type { TimeEntry } from '@workpulse/api';

export interface TimetrackerStateModel {
  monthData: Record<string, TimeEntry[]> | null;
}
