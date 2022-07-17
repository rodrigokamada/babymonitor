import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

// Services
import { CognitoService } from '../services/cognito.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
              private cognitoService: CognitoService) {
  }

  public canActivate(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.cognitoService.getSession()
    .pipe(
      map((session: any) => {
        if (session && session.accessToken) {
          return true;
        } else {
          this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      }),
      catchError((error: any) => {
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return of(false);
      }),
    );
  }

}
