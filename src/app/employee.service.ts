import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  get(url :string): Observable<any> {
    return this.http.get(url);
  }

  post(url :string, json: any): Observable<any> {
    return this.http.post(url, json);
  }

  put(url :string, json: any): Observable<any> {
    return this.http.put(url, json);
  }

  delete(urlWithId :string): Observable<any> {
    return this.http.delete(urlWithId, {});
  }


}
