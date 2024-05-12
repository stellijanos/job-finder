import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { Job } from '../models/database/job';
import { Observable } from 'rxjs';

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

  create(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.apiUrl}/job/${this.tokenService.getToken()}`, job, this.httpOptions);
  }

  getAll(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`, this.httpOptions);
  }

  


}
