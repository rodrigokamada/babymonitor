import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { InviteComponent } from './invite.component';

const routes: Routes = [
  {
    path: '',
    component: InviteComponent,
  },
  {
    path: ':code',
    component: InviteComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class InviteRoutingModule {
}
