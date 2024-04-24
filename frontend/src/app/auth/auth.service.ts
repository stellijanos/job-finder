import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RegisterUser } from '../models/auth/register-user';
import { RegisterCompany } from '../models/auth/register-company';
import { Response } from '../models/auth/response';
import { LoginCredentials } from '../models/auth/login-credentials';
import { RegisterResponse } from '../models/auth/register-response';
import { LoggedInResponse } from '../models/auth/loggedIn-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiUrl = environment.apiUrl + '/auth';

  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) { }


  registerUser(user: RegisterUser): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register-user`, user, this.httpOptions);
  }

  registerCompany(company: RegisterCompany): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register-company`, company, this.httpOptions);
  }

  login(credentials: LoginCredentials): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/login`, credentials, this.httpOptions);
  }

  isLoggedIn(token: string) : Observable<LoggedInResponse> {
    return this.http.get<LoggedInResponse>(`${this.apiUrl}/is-logged-in/${token}`, this.httpOptions);
  }

  logout(token: string) : Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/logout/${token}`, this.httpOptions);
  }

}
