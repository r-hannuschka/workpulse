import { RegisterCommand, type CommandHandler } from "@core/command";
import { TimeTrackerService } from "../services/time-tracker.service";
import { container } from "tsyringe";
import type { StartTrackingCommand, StartTrackingResponse } from "@workpulse/api";

@RegisterCommand("timetracker:start-tracking")
export class StartTrackingHandler implements CommandHandler<StartTrackingResponse> {
  constructor(private command: StartTrackingCommand) {}

  async execute(): Promise<StartTrackingResponse> {
    const service = container.resolve(TimeTrackerService);
    const { payload } = this.command;

    if (!payload) {
      throw new Error('Es wurde kein IssueKey uebergeben');
    }

    return service.startTracking(payload.issueKey);
  }
}
