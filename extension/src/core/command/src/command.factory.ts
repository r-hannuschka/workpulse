import { randomUUID } from "crypto";
import type { Command, CommandContainer } from "@workpulse/api";

export function createCommandContainer<TCommand extends Command>(
  command: TCommand,
): CommandContainer<TCommand> {
  return {
    id: randomUUID(),
    command,
  };
}
