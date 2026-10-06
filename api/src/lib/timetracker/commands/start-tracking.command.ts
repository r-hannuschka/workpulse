import type { Command } from "../../command";
import type { TimeEntry } from "../types/time-entry";

export type StartTrackingPayload = {
  issueKey: string;
};

export type StartTrackingCommand = Command<"timetracker:start-tracking", StartTrackingPayload>;
export type StartTrackingResponse = TimeEntry;
