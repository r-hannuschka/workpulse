import { Service } from '@angular/core';
import type {
  Command,
  CommandContainer,
  CommandErrorResponse,
  CommandResponse,
} from '@timetracker/api';
import { filter, first, fromEvent, map, type Observable } from 'rxjs';

type Response<T = unknown> = CommandResponse<T> | CommandErrorResponse;

@Service()
export class VsCodeBridge {
  private readonly messageEvent$ = fromEvent<MessageEvent<Response>>(window, 'message');
  private readonly vscodeApi = acquireVsCodeApi();

  request<T = unknown>(command: Command): Observable<T> {
    const container: CommandContainer<Command> = {
      id: crypto.randomUUID(),
      command,
    };

    this.vscodeApi.postMessage(container);

    return this.messageEvent$.pipe(
      filter(({ data: response }) => response.id === container.id),
      first(),
      map(({ data: response }) => {
        if (this.isErrorResponse(response)) {
          throw new Error(response.error.message);
        }

        // Defensiver Laufzeit-Check: Wenn data fehlt, werfen wir lieber einen sauberen Fehler
        return response.data as T;
      }),
    );
  }

  private isErrorResponse(
    response: CommandResponse | CommandErrorResponse,
  ): response is CommandErrorResponse {
    return response.code > 0;
  }
}
