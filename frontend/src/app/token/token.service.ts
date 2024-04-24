import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {}

  getToken(): string {
    return localStorage.getItem('token') ?? '_';
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

}
