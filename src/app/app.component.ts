import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'watchers';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    let token = localStorage.getItem('jwt');
    if (token) {
      this.auth.userIsAlreadyLoggedIn(JSON.parse(token));
    }
  }
}
