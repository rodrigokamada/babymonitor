import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ViewersListComponent } from './viewers-list.component';

const routes: Routes = [
  {
    path: '',
    component: ViewersListComponent,
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
export class ViewersRoutingModule {
}
