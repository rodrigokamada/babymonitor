import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from '../../environments/environment';

export interface IContacts {
  subject: string;
  email: string;
  message: string;
  token: string;
}

@Injectable()
export class ContactsService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.server}/v1/contacts`;
  }

  public send(contact: IContacts): Observable<IContacts> {
    return this.http.post<IContacts>(`${this.url}/send`, contact);
  }

}
