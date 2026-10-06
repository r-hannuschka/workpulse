# Workpulse VSCode Extension

Eine VSCode-Extension um Jira-Issues direkt in VSCode anzusehen und die Zeit zu tracken. Statt ständig zwischen Browser und Editor zu wechseln – alles im VSCode Panel.

## Was kann es?

- Jira-Issues aus deinem Projekt anzeigen
- Status und verbrauchte Zeit sehen
- Direkt aus VSCode auf deine Jira-Instanz zugreifen

## Voraussetzungen

- VSCode >= 1.105.0
- Node.js >= 18
- Jira-Instanz mit API-Zugang

## Installation

### 1. Code clonen und Dependencies installieren

```bash
git clone <repo-url>
cd workpulse
npm install
```

### 2. Bauen

```bash
npm run extension:build && npm run webview:build
```

### 3. In VSCode starten

Im Extension-Ordner:
```bash
code .
```

Dann `F5` drücken um die Extension im Debug-Modus zu starten.
Die Umgebungsvariablen für Jira werden über `.vscode/launch.json` definiert.

## Konfiguration

### Entwicklung

`.vscode/launch.template.json` nach `.vscode/launch.json` kopieren, umbenennen und die Jira-Daten anpassen:

```json
"env": {
  "JIRA_API_URL": "https://deine-jira.company.com",
  "JIRA_API_TOKEN": "dein-api-token",
  "JIRA_USER_NAME": "deine-email@example.com",
  "JIRA_PROJECT_KEY": "PROJEKTKEY"
}
```

### Produktions-Betrieb

Für den Produktiveinsatz die Jira-Daten in den VSCode-Einstellungen konfigurieren:

```
workpulse.JIRA_API_URL      → https://deine-jira.com
workpulse.JIRA_API_TOKEN    → dein-api-token
workpulse.JIRA_USER_NAME    → deine-email@example.com
workpulse.JIRA_PROJECT_KEY  → DEIN_PROJEKTKEY
```

Optional: Passe die Status- und Issue-Type Mappings (`workpulse.STATUS_MAPPING`, `workpulse.ISSUE_TYPE_MAPPING`) an deine Jira-Konfiguration an.

## Verwendung

1. Command Palette öffnen: `Ctrl+Shift+P` / `Cmd+Shift+P`
2. "Workpulse: open webview" suchen und Enter
3. Dashboard öffnet sich - Issues werden geladen

## Build & Watch

```bash
# Extension im Watch-Mode bauen
npm run extension:watch

# Oder WebView separat entwickeln
cd webview
npm run start
```

- [docs/extension-overview.md](docs/extension-overview.md) - Extension Architektur-Überblick
- [docs/extension-core.md](docs/extension-core.md) - Core Module (Command-System, Settings, Exceptions)
- [docs/extension-jira.md](docs/extension-jira.md) - Jira Module (Repository, API Client, Commands)
- [docs/extension-commands.md](docs/extension-commands.md) - Command-System im Detail
- [docs/webview.md](docs/webview.md) - Webview → Extension Kommunikation

## Lizenz

MIT - Ralf Hannuschka
