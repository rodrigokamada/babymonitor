import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { TranslocoRootModule } from './shared/modules/transloco-root.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
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
