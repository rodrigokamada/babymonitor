import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './shared/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'monitors',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
  },
  {
    path: 'monitors',
    loadChildren: () => import('./monitors/monitors.module').then(mod => mod.MonitorsModule),
    canActivate: [ AuthenticationGuard ],
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule),
    canActivate: [ AuthenticationGuard ],
  },
  {
    path: 'viewers',
    loadChildren: () => import('./viewers/viewers.module').then(mod => mod.ViewersModule),
    canActivate: [ AuthenticationGuard ],
  },
  {
    path: '**',
    redirectTo: 'monitors'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      enableTracing: false,
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
