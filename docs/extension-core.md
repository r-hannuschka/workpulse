# Core Module Dokumentation

Die Core-Module sind die Grundbausteine: Command-System, Settings, Exceptions und Notifications. Sie werden von allen anderen Modulen benutzt.

---

## Command System

Das Command-System ist die zentrale Kommunikationsschnittstelle zwischen Webview und Extension. Alle Commands laufen über den `CommandController`.

### CommandController

**Datei:** [extension/src/core/command/src/command.bus.ts](../extension/src/core/command/src/command.bus.ts)

Hauptklasse die Commands ausführt.

```typescript
@singleton()
export class CommandController {
  public async exec(
    container: CommandContainer<TCommand>
  ): Promise<CommandResponse | CommandErrorResponse>
}
```

**Responsibilities:**
- **Deduplikation** - Gleicher Command (type + payload) → ein Promise
- **Timeout-Schutz** - 30 Sekunden Limit pro Command
- **Error Wrapping** - Alle Errors werden in strukturierte Responses gewandelt
- **Response-ID** - Jeder Aufrufer bekommt seine container.id zurück

### Command Registry

**Datei:** [extension/src/core/command/src/command.registry.ts](../extension/src/core/command/src/command.registry.ts)

Speichert Command-Handler nach Typ.

```typescript
@singleton()
export class CommandRegistry {
  register(type: string, ctor: CommandHandlerConstructor): void
  get(type: string): CommandHandlerConstructor
}
```

### Command Decorator

**Datei:** [extension/src/core/command/src/command.decorator.ts](../extension/src/core/command/src/command.decorator.ts)

Automatisiert die Handler-Registrierung.

```typescript
export function RegisterCommand(domain: string) {
  return function (ctor: CommandHandlerConstructor) {
    const registry = container.resolve(CommandRegistry);
    registry.register(domain, ctor);
  };
}
```

**Wichtig:** Der Decorator feuert beim **Import** der Klasse. Der Handler ist dann sofort registriert.

### Command Handler

**Datei:** [extension/src/core/command/src/command.interface.ts](../extension/src/core/command/src/command.interface.ts)

```typescript
export interface CommandHandler<TResult = unknown> {
  execute(): Promise<TResult> | TResult;
}

export type CommandHandlerConstructor<T extends Command = Command> = new (command: T) => CommandHandler;
```

**Pattern:**
- Constructor nimmt den typisierten `Command`
- `execute()` gibt das Result zurück
- Handler wird **neu instanziiert** für jeden Command (kein Singleton)

### Helpers

```typescript
// command.util.ts - Response prüfen
export function isErrorResponse(response: CommandResponse | CommandErrorResponse): response is CommandErrorResponse

// command.factory.ts - CommandContainer erstellen
export function createCommandContainer<TCommand extends Command>(command: TCommand): CommandContainer<TCommand>
```

### Response Format

```typescript
// Success (code === 0)
{ id: "uuid", code: 0, data: /* result */ }

// Error (code > 0)
{ id: "uuid", code: 500, error: Error }
```

Siehe auch [EXTENSION_COMMANDS.md](EXTENSION_COMMANDS.md) für Command-Details.

---

## Settings Service

**Datei:** [extension/src/core/settings/src/settings.service.ts](../extension/src/core/settings/src/settings.service.ts)

Liest VSCode-Einstellungen für Jira-Konfiguration.

```typescript
@singleton()
export class SettingsService {
  get(key: SettingKey): unknown
}
```

**Verfügbare Settings:**

| Key | Typ | Beschreibung |
|---|---|---|
| `JIRA_API_URL` | string | Base URL der Jira REST API |
| `JIRA_API_TOKEN` | string | API Token für Authentifizierung |
| `JIRA_USER_NAME` | string | Benutzername/E-Mail |
| `JIRA_PROJECT_KEY` | string | Jira Projekt-Schlüssel |
| `ISSUE_TYPE_MAPPING` | object | Mapping von Jira-Tickettypen |
| `STATUS_MAPPING` | object | Mapping von Jira-Status |

### Leselogik

```typescript
get(key: SettingKey): unknown {
  return process.env[key] ?? workspace.getConfiguration("jiraTimeTracker").get(key);
}
```

1. Zuerst `process.env` (für Entwicklung/CI)
2. Dann VSCode-Settings unter `jiraTimeTracker`

---

## Notification Service

**Datei:** [extension/src/core/notification/src/notification.service.ts](../extension/src/core/notification/src/notification.service.ts)

VSCode-Benachrichtigungen.

```typescript
@singleton()
export class NotificationService {
  showError(message: string, error?: Error): void
  showWarning(message: string): void
  showInfo(message: string): void
}
```

**Verwendung:**
- `showError` von `TimetrackerWebviewModule` für Command-Fehler
- `showError` von `JiraApiClient` für API-Fehler
- `showWarning`/`showInfo` für User-Feedback

---

## Exception System

### Basisklasse

**Datei:** [extension/src/core/exception/src/base.exception.ts](../extension/src/core/exception/src/base.exception.ts)

```typescript
export class BaseException extends Error {
  protected readonly errorCode: number = 1;

  get code(): number { return this.errorCode; }
  get error(): Error | undefined { return this.e; }
}
```

**Verwendung:**

```typescript
class MyException extends BaseException {
  protected errorCode = 500;

  constructor(message: string) {
    super(message);
  }
}
```

### TimeoutException

**Datei:** [extension/src/core/exception/src/timeout.exception.ts](../extension/src/core/exception/src/timeout.exception.ts)

```typescript
export class TimeoutException extends BaseException {
  protected errorCode = ERROR_CODE.TIMEOUT; // 1
}
```

Wird vom `CommandController` beim Command-Timeout (>30s) geworfen.

### Exception Hierarchie

```
Error
  └── BaseException (extends Error)
        ├── errorCode: number (default 1)
        └── error: Error | undefined (optional chained exception)

TimeoutException (extends BaseException)
  └── errorCode = ERROR_CODE.TIMEOUT (1)
```

### Exception Handhabung im CommandController

Der `CommandController.createErrorResponse()` wandelt Exceptions in Response-Codes:

| Exception Typ | Error Code |
|---|---|
| `BaseException` | Aus `errorCode` Property |
| `Error` | 10000 |
| Unknown | 12000 |

---

## Error Codes

**Datei:** [extension/src/core/exception/src/error.code.ts](../extension/src/core/exception/src/error.code.ts)

```typescript
export enum ERROR_CODE {
  TIMEOUT = 1,
}
```

**CommandController verwendet:**

| Code | Bedeutung |
|---|---|
| 0 | Success |
| 1 | Timeout |
| 10000 | Generic Error |
| 12000 | Unknown Error |

---

## Constants

**Datei:** [extension/src/core/constants/src/token.ts](../extension/src/core/constants/src/token.ts)

```typescript
export const EXTENSION_CONTEXT_TOKEN = Symbol('ExtensionContext');
```

DI-Token für den VSCode Extension Context. Wird in `activate()` registriert und von `TimetrackerWebView` injiziert.
