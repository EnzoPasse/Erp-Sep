import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPassword {
  constructor(private http: HttpClient) {}

  forgot(user: any): Observable<any> {
    const url = `${SERVER_API_URL}forgot`;
    return this.http.post<any>(url, { user });
  }
}
