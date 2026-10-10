import type { Command } from "@workpulse/api";

export interface CommandHandler<TResult = unknown> {
  execute(): Promise<TResult> | TResult;
}

export type CommandHandlerConstructor<T extends Command = Command> = new (command: T) => CommandHandler;

