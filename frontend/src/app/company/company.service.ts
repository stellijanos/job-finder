import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { Observable } from 'rxjs';
import { Company } from '../models/database/company';
import { ChangePassword } from '../models/user/change-password';
import { Response } from '../models/auth/response';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }


  getAllWithJobs() : Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}/companies`, this.httpOptions);
  }

  getById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/company/id/${id}`, this.httpOptions);
  }

  getByToken(): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/company/token/${this.tokenService.getToken()}`, this.httpOptions);
  }

  updateByToken(Company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/company/token/${this.tokenService.getToken()}`, Company ,this.httpOptions);
  }

  changePasswordByToken(changePassword: ChangePassword): Observable<Response> {
    return this.http.patch<Response>(`${this.apiUrl}/company/token/${this.tokenService.getToken()}`, changePassword, this.httpOptions);
  }

  deleteByToken(password: string): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/company/token/${this.tokenService.getToken()}/${password}`, this.httpOptions);
  }
}
