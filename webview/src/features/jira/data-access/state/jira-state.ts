import { inject, Injectable } from '@angular/core';
import { Action, State, type NgxsOnInit, type StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs';
import { FetchCurrentFocusedTask, FetchTasks, SelectIssue } from './jira-state.actions';
import type { JiraStateModel } from './jira-state.model';
import { JiraFlowFacade } from '@workpulse/core/api';

@State<JiraStateModel>({
  name: 'JiraState',
  defaults: {
    currentFocusTask: null,
    issues: null,
  },
})
@Injectable()
export class JiraState implements NgxsOnInit {
  private readonly jiraApi = inject(JiraFlowFacade);

  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.dispatch(new FetchTasks());
  }

  @Action(FetchTasks)
  protected fetchTasks(ctx: StateContext<JiraStateModel>) {
    return this.jiraApi.list().pipe(tap((list) => ctx.setState(patch({ issues: list }))));
  }

  @Action(FetchCurrentFocusedTask)
  protected fetchCurrentFocusedTask(ctx: StateContext<JiraStateModel>) {
    return this.jiraApi.getCurrentInProgressTask().pipe(tap((issue) => {
      ctx.setState(patch({ currentFocusTask: issue }));
    }));
  }

  @Action(SelectIssue)
  protected selectIssue(ctx: StateContext<JiraStateModel>, { issue }: SelectIssue) {
    ctx.setState(patch({ selectedIssue: issue }));
  }
}
