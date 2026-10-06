import { CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, inject, signal } from '@angular/core';
import { PortalRouterService } from '@workpulse/core/portal-router';

@Component({
  imports: [CdkPortalOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly portalRouterService = inject(PortalRouterService);
}
