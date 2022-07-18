import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';

// Routes
import { UsersRoutingModule } from './users-routing.module';

// Components
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TranslocoModule,
    // Routes
    UsersRoutingModule,
  ],
  declarations: [
    // Components
    UsersComponent,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class UsersModule {
}
