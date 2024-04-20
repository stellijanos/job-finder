import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RegisterUser } from '../models/register-user';
import { RegisterCompany } from '../models/register-company';
import { Response } from '../models/response.model';
import { LoginCredentials } from '../models/login-credentials';
import { RegisterResponse } from '../models/register-response';
import { LoggedInResponse } from '../models/loggedIn-response';

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


  registerUser(user: RegisterUser): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register-user`, user, this.httpOptions);
  }

  registerCompany(company: RegisterCompany): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register-company`, company, this.httpOptions);
  }

  login(credentials: LoginCredentials): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/auth/login`, credentials, this.httpOptions);
  }

  isLoggedIn(token: string) : Observable<LoggedInResponse> {
    return this.http.post<LoggedInResponse>(`${this.apiUrl}/auth/is-logged-in/${token}`, null, this.httpOptions);
  }

}
