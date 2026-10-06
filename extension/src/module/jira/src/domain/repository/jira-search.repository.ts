import { SettingsService } from "@core/settings";
import type { IssueTypeMapping, JiraIssue, JiraIssueListItem, JiraIssueListResponse, StatusMapping } from "@workpulse/api";
import { singleton } from "tsyringe";
import { JiraApiClient } from "../../infrastructure/jira-api-client";
import type { JiraIssueDTO, JiraIssueListDTO, JiraIssueListItemDTO } from "../../infrastructure/model/jira-issue-dto";

@singleton()
export class JiraSearchRepository {
  constructor(
    private readonly api: JiraApiClient,
    private readonly settings: SettingsService,
  ) {}

  async getIssues(): Promise<JiraIssueListResponse> {
    const statusMapping = this.settings.get("STATUS_MAPPING");
    const projectKey = this.settings.get("JIRA_PROJECT_KEY");

    const statusFilter = Object.entries(statusMapping)
      .filter(([, status]) => status === "DONE")
      .map(([key]) => `status != "${key}"`)
      .join(" AND ");

    const baseQuery = `project = ${projectKey} AND assignee = currentUser()`;
    const fullQuery = statusFilter ? `${baseQuery} AND ${statusFilter}` : baseQuery;

    // Fällt automatisch auf das schlanke JiraIssueListItemDTO zurück
    const response = await this.api.post<JiraIssueListDTO>("/search", {
      jql: fullQuery,
      maxResults: 50,
      fields: ["summary", "issuetype", "priority", "status", "timetracking"],
    });

    const mappedIssues = response.issues.map((dto) => this.mapToJiraIssueList(dto));

    return {
      total: response.total,
      count: mappedIssues.length,
      data: mappedIssues,
    };
  }

  async getFocusTask(): Promise<JiraIssue | null> {
    const statusMapping = this.settings.get("STATUS_MAPPING");
    const projectKey = this.settings.get("JIRA_PROJECT_KEY");

    const inProgressKeys = Object.entries(statusMapping)
      .filter(([, status]) => status === "IN_PROGRESS")
      .map(([key]) => `status = "${key}"`);

    const statusFilter = inProgressKeys.length > 0 ? `(${inProgressKeys.join(" OR ")})` : 'statusCategory = "In Progress"';
    const fullQuery = `project = ${projectKey} AND assignee = currentUser() AND ${statusFilter} ORDER BY updated DESC`;

    const response = await this.api.post<JiraIssueListDTO<JiraIssueDTO>>("/search", {
      jql: fullQuery,
      maxResults: 1,
      fields: ["summary", "issuetype", "priority", "status", "timetracking", "description"], // Später ggf. mehr Felder für Details
      expand: ["renderedFields"]
    });

    if (!Array.isArray(response.issues) || !response.issues[0]) {
      return null;
    }

    return this.mapToJiraIssue(response.issues[0]);
  }

  private mapToJiraIssueList(dto: JiraIssueListItemDTO): JiraIssueListItem {
    const issueTypeMapping = this.settings.get("ISSUE_TYPE_MAPPING");
    const statusMapping = this.settings.get("STATUS_MAPPING");

    const issueType = issueTypeMapping[dto.fields.issuetype.name] as IssueTypeMapping[string] | undefined;
    const status = statusMapping[dto.fields.status.name] as StatusMapping[string] | undefined;

    if (!status) {
      console.warn(`[Unmapped status]: "${dto.fields.status.name}" for issue ${dto.key}`);
    }

    return {
      id: dto.id,
      key: dto.key,
      summary: dto.fields.summary,
      issueType: issueType || "FEATURE",
      priority: dto.fields.priority,
      status: status || "TO_DO",
      remainingTimeSeconds: dto.fields.timetracking?.remainingEstimateSeconds || 0,
      timeSpentSeconds: dto.fields.timetracking?.timeSpentSeconds || 0,
    };
  }

  private mapToJiraIssue(dto: JiraIssueDTO): JiraIssue {
    const base = this.mapToJiraIssueList(dto);
    const baseUrl = this.settings.get('JIRA_API_URL');

    return {
      ...base,
      jiraUrl: `${baseUrl}/browse/${dto.key}`,
      description: dto.renderedFields?.description ?? null
    };
  }
}
