import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Skill } from '../models/database/skill';
import { Observable } from 'rxjs';
import { Response } from '../models/auth/response';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  create(skill: Skill): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/skill`, skill, this.httpOptions);
  }

  getAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`, this.httpOptions);
  }
}
