import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/login`, { params: { email, password } });
  }


  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, user);
  }

  viewUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/view`);
  }

  changePassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/change-password`, { email, newPassword });
  }
}
