import { RegisterCommand, type CommandHandler } from "@core/command";
import type { StopTrackingCommand } from "@timetracker/api";
import { container } from "tsyringe";
import { TimeTrackerService } from "../services/time-tracker.service";

@RegisterCommand("timetracker:stop-tracking")
export class StopTrackingHandler implements CommandHandler {
  async execute(): Promise<void> {
    const service = container.resolve(TimeTrackerService);
    return service.stopTracking();
  }
}
