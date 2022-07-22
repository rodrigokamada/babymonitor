import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';

// Environments
import { environment } from '../../../environments/environment';

// Models
import { UsersModel } from '../../users/users.model';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });
  }

  public signUp(user: UsersModel): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      Auth.signUp({
        username: user.email,
        password: user.password,
      } as any)
      .then((result: any) => {
        observer.next(result);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  public confirmSignUp(user: UsersModel): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      Auth.confirmSignUp(user.email as string, user.code as string)
      .then((result: any) => {
        observer.next(result);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  public resendSignUp(email: string): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      Auth.resendSignUp(email)
      .then((result: any) => {
        observer.next(result);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  public signIn(user: UsersModel): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      Auth.signIn(user.email as string, user.password as string)
      .then((result: any) => {
        observer.next(result);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  public signOut(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      Auth.signOut()
      .then((result: any) => {
        observer.next(result);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  public forgotPassword(user: UsersModel): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      Auth.forgotPassword(user.email!)
      .then((result: any) => {
        observer.next(result);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  public changePassword(user: UsersModel): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      Auth.forgotPasswordSubmit(user.email!, user.code!, user.password!)
      .then((result: any) => {
        observer.next(result);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  public getSession(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      Auth.currentSession()
      .then((result: any) => {
        observer.next(result);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  public getUser(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      Auth.currentUserInfo()
      .then((result: any) => {
        if (result && result.attributes) {
          observer.next(result.attributes);
        }
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  public updateUser(user: UsersModel): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      Auth.currentUserPoolUser()
      .then((cognitoUser: any) => {
        return Auth.updateUserAttributes(cognitoUser, user);
      }).then((cognitoUser: any) => {
        observer.next(cognitoUser);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

}