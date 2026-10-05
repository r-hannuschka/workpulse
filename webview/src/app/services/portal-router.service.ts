import { ComponentPortal } from '@angular/cdk/portal';
import { resource, Service, signal } from '@angular/core';
import { routerConfig } from '../router.config';

type Routes = keyof typeof routerConfig;

@Service()
export class PortalRouterService {
  private readonly activeRoute = signal<Routes>('dashboard');

  setRoute(route: Routes): void {
    this.activeRoute.set(route);
  }

  readonly activeView = resource({
    params: () => ({ activatedRoute: this.activeRoute() }),
    loader: async ({ params }) => {
      const { activatedRoute } = params;
      return new ComponentPortal(await routerConfig[activatedRoute]());
    },
  });
}
