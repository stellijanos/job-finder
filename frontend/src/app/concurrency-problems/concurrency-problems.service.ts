import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { Observable } from 'rxjs';
import { Response } from '../models/auth/response';

@Injectable({
  providedIn: 'root'
})
export class ConcurrencyProblemsService {

  private apiUrl = environment.apiUrl + '/concurrencies';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  lost_update(): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/lost-update`, this.httpOptions);
  }

  dirty_read(): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/dirty-read`, this.httpOptions);
  }

  incorrect_summary(): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/incorrect-summary`, this.httpOptions);
  }

  unrepeatable_read(): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/unrepeatable-read`, this.httpOptions);
  }

  phantom_read(): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/phantom-read`, this.httpOptions);
  }
  
}
