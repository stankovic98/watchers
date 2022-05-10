import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLogin = true;
  constructor() {}

  ngOnInit(): void {}

  toggleIsLogin() {
    this.isLogin = !this.isLogin;
  }
}
