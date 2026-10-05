import { Selector } from '@ngxs/store';
import type { SessionStateModel } from './session.state-model';
import { SessionState } from './session.state';

export class SessionStateSelectors {
  @Selector([SessionState])
  static activeSession(ctx: SessionStateModel | undefined) {
    return ctx?.activeSession ?? null; 
  }
}
