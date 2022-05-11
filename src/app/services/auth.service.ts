import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

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

  loginUser(user: any) {
    return firstValueFrom(this.http.post(this.url + '/login', user))
      .then((res) => {
        console.log(res);
        this.isAuthenticated = true;
        this.router.navigate(['/home']);
        return true;
      })
      .catch((err) => {
        console.log('/login', err);
        this.toastr.error(
          'Please check if your credentials are valid',
          'Uppsss'
        );
      });
  }
}
