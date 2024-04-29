import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/database/user';
import { environment } from '../../environments/environment';
import { Response } from '../models/auth/response';
import { TokenService } from '../token/token.service';
import { ChangePassword } from '../models/user/change-password';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = environment.apiUrl + '/user';


  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }


  getAllWithSkills() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}s`, this.httpOptions);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/id/${id}`, this.httpOptions);
  }

  getByToken(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/token/${this.tokenService.getToken()}`, this.httpOptions);
  }

  updateByToken(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/token/${this.tokenService.getToken()}`, user ,this.httpOptions);
  }

  changePasswordByToken(changePassword: ChangePassword): Observable<Response> {
    return this.http.patch<Response>(`${this.apiUrl}/token/${this.tokenService.getToken()}`, changePassword, this.httpOptions);
  }

  deleteByToken(password: string): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/token/${this.tokenService.getToken()}/${password}`, this.httpOptions);
  }


}

