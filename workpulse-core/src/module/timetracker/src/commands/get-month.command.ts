import { RegisterCommand, type CommandHandler } from "@trueffelmafia/workpulse-sdk/command";
import type { TimeEntry, TimesData } from "@workpulse/api";
import { container } from "tsyringe";
import { TimeTrackerService } from "../services/time-tracker.service";

interface GetMonthCommand {
  type: "timetracker:get-month";
  payload: { month: string };
}

@RegisterCommand("timetracker:get-month")
export class GetMonthHandler implements CommandHandler<Record<string, TimeEntry[]>> {
  constructor(private command: GetMonthCommand) {}

  async execute(): Promise<TimesData> {
    const service = container.resolve(TimeTrackerService);
    return service.getMonth(this.command.payload.month);
  }
}
