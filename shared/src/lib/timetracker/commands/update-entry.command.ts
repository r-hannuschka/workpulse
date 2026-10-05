import type { Command } from "../../command";
import type { TimeEntry } from "../types/time-entry";

export type UpdateEntryPayload = {
  entryId: string;
  patch: Pick<TimeEntry, "startAt" | "endAt">;
};

export type UpdateEntryCommand = Command<"timetracker:update-entry", UpdateEntryPayload>;
