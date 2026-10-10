import { Service } from '@angular/core';
import type {
  Command,
  CommandErrorResponse,
  CommandResponse,
} from '@workpulse/api';
import { filter, first, fromEvent, map, type Observable } from 'rxjs';

type Response<T = unknown> = CommandResponse<T> | CommandErrorResponse;

@Service()
export class VsCodeBridge {
  private readonly messageEvent$ = fromEvent<MessageEvent<Response>>(window, 'message');
  private readonly vscodeApi = acquireVsCodeApi();

  request<T = unknown>(command: Command): Observable<T> {
    const event$ = this.messageEvent$.pipe(
      filter(({ data: response }) => response.id === command.id),
      first(),
      map(({ data: response }) => {
        if (this.isErrorResponse(response)) {
          throw new Error(response.error.message);
        }

        // Defensiver Laufzeit-Check: Wenn data fehlt, werfen wir lieber einen sauberen Fehler
        return response.data as T;
      }),
    );

    this.vscodeApi.postMessage(command);
    return event$;
  }

  private isErrorResponse(
    response: CommandResponse | CommandErrorResponse,
  ): response is CommandErrorResponse {
    return response.code > 0;
  }
}
