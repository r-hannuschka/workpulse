# Command System Detail

Wie Commands funktionieren, erstellt werden und gehandhabt werden.

---

## Command Controller

**Datei:** [extension/src/core/command/src/command.bus.ts](../../extension/src/core/command/src/command.bus.ts)

```typescript
@singleton()
export class CommandController {
  private readonly TIMEOUT_MS = 30_000;
  private readonly runningCommandMap = new Map<string, Promise<...>>();

  public async exec<TCommand extends Command>(
    container: CommandContainer<TCommand>
  ): Promise<CommandResponse | CommandErrorResponse>
}
```

### Ablauf

1. **Validierung** - Prüft ob `command.type` existiert
2. **Deduplication Token** - Hash aus `command.type` + SHA256(`command.payload`)
3. **Prüfen ob Command läuft** - Wenn ja: altes Promise zurückgeben
4. **Wenn nicht: Neues Promise starten** - Mit Timeout
5. **Handler ausführen** - Aus Registry holen, instanziieren, `execute()` aufrufen
6. **Response wrappen** - `{ id, code, data }` oder `{ id, code, error }`
7. **Cleanup** - Token aus Map löschen (finally)

### Deduplication

```
Token = `${command.type}_${payloadHash.substring(0, 8)}`
```

Zwei identische Commands (gleicher Type + gleicher Payload) teilen sich ein Promise. Der Handler wird nur einmal ausgeführt, beide Aufrufer bekommen das gleiche Result.

### Timeout

```typescript
Promise.race([
  this.executeCommand(container.command),
  this.createTimeout(this.TIMEOUT_MS, `Command "${container.command.type}" hat Timeout`),
])
```

30 Sekunden Timeout. Länger → `TimeoutException` mit code 1.

### Error Wrapping

```typescript
private createErrorResponse(commandName: string, error: unknown)
```

| Exception Typ | Error Code |
|---|---|
| `BaseException` | Aus `error.code` Property |
| `Error` | 10000 |
| Unknown | 12000 |

---

## Command Registry

**Datei:** [extension/src/core/command/src/command.registry.ts](../../extension/src/core/command/src/command.registry.ts)

```typescript
@singleton()
export class CommandRegistry {
  private readonly handlerMap = new Map<string, CommandHandlerConstructor>();

  public register(type: string, ctor: CommandHandlerConstructor): void { ... }
  public get(type: string): CommandHandlerConstructor { ... }
}
```

**Logging:** Beim `register()` wird geloggt:
```
Handler registriert: "jira:get-issues"
```

**Error:** Beim `get()` für nicht registrierte Typen:
```
Kein Handler für Command-Typ gefunden: "jira:unknown"
```

---

## Command Decorator

**Datei:** [extension/src/core/command/src/command.decorator.ts](../../extension/src/core/command/src/command.decorator.ts)

```typescript
export function RegisterCommand(domain: string) {
  return function (ctor: CommandHandlerConstructor) {
    const registry = container.resolve(CommandRegistry);
    registry.register(domain, ctor);
  };
}
```

Der Decorator registriert den Handler **beim Import**. Keine manuelle Registrierung nötig.

---

## Command Handler Interface

**Datei:** [extension/src/core/command/src/command.interface.ts](../../extension/src/core/command/src/command.interface.ts)

```typescript
export interface CommandHandler<TResult = unknown> {
  execute(): Promise<TResult> | TResult;
}

export type CommandHandlerConstructor<T extends Command = Command> = new (command: T) => CommandHandler;
```

**Pattern:**
- Constructor nimmt den typisierten `Command`
- `execute()` gibt das Result zurück
- Handler wird **neu instanziiert** pro Command (kein Singleton)

---

## Helpers

### createCommandContainer

**Datei:** [extension/src/core/command/src/command.factory.ts](../../extension/src/core/command/src/command.factory.ts)

```typescript
export function createCommandContainer<TCommand extends Command>(
  command: TCommand
): CommandContainer<TCommand> {
  return {
    id: randomUUID(),
    command,
  };
}
```

Erstellt einen CommandContainer mit UUID.

### isErrorResponse

**Datei:** [extension/src/core/command/src/command.util.ts](../../extension/src/core/command/src/command.util.ts)

```typescript
export function isErrorResponse(response: CommandResponse | CommandErrorResponse): response is CommandErrorResponse {
  return response.code !== 0;
}
```

Typsicherer Check auf Error-Response.

---

## Commands aufrufen

### Von überall in der Extension

```typescript
import { CommandController, createCommandContainer, isErrorResponse } from "@core/command";

constructor(private commandController: CommandController) {}

async someMethod() {
  const result = await this.commandController.exec(
    createCommandContainer({
      type: "jira:get-issues"
    })
  );

  if (isErrorResponse(result)) {
    console.error("Fehler:", result.error.message);
    return;
  }

  console.log("Erfolgreich:", result.data);
}
```

---

## Response Format

### Success

```typescript
{
  id: "uuid",
  code: 0,
  data: /* handler result */
}
```

### Error

```typescript
{
  id: "uuid",
  code: 10000,
  error: Error { message: "..." }
}
```

---

## Error Codes

| Code | Quelle | Beschreibung |
|---|---|---|
| 0 | `CommandResponse` | Success |
| 1 | `ERROR_CODE.TIMEOUT` | Command Timeout (>30s) |
| 500+ | Custom Exceptions | Eigene Exceptions |
| 10000 | `CommandController` | Generic Error |
| 12000 | `CommandController` | Unknown Error |

---

## Bekannte Probleme

### ERROR_CODE Enum nicht vollständig

```typescript
// extension/src/core/exception/src/error.code.ts
export enum ERROR_CODE {
  TIMEOUT = 1,  // ← nur TIMEOUT definiert
}
```

Die Codes 10000 und 12000 aus `CommandController.createErrorResponse()` sollten im Enum definiert werden.

### BaseException constructor Parameter

```typescript
// extension/src/core/exception/src/base.exception.ts
constructor(message: string, private readonly e?: Error)
```

Parameter `e` wird als `error` getter ausgelesen, aber nie weiterverarbeitet. Entweder als `cause` verwenden oder entfernen.
