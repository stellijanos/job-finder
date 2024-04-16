import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegisterUser } from '../models/register-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiUrl = environment.apiUrl;


  constructor(private http:HttpClient) { }


  registerUser(user: RegisterUser): Observable<Response> {
    return this.http.post<Response>(this.apiUrl, user);
  }


  

}
