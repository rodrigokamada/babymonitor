import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';
import * as AOS from 'aos';

// Services
import { CognitoService } from './shared/services/cognito.service';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  user: any;
  languagesList: any[];
  toggle: boolean;

  constructor(private viewport: ViewportScroller,
              private router: Router,
              private spinnerService: NgxSpinnerService,
              private toastrService: ToastrService,
              private translocoService: TranslocoService,
              private cognitoService: CognitoService,
              private storageService: StorageService) {
    this.languagesList = [];
    this.toggle = false;

    AOS.init();
  }

  ngOnInit(): void {
    this.storageService.user.subscribe((user: any) => {
      this.user = user;

      if (this.user && this.user.locale) {
        this.storageService.setLocale(this.user.locale);
      }
    });
  }

  public clickBrand(): void {
    if (this.storageService.isAuthenticated()) {
      this.router.navigate(['/monitors']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  public goTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }

  public changeLanguage(locale: string): void {
    if (locale) {
      this.storageService.setLocale(locale);
    }
    this.toggle = false;
  }

  public signOut(): void {
    this.spinnerService.show();

    this.cognitoService.signOut()
    .subscribe({
      next: (success: any) => {
        this.storageService.clear();
        this.spinnerService.hide();
        this.translocoService.selectTranslate('app.signOutSuccess')
      .subscribe((message: string) => this.toastrService.success(message));

        this.router.navigate(['/home']);
      }, error: (error: any) => {
        this.spinnerService.hide();
        this.translocoService.selectTranslate('error.problem')
      .subscribe((message: string) => this.toastrService.error(message));
      },
    });
  }

}
