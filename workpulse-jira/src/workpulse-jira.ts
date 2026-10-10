import "reflect-metadata";
import { container } from "tsyringe";
import * as vscode from "vscode";
import { JiraCommandController } from "./jira-command.controller";

export function activate(context: vscode.ExtensionContext): void {
  const hostExtension = vscode.extensions.getExtension("trueffelmafia.workpulse");

  console.debug('Extension activated');

  if (hostExtension) {
    const hostApi = hostExtension.exports;
    if (hostApi && typeof hostApi.registerSubModule === "function") {
      const commandController = container.resolve(JiraCommandController);
      hostApi.registerSubModule(commandController);
      console.debug("[Workpulse Jira]: Erfolgreich beim Workpulse Core registriert und einsatzbereit.");
    } else {
      console.error("[Workpulse Jira]: Der Core hat keine gültige registerSubModule-API freigegeben!");
    }
  }
}

export function deactivate(): void {
  // noop;
}
