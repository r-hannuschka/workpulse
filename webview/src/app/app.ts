import { CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, inject } from '@angular/core';
import { PortalRouterService } from '@workpulse/core/portal-router';
import { ToolbarComponent } from './components/toolbar.component';

@Component({
  imports: [CdkPortalOutlet, ToolbarComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly portalRouterService = inject(PortalRouterService);
}
