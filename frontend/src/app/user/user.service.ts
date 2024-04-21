import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/database/user';
import { environment } from '../../environments/environment';
import { Response } from '../models/auth/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  private apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }


  getUser(token: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${token}`, this.httpOptions);
  }

  update(token: string, user: User, ): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/${token}`, user ,this.httpOptions);
  }

  delete(token: string, password: string, ): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/user/${token}/${password}`, this.httpOptions);
  }

}
