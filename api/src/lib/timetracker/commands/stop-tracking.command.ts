import type { Command } from "../../command";

export type StopTrackingPayload = { issueKey: string };
export type StopTrackingCommand = Command<"timetracker:stop-tracking", StopTrackingPayload>;

export type StopTrackingResponse = {
  duration: number;
  date: string;
  id: string;
};
