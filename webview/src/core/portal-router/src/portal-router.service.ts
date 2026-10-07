import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injector, resource, Service, signal } from '@angular/core';
import { RouteParams, Routes } from './route';

@Service()
export class PortalRouterService {
  private readonly activeRoute = signal<{ path: string; params?: RouteParams } | null>(null);
  private readonly injector = inject(Injector);

  private readonly routeConfig = inject(Routes);

  navigate<TParams extends RouteParams>(path: string, params?: TParams): void {
    this.activeRoute.set({
      path,
      params,
    });
  }

  readonly activeView = resource({
    params: () => ({ route: this.activeRoute() }),
    loader: async ({ params }) => {
      const { route } = params;

      const matchedRoute = this.routeConfig.find(({ path }) => path === route?.path);
      if (matchedRoute) {
        return new ComponentPortal(await matchedRoute.component(), null, this.createInjector(route?.params));
      }

      const routeEntry = this.routeConfig.find((routeEntry) => routeEntry.default === true);
      if (routeEntry) {
        return new ComponentPortal(await routeEntry.component());
      }

      throw new Error('Could not find any route');
    },
  });

  getCurrentPath(): string | null {
    return this.activeRoute()?.path ?? null;
  }

  private createInjector(params?: RouteParams) {
    if (!params) {
      return this.injector;
    }

    return Injector.create({
      providers: [
        {
          provide: RouteParams,
          useValue: params,
        },
      ],
      parent: this.injector,
    });
  }
}
