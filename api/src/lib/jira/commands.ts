import type { Command } from "../command";

export type GetIssuesCommand = Command<'jira:get-issues'>;
export type GetFocusTaskCommand = Command<'jira:get-focus-task'>
