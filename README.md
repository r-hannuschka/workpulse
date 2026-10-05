# Timetracker VSCode Extension

Eine VSCode-Extension um Jira-Issues direkt in VSCode anzusehen und die Zeit zu tracken. Statt ständig zwischen Browser und Editor zu wechseln - alles im VSCode Panel.

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
cd timetracker_vscode
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

## Konfiguration

Öffne VSCode-Einstellungen und setze deine Jira-Daten:

```
timetracker.JIRA_API_URL      → https://deine-jira.com
timetracker.JIRA_API_TOKEN    → dein-api-token
timetracker.JIRA_USER_NAME    → deine-email@example.com
timetracker.JIRA_PROJECT_KEY  → DEIN_PROJEKTKEY
```

Optional: Passe die Status- und Issue-Type Mappings an deine Jira-Konfiguration an.

## Verwendung

1. Command Palette öffnen: `Ctrl+Shift+P` / `Cmd+Shift+P`
2. "Hello Timetracker" suchen und Enter
3. Dashboard öffnet sich - Issues werden geladen

## Entwicklung

```bash
# Extension im Watch-Mode bauen
npm run extension:watch

# Oder WebView separat entwickeln
cd webview
npm run start
```

Für Details zur Architektur und Kommunikation:
- [docs/extension-overview.md](docs/extension-overview.md) - Extension Architektur-Überblick
- [docs/extension-core.md](docs/extension-core.md) - Core Module (Command-System, Settings, Exceptions)
- [docs/extension-jira.md](docs/extension-jira.md) - Jira Module (Repository, API Client, Commands)
- [docs/extension-commands.md](docs/extension-commands.md) - Command-System im Detail
- [docs/webview.md](docs/webview.md) - Webview → Extension Kommunikation

## Lizenz

MIT - Ralf Hannuschka
