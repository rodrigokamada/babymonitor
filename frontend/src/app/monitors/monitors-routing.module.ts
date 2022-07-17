import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MonitorsFormComponent } from './monitors-form.component';
import { MonitorsListComponent } from './monitors-list.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorsListComponent,
  },
  {
    path: 'form',
    component: MonitorsFormComponent,
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
