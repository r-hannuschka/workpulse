import type { Command } from "../command";

export type LogPayload = {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  context?: string;
};

export type SendLogCommand = Command<"logger:send-log", LogPayload>;
