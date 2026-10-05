import "reflect-metadata";
import { container } from "tsyringe";
import * as vscode from "vscode";

import { EXTENSION_CONTEXT_TOKEN } from "@core/constants";
import { TimetrackerWebviewModule } from "@module/webview";

// module importieren, muessen wir tun damit sie im bundle sind
import "./module";

export function activate(context: vscode.ExtensionContext): void {
  container.registerInstance(EXTENSION_CONTEXT_TOKEN, context);
  const webviewDisposable = vscode.commands.registerCommand("timetracker.openWebview", () => {
    container.resolve(TimetrackerWebviewModule).openDashboard();
  });

  context.subscriptions.push(webviewDisposable);
}

export function deactivate(): void {
  // @TODO shutdown time tracker

  container.clearInstances();
}
