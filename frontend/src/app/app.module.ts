import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Modules
import { TranslocoRootModule } from './shared/modules/transloco-root.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    // Modules
    TranslocoRootModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en',
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
