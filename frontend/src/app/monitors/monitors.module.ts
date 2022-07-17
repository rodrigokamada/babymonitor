import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';

// Routes
import { MonitorsRoutingModule } from './monitors-routing.module';

// Services
import { MonitorsService } from './monitors.service';

// Components
import { MonitorsFormComponent } from './monitors-form.component';
import { MonitorsListComponent } from './monitors-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TranslocoModule,
    // Routes
    MonitorsRoutingModule,
  ],
  declarations: [
    // Components
    MonitorsFormComponent,
    MonitorsListComponent,
  ],
  providers: [
    // Services
    MonitorsService,
  ],
  exports: [
  ],
})
export class MonitorsModule {
}
