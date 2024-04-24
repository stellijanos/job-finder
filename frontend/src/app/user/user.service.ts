import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/database/user';
import { environment } from '../../environments/environment';
import { Response } from '../models/auth/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = environment.apiUrl + '/user';

  private token: string = 'no';

  constructor(private http: HttpClient) { 
    this.loadToken();
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  loadToken(): void {
    while(this.token === "no") 
      this.token = localStorage.getItem('token') ?? '';
  }

  clearToken(): void {
    localStorage.removeItem('token');
    this.token = 'no';
  }


  getAllWithSkills() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}s`, this.httpOptions);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/id/${id}`, this.httpOptions);
  }

  getByToken(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/token/${this.token}`, this.httpOptions);
  }

  updateByToken(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/token/${this.token}`, user ,this.httpOptions);
  }

  deleteByToken(password: string): Observable<Response> {
    return this.http.patch<Response>(`${this.apiUrl}/token/${this.token}/${password}`, this.httpOptions);
  }

  



}
