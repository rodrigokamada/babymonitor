import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
              private storageService: StorageService) {
  }

  public canActivate(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.storageService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });

    return false;
  }

}
