import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogin = true;
  constructor(private navbar: NavbarService) {}

  ngOnInit(): void {
    this.navbar.hideNavbar();
  }

  ngOnDestroy(): void {
    this.navbar.showNavbar();
  }

  toggleIsLogin() {
    this.isLogin = !this.isLogin;
  }
}
