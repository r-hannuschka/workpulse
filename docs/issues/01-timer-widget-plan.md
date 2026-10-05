# Timer Widget — Plan

## Ziel

Dashboard bekommt ein Widget das:
- Issue aus Jira auswählbar macht (Dropdown)
- Live-Zeit anzeigt (wenn Timer läuft)
- Start/Stop Buttons hat

## Bestandsaufnahme

**Was schon funktioniert** (nix ändern):
- Extension Commands: `start-tracking`, `stop-tracking`, `get-active-timer`
- NgXS State: `activeTimer`, `FetchActiveTimer`, `StartTracking`, `StopTracking`
- NgXS State: `tasks`, `currentFocusTask` (Jira Issues)
- Facades: `TimeTrackerVsCode`, `JiraVsCode`
- Widget Shell: `WidgetComponent` mit Header/Body/Footer/Reload

**Was nicht reicht** (jetzt ändern):
- `timer-buttons.component.html` — nur `<div>start</div>`, keine Buttons
- `ActiveTimerWidgetComponent` — zeigt nur `{{ activeTimer().issueKey }}`
- Kein Dropdown zum Issue-Auswählen
- Keine Live-Zeit-Anzeige

## Änderungen

### 1. `timer-buttons.component.html` — Styled Buttons

```html
<button class="btn btn-start" (click)="start()" [disabled]="!issueKey()">Start</button>
<button class="btn btn-stop" (click)="stop()" [disabled]="isStopped()">Stop</button>
```

### 2. `timer-buttons.component.ts` — isStopped()

Neu: liest `activeTimer()` aus Store, gibt `true` wenn null.

### 3. `timer-widget.component.html` — Komplettes Layout

```html
<!-- Issue auswählen -->
<select (change)="onIssueChange($event.value)">
  <option value="">— Issue auswählen —</option>
  @for (issue of issues(); track issue.key) {
    <option [value]="issue.key">{{ issue.key }} — {{ issue.summary }}</option>
  }
</select>

<!-- Ausgewählte Issue anzeigen -->
@if (selectedIssue()) {
  <p class="selected-issue">{{ selectedIssue() }}</p>
}

<!-- Live-Zeit -->
<p class="timer-display">{{ elapsed() }}</p>

<!-- Start/Stop -->
<jiraflow-timer-buttons [issueKey]="selectedIssue()"></jiraflow-timer-buttons>
```

### 4. `timer-widget.component.ts` — Logic

Neu im Component:
- `issues()`: liest `JiraStateSelectors.tasks` → `tasks?.data ?? []`
- `selectedIssue`: Signal mit gewähltem Issue-Key
- `onIssueChange(key)`: setzt selectedIssue
- `isStopped()`: `activeTimer() === null`
- `elapsed()`: computed aus `activeTimer.startAt` → `Date.now()` → HH:MM:SS
- `ngOnInit`: dispatch `FetchTasks` und `FetchActiveTimer`

### 5. `dashboard.component.html` — Vereinfachen

Von 3 Widgets zu 2:
- Widget 1: nur `jiraflow-active-timer-widget` (ersetzt FocusTask+Buttons)
- Widget 2: `jiraflow-month-bookings`

### 6. Styles

- `timer-buttons.component.scss`: `.btn`, `.btn-start` (grün), `.btn-stop` (rot)
- `timer-widget.component.scss`: Layout (flex column), Timer-Anzeige (groß, Monospace), Trennlinien

## Reihenfolge

1. `timer-buttons.component.ts/.html/.scss` ändern (Buttons + isStopped)
2. `timer-widget.component.ts/.html/.scss` ändern (Dropdown, Live-Timer, Layout)
3. `dashboard.component.ts/.html` ändern (Widget-Ersetzung)

## Keine Änderungen

- NgXS State/Actions/Selectors
- Facades
- Extension Commands
- Shared Types
- VsCodeBridge
