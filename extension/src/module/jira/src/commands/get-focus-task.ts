import { RegisterCommand, type CommandHandler } from "@core/command";
import { container } from "tsyringe";
import { JiraSearchRepository } from "../domain/repository/jira-search.repository";
import type { JiraIssue } from "@workpulse/api";

@RegisterCommand("jira:get-focus-task")
export class FetchFocusTaskHandler implements CommandHandler<JiraIssue | null> {

  async execute(): Promise<JiraIssue | null> {
    const repository = container.resolve(JiraSearchRepository);
    return await repository.getFocusTask(); 
  }
}