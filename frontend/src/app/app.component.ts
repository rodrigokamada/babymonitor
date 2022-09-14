import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import * as AOS from 'aos';

// Services
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  user: any;
  languagesList: any[];
  toggle: boolean;
  
  constructor(private viewport: ViewportScroller,
              private router: Router,
              private storageService: StorageService) {
    this.languagesList = [];
    this.toggle = false;

    AOS.init();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.onscroll = () => {
        const navbar = document.getElementsByClassName('navbar');
        if (navbar && navbar[0]) {
          if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            navbar[0].classList.add('navbar-scroll-down');
          } else {
            navbar[0].classList.remove('navbar-scroll-down');
          }
        }
      };
    }, 1000);
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
  }

}
