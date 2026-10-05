import { CommandController, isErrorResponse } from "@core/command";
import { NotificationService } from "@core/notification";
import type { CommandContainer } from "@timetracker/api";
import { container, singleton } from "tsyringe";
import type { WebviewPanel } from "vscode";
import { TimetrackerWebView } from "./provider/timetracker-web-view";

@singleton()
export class TimetrackerWebviewModule {
  private activePanel: WebviewPanel | undefined;

  constructor(
    private readonly commandController: CommandController,
    private readonly notificationService: NotificationService,
  ) {}

  public openDashboard(): void {
    if (this.activePanel) {
      this.activePanel.reveal();
      return;
    }

    const webview = container.resolve(TimetrackerWebView);
    this.activePanel = webview.show();

    this.registerListener(this.activePanel);
    this.registerCleanup(this.activePanel);
  }

  private registerCleanup(panel: WebviewPanel): void {
    panel.onDidDispose(
      () => {
        console.log("Dashboard geschlossen");
        this.activePanel = undefined;
      },
      null,
      [],
    );
  }

  private registerListener(panel: WebviewPanel): void {
    panel.webview.onDidReceiveMessage(
      async (commandContainer: CommandContainer) => {
        const result = await this.commandController.exec(commandContainer);

        if (isErrorResponse(result)) {
          this.notificationService.showError(`Command fehlgeschlagen: ${result.error.message}`, result.error);
        }

        panel.webview.postMessage(result);
      },
      undefined,
      [],
    );
  }
}
