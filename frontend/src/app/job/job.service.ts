import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { Job } from '../models/database/job';
import { Observable } from 'rxjs';
import { Response } from '../models/auth/response';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  create(job: Job): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/company/${this.tokenService.getToken()}/job`, job, this.httpOptions);
  }

  getAll(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`, this.httpOptions);
  }

  update(job: Job): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/company/${this.tokenService.getToken()}/job`, job, this.httpOptions);
  }

  
  delete(id: Number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/company/${this.tokenService.getToken()}/job/${id}`, this.httpOptions);
  }

  


}
