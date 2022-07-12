import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

// Routes
import { MonitorsRoutingModule } from './monitors-routing.module';

// Components
import { MonitorsComponent } from './monitors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslocoModule,
    // Routes
    MonitorsRoutingModule,
  ],
  declarations: [
    // Components
    MonitorsComponent,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class MonitorsModule {
}
