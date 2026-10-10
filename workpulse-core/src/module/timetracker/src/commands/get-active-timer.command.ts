import { RegisterCommand, type CommandHandler } from "@trueffelmafia/workpulse-sdk/command";
import type { TimeEntry } from "@workpulse/api";
import { container } from "tsyringe";
import { TimeTrackerService } from "../services/time-tracker.service";

@RegisterCommand("timetracker:get-active-timer")
export class GetActiveTimerHandler implements CommandHandler<TimeEntry | null> {
  async execute(): Promise<TimeEntry | null> {
    const service = container.resolve(TimeTrackerService);
    return service.getActiveTimer();
  }
}
