import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RegisterUser } from '../models/register-user.model';
import { RegisterCompany } from '../models/register-company.model';
import { Response } from '../models/response.model';
import { LoginCredentials } from '../models/login-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiUrl = environment.apiUrl;



  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };



  constructor(private http: HttpClient) { }


  registerUser(user: RegisterUser): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/register-user`, user, this.httpOptions);
  }

  registerCompany(company: RegisterCompany): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/register-company`, company, this.httpOptions);
  }

  login(credentials: LoginCredentials): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/login`, credentials, this.httpOptions);
  }

  isLoggedIn(token: string) : Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/isLoggedIn/${token}`, null, this.httpOptions);
  }


}
