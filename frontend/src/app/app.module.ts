import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

// Locales
import '@angular/common/locales/global/en';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { TranslocoRootModule } from './shared/modules/transloco-root.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 15 * 1000,
      closeButton: true,
      enableHtml: true,
      progressBar: true,
    }),
    ShareButtonsModule,
    ShareIconsModule,
    // Modules
    AppRoutingModule,
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
