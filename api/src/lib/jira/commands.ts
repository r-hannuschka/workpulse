import type { Command } from "../command";
import type { JiraIssueDetails } from "./issue-details";

export type GetIssuesCommand = Command<"jira:get-issues">;
export type GetFocusTaskCommand = Command<"jira:get-focus-task">;
export type GetIssueDetailCommand = Command<"jira:get-issue-detail", { key: JiraIssueDetails["key"] }>;
