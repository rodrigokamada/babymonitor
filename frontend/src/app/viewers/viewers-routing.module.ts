import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ViewersComponent } from './viewers.component';

const routes: Routes = [
  {
    path: '',
    component: ViewersComponent,
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
