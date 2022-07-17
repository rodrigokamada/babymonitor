import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';

// Routes
import { ViewersRoutingModule } from './viewers-routing.module';

// Services
import { ViewersService } from './viewers.service';

// Components
import { ViewersComponent } from './viewers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TranslocoModule,
    // Routes
    ViewersRoutingModule,
  ],
  declarations: [
    // Components
    ViewersComponent,
  ],
  providers: [
    // Services
    ViewersService,
  ],
  exports: [
  ],
})
export class ViewersModule {
}
