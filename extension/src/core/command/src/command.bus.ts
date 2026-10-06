import { BaseException, TimeoutException } from "@core/exception";
import type { Command, CommandContainer, CommandErrorResponse, CommandResponse } from "@workpulse/api";
import { createHash } from "crypto";
import { singleton } from "tsyringe";
import { CommandRegistry } from "./command.registry";

export type { CommandErrorResponse, CommandResponse };

@singleton()
export class CommandController {
  private readonly TIMEOUT_MS = 30_000;
  private readonly runningCommandMap = new Map<string, Promise<{ code: number; data?: any } | { code: number; error: Error }>>();

  constructor(private readonly commandRegistry: CommandRegistry) {}

  // Public API
  public async exec<TCommand extends Command>(container: CommandContainer<TCommand>): Promise<CommandResponse | CommandErrorResponse> {
    if (!container.command.type) {
      throw new Error("Command-Typ ist erforderlich");
    }

    const token = this.createDeduplicationToken(container.command);

    // Dedup: zwei identische Commands teilen sich ein Promise
    let runningCommand = this.runningCommandMap.get(token);
    if (!runningCommand) {
      runningCommand = Promise.race([
        this.executeCommand(container.command),
        this.createTimeout(this.TIMEOUT_MS, `Command "${container.command.type}" hat Timeout nach 30 Sekunden`),
      ])
        .catch((error: unknown) => this.createErrorResponse(container.command.type, error))
        .finally(() => this.runningCommandMap.delete(token));

      this.runningCommandMap.set(token, runningCommand);
    }

    // Jeder Aufrufer bekommt seine Container-ID in der Response
    const response = await runningCommand;
    return {
      id: container.id,
      ...response,
    } as CommandResponse | CommandErrorResponse;
  }

  // Execution
  private async executeCommand(command: Command): Promise<{ code: number; data?: any }> {
    const commandEntity = this.commandRegistry.get(command.type);
    const handlerInstance = new commandEntity(command);
    const result = await handlerInstance.execute();

    return {
      code: 0,
      data: result,
    };
  }

  // Error Handling
  private createErrorResponse(commandName: string, error: unknown): { code: number; error: Error } {
    if (error instanceof BaseException) {
      return {
        code: error.code,
        error,
      };
    }

    if (error instanceof Error) {
      return {
        code: 10_000,
        error,
      };
    }

    return {
      code: 12_000,
      error: new BaseException(`${commandName}: Ein unbekannter Fehler ist aufgetreten`),
    };
  }

  // Utilities
  private createDeduplicationToken(command: Command): string {
    const payloadHash = createHash("sha256")
      .update(JSON.stringify(command.payload ?? {}))
      .digest("hex")
      .substring(0, 8);
    return `${command.type}_${payloadHash}`;
  }

  private createTimeout(ms: number, errorMessage: string): Promise<never> {
    const timeoutException = new TimeoutException(errorMessage);
    return new Promise((_, reject) => setTimeout(() => reject(timeoutException), ms));
  }
}
