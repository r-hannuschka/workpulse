import { RegisterCommand, type CommandHandler } from "@trueffelmafia/workpulse-sdk/command";
import type { StartTrackingCommand, TimeEntry } from "@workpulse/api";
import { container } from "tsyringe";
import { TimeTrackerService } from "../domain/time-tracker.service";

@RegisterCommand("timetracker:start-tracking")
export class StartTrackingHandler implements CommandHandler<TimeEntry> {
  constructor(private command: StartTrackingCommand) {}

  async execute(): Promise<TimeEntry> {
    const service = container.resolve(TimeTrackerService);
    const { payload } = this.command;

    if (!payload) {
      throw new Error("Es wurde kein IssueKey uebergeben");
    }

    return service.startTracking(payload.issueKey);
  }
}
