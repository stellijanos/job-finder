import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string = 'token';

  constructor() {}

  getToken(): string {
    return localStorage.getItem(this.token) ?? '_';
  }

  setToken(token: string) {
    localStorage.setItem(this.token, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.token);
  }

}
