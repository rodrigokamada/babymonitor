import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MonitorsComponent } from './monitors.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorsComponent,
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
export class MonitorsRoutingModule {
}
