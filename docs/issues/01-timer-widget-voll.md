# Issue: Timer Widget (vollständig)

**Prio:** P0 — Muss sein, Kern-Funktion

## Ziel

Ein Timer-Widget auf dem Dashboard mit:
- Issue-Auswahl (Dropdown mit offenen Issues)
- Timer: Start, Pause, Stop
- Live-Zeit-Anzeige (zählt hoch während Timer läuft)

## Akzeptanzkriterien

- [ ] Dropdown mit offenen Issues (über `jira:get-issues` laden)
- [ ] Timer startet mit ausgewähltem Issue
- [ ] Live-Zeit-Anzeige zählt hoch während Timer läuft
- [ ] Pause/Resume-Funktion
- [ ] Stop bucht den Zeit-Eintrag (ruft `timetracker:stop-tracking`)
- [ ] Zeit-Eintrag wird im NgXS Store gespeichert

## Backend

- `timetracker:start-tracking` — existiert, issueKey als Payload
- `timetracker:stop-tracking` — existiert, gibt duration zurück
- `timetracker:get-active-timer` — existiert

## Frontend

- NgXS State: `activeTimer: TimeEntry | null` — existiert bereits
- TimerButtonsComponent: `start(issueKey)` + `stop()` — existiert bereits
- TimerWidget: braucht Dropdown + Live-Anzeige + Pause/Resume

## Hinweis

Das Timer-Widget ist der Haupteinstiegspunkt. Issue-Auswahl + Timer = der Kern des Tools.
