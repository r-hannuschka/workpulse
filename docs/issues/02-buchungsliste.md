# Issue: Buchungsliste (Woche)

**Prio:** P0 — Muss sein, zum Nachschauen was man gebucht hat

## Problem

Der Benutzer hat keine Übersicht, wie viele Stunden er pro Woche pro Issue gebucht hat.

## Ziel

Eine Buchungsliste mit drei Granularitäten:
- **Tag** — Details pro Tag (Issue, Start/Ende, Stunden, Notiz)
- **Woche** — Stunden pro Issue pro Woche + Gesamtwochenstunden
- **Monat** — Nur aggregierte Stunden pro Issue (keine Tagesdetails, weil da eh nicht mehr reinkommt)

## Akzeptanzkriterien

- [ ] Granularität wählbar: Tag / Woche / Monat
- [ ] Tag: Details pro Eintrag (Issue, Start/Ende, Stunden, Notiz)
  - [ ] Paging: Tag vor / zurück
- [ ] Woche: Stunden pro Issue pro Woche + Gesamtwochenstunden
  - [ ] Paging: Woche vor / zurück
- [ ] Monat: Nur Stunden pro Issue aggregiert (keine Tagesdetails)
- [ ] Klick auf Zeile öffnet Issue-Detail
- [ ] Lädt nur Zeiten die in der Extension getrackt wurden (nicht aus Jira)

## Hinweis

Das ist die **Auswertungssicht** — "Was habe ich diese Woche eigentlich gemacht?"
