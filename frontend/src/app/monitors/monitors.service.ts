import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from '../../environments/environment';

import { MonitorsModel } from './monitors.model';

@Injectable()
export class MonitorsService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.server}/v1/monitors`;
  }

  public find(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}`);
  }

  public findById(id: string): Observable<MonitorsModel> {
    return this.http.get<MonitorsModel>(`${this.url}/${id}`);
  }

  public insertOrUpdate(monitor: MonitorsModel): Observable<MonitorsModel> {
    if (monitor.id) {
      return this.http.put<MonitorsModel>(`${this.url}/${monitor.id}`, monitor);
    } else {
      return this.http.post<MonitorsModel>(this.url, monitor);
    }
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
