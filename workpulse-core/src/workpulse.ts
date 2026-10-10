import "reflect-metadata";
import { container } from "tsyringe";
import * as vscode from "vscode";

import { EXTENSION_CONTEXT_TOKEN } from "@core/constants";
import { WorkpulseWebviewModule } from "@module/webview";

// module importieren, muessen wir tun damit sie im bundle sind
import "./module";
import { SatelliteService } from "./core/satellite/src/satellite.service";

export async function activate(context: vscode.ExtensionContext) {
  container.registerInstance(EXTENSION_CONTEXT_TOKEN, context);

  const webviewDisposable = vscode.commands.registerCommand("workpulse.openWebview", () => {
    container.resolve(WorkpulseWebviewModule).openDashboard();
  });

  context.subscriptions.push(webviewDisposable);
  vscode.commands.executeCommand('workpulse.activated');

  const satelliteService = container.resolve(SatelliteService);
  return {
    registerSubModule: (satellite: any) => {
      satelliteService.registerSatellite(satellite);
    },
  };
}

export function deactivate(): void {
  // @TODO shutdown time tracker

  container.clearInstances();
}
