import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from '../../environments/environment';

// Models
import { ViewersModel } from './viewers.model';

@Injectable()
export class ViewersService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.server}/v1/viewers`;
  }

  public insertByMonitorCode(code: string): Observable<ViewersModel> {
    const viewer = new ViewersModel();
    viewer.monitor = {
      code,
    };
    return this.http.post<ViewersModel>(this.url, viewer);
  }

}
