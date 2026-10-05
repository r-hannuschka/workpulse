import { randomUUID } from "crypto";
import type { Command, CommandContainer } from "@timetracker/api";

export function createCommandContainer<TCommand extends Command>(
  command: TCommand,
): CommandContainer<TCommand> {
  return {
    id: randomUUID(),
    command,
  };
}
