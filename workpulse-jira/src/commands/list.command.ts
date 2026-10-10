import { RegisterCommand, type CommandHandler } from "@trueffelmafia/workpulse-sdk/command";
import type { IssueList } from "@workpulse/api";
import { container } from "tsyringe";
import { JiraSearchRepository } from "../repository/jira-search.repository";

@RegisterCommand("issues:list")
export class FetchJiraIssuesHandler implements CommandHandler<IssueList> {
  async execute(): Promise<IssueList> {
    const repository = container.resolve(JiraSearchRepository);
    return await repository.getIssues();
  }
}
