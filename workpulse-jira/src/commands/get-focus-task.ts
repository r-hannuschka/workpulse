import { RegisterCommand, CommandHandler } from "@trueffelmafia/workpulse-sdk/command";
import type { FocusedIssue } from "@workpulse/api";

@RegisterCommand("focus:get-task")
export class FetchFocusTaskHandler implements CommandHandler<FocusedIssue | null> {

  async execute(): Promise<FocusedIssue | null> {
    // TODO: Implement
    return null;
  }
}