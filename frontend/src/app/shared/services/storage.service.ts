import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private LOCALE: string = 'LOCALE';
  private INVITE_CODE: string = 'INVITE_CODE';

  private USER = 'USER';
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor() {
    this.userSubject = new BehaviorSubject<any>(undefined);
    this.user = this.userSubject.asObservable();

    this.init();
  }

  private init(): void {
    let user: any = localStorage.getItem(this.USER)
    if (user) {
      user = JSON.parse(user);
      this.userSubject.next(user);
    }
  }

  public setLocale(locale: string): void {
    localStorage.setItem(this.LOCALE, locale);
  }

  public getLocale(): string|undefined {
    const locale = localStorage.getItem(this.LOCALE);
    if (locale) {
      return locale;
    }

    return undefined;
  }

  public setInviteCode(code: string): void {
    localStorage.setItem(this.INVITE_CODE, code);
  }

  public getInviteCode(): string|undefined {
    const code = localStorage.getItem(this.INVITE_CODE);
    if (code) {
      return code;
    }

    return undefined;
  }

  public removeInviteCode(): void {
    localStorage.removeItem(this.INVITE_CODE);
  }

  public setUser(user: any): void {
    localStorage.setItem(this.USER, JSON.stringify(user));
    this.userSubject.next(user);

    if (user && user.locale) {
      this.setLocale(user.locale);
    }
  }

  public getUser(): any {
    return this.userSubject.value;
  }

  public isAuthenticated(): boolean {
    const user = this.getUser();
    if (user && user.token) {
      return true;
    }
    return false;
  }

  public clear(): void {
    // Keep language
    const locale = this.getLocale();

    this.setUser(null);
    localStorage.clear();
    sessionStorage.clear();

    if (locale) {
      this.setLocale(locale);
    }
  }

}
