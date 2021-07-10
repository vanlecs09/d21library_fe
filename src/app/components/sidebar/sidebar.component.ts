import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/_shared/services/auth.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/books', title: 'Books', icon: 'dashboard', class: '' },
  { path: '/members', title: 'Members', icon: 'person', class: '' },
  { path: '/borrows', title: 'Borrows', icon: 'book', class: '' },
];


export const MEMBERROUTES: RouteInfo[] = [
  { path: '/books', title: 'Books', icon: 'dashboard', class: '' }
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private autheService: AuthService) { }

  ngOnInit() {
    // if (this.autheService.isAdmin())
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    // else
    //   this.menuItems = MEMBERROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  signOut() {
    this.autheService.signOut();
  }
}
