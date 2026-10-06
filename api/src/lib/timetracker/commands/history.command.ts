import type { Command } from "../../command";

export type HistoryPayload = { date: string };
export type HistoryCommand = Command<"timetracker:history", HistoryPayload>;
