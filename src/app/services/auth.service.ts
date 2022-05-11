import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

interface loginRes {
  success: boolean;
  jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:5000';
  isAuthenticated: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  registerUser(user: any) {
    return firstValueFrom(this.http.post(this.url + '/register', user));
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
        if (res.success) {
          localStorage.setItem('jwt', res?.jwt);
          this.isAuthenticated = true;
          this.router.navigate(['/home']);
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
    return localStorage.getItem('jwt');
  }
}
