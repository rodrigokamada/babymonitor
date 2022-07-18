import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routes
import { InviteRoutingModule } from './invite-routing.module';

// Components
import { InviteComponent } from './invite.component';

@NgModule({
  declarations: [
    // Components
    InviteComponent,
  ],
  imports: [
    CommonModule,
    // Routes
    InviteRoutingModule,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class InviteModule {
}
