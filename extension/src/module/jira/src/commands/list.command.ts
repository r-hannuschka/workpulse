import { RegisterCommand, type CommandHandler } from "@core/command";
import type { JiraIssueListResponse } from "@workpulse/api";
import { container } from "tsyringe";
import { JiraSearchRepository } from "../domain/repository/jira-search.repository";

@RegisterCommand("jira:get-issues")
export class FetchJiraIssuesHandler implements CommandHandler<JiraIssueListResponse> {
  async execute(): Promise<JiraIssueListResponse> {
    const repository = container.resolve(JiraSearchRepository);
    return await repository.getIssues();
  }
}
