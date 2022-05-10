import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:5000';
  isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return firstValueFrom(this.http.post(this.url + '/register', user));
  }
}
