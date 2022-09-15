import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services
import { StorageService } from '../services/storage.service';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private storageService: StorageService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.storageService.getUser();

    if (user && user.jwt) {
      return next.handle(
        request.clone({
          setHeaders: {
            authorization: `Bearer ${user.jwt}`,
          },
        }),
      ).pipe(
        catchError((error: any) => {
          if (error && error.status === 401) {
            this.storageService.clear();
            this.router.navigate(['/home']);
          }

          return throwError(error);
        }),
      );
    } else {
      return next.handle(request);
    }
  }

}
