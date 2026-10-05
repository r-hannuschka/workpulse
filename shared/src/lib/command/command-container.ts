export interface Command<TType extends string = string, TPayload = unknown> {
  readonly type: TType;
  readonly payload?: TPayload;
}

export interface CommandContainer<TCommand extends Command = Command> {
  readonly id: string;
  readonly command: TCommand;
}
