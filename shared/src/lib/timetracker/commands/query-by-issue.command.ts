import type { Command } from "../../command";
import type { TimeEntry } from "../types/time-entry";

export type QueryByIssuePayload = { query: string; limit?: number };
export type QueryByIssueCommand = Command<"timetracker:query-by-issue", QueryByIssuePayload>;
export type QueryByIssueResponse = { results: TimeEntry[] };
