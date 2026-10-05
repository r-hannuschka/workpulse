import { Selector } from '@ngxs/store';
import { JiraState } from './jira-state';
import type { JiraStateModel } from './jira-state.model';

export class JiraStateSelectors {
  @Selector([JiraState])
  static issues(ctx: JiraStateModel | undefined) {
    return ctx?.issues ?? null;
  }

  @Selector([JiraState])
  static selectedIssue(ctx: JiraStateModel | undefined) {
    return ctx?.selectedIssue;
  }

  @Selector([JiraState])
  static currentFocusedTask(ctx: JiraStateModel | undefined) {
    return ctx?.currentFocusTask;
  }
}
