import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { Observable } from 'rxjs';
import { Response } from '../models/auth/response';
import { Category } from '../models/database/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  create(category: Category): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/category`, category, this.httpOptions);
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`, this.httpOptions);
  }

}
