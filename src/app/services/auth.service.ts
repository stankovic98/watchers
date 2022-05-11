import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

interface loginRes {
  success: boolean;
  jwt: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:5000';
  isAuthenticated: boolean = false;
  isStudent: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  registerUser(user: any) {
    return firstValueFrom(this.http.post(this.url + '/register', user));
  }

  userIsAlreadyLoggedIn(jwt: any) {
    this.isAuthenticated = true;
    if (jwt.role == 'student') {
      this.isStudent = true;
      this.router.navigate(['home']);
    } else {
      this.isStudent = false;
      this.router.navigate(['admin']);
    }
  }

  logoutUser() {
    localStorage.removeItem('jwt');
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }

  loginUser(user: any) {
    return firstValueFrom<loginRes>(
      this.http.post<loginRes>(this.url + '/login', user)
    )
      .then((res) => {
        3;
        if (res.success) {
          localStorage.setItem(
            'jwt',
            JSON.stringify({ jwt: res?.jwt, role: res.role })
          );
          this.isAuthenticated = true;
          if (res.role === 'student') {
            this.router.navigate(['/home']);
            this.isStudent = true;
          } else {
            this.isStudent = false;
            this.router.navigate(['admin']);
          }
        } else {
          this.toastr.error(
            'Please check if your credentials are valid',
            'Uppsss'
          );
        }
      })
      .catch((err) => {
        console.log('/login', err);
        this.toastr.error(
          'Please check if your credentials are valid',
          'Uppsss'
        );
      });
  }

  getJWT() {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      return JSON.parse(jwt)?.jwt;
    }
    return jwt;
  }
}
