import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  isNavbarShown = true;
  constructor() {}

  hideNavbar() {
    this.isNavbarShown = false;
  }

  showNavbar() {
    this.isNavbarShown = true;
  }

  getNavbarStatus() {
    return this.isNavbarShown;
  }
}
