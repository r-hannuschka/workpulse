import { RegisterCommand, CommandHandler } from '@trueffelmafia/workpulse-sdk/command';
import type { SendLogCommand } from "@workpulse/api";
import { container } from "tsyringe";
import { LoggerService } from "../provider/logger.service";

@RegisterCommand("logger:send-log")
export class SendLogHandler implements CommandHandler<void> {
  constructor(private command: SendLogCommand) {}

  execute(): void {
    const logger = container.resolve(LoggerService);
    const { payload } = this.command;

    if (!payload) {
      return;
    }

    logger.log(payload.level, payload.message, payload.context);
  }
}
