import { RegisterCommand, type CommandHandler } from "@core/command";
import type { GetIssueDetailCommand, JiraIssueDetails } from "@workpulse/api";
import { container, inject } from "tsyringe";
import { JiraIssueRepository } from "../domain/repository/jira-issue.repository";

interface GetIssueDetailCommandPayload {
  issueKey: string;
}

@RegisterCommand("jira:get-issue-detail")
export class GetIssueDetailHandler implements CommandHandler<JiraIssueDetails> {

  constructor(private readonly command: GetIssueDetailCommand) {}

  async execute(): Promise<JiraIssueDetails> {
    const jiraIssueRepository = container.resolve(JiraIssueRepository);
    return await jiraIssueRepository.getIssueByKey(this.command.payload.key);
  }
}
