import type { Command } from "../../command";

export type DeleteEntryPayload = { id: string };
export type DeleteEntryCommand = Command<"timetracker:delete-entry", DeleteEntryPayload>;
