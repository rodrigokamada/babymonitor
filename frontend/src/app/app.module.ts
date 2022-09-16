import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

// Locales
import '@angular/common/locales/global/en';

// Interceptors
import { HttpHeaderInterceptor } from './shared/interceptors/http-header.interceptor';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { MonitorsModule } from './monitors/monitors.module';
import { TranslocoRootModule } from './shared/modules/transloco-root.module';
import { UsersModule } from './users/users.module';
import { ViewersModule } from './viewers/viewers.module';

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
    HomeModule,
    MonitorsModule,
    TranslocoRootModule,
    UsersModule,
    ViewersModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en',
    },
    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
