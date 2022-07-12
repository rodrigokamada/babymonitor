import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';

// Environments
import { environment } from '../../environments/environment';

// Routes
import { HomeRoutingModule } from './home-routing.module';

// Services
import { ContactsService } from './contacts.service';

// Components
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    // Components
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslocoModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    // Routes
    HomeRoutingModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.google.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
    // Services
    ContactsService,
  ],
  exports: [
  ],
})
export class HomeModule {
}
