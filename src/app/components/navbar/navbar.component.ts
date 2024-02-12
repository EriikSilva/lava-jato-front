import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: any;
  nm_usuario: any;
  themeSelection: boolean = false;
  isVisible: boolean = false;

  image64: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    @Inject(DOCUMENT) private document: Document
  ) {
    let theme = window.localStorage.getItem('theme');
    if (theme) {
      this.themeSelection = theme == 'dark' ? true : false;
      this.changeTheme(this.themeSelection);
    }
  }

  imgFront() {
    this.image64 = localStorage.getItem('image');
  }

  changeTheme(state: boolean) {
    let theme = state ? 'dark' : 'light';
    window.localStorage.setItem('theme', theme);
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    themeLink.href = 'lara-' + theme + '-blue' + '.css';
  }

  ngOnInit(): void {
    this.imgFront()
    this.primengConfig.ripple = true;

    this.nm_usuario = localStorage.getItem('nm_usuario');

    this.items = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        routerLink: ['/perfil'],
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  logout() {
    this.loginService.removeToken();
    this.loginService.removeUser();
    this.loginService.removeCdUsuario();
    this.loginService.removeImg();
    this.router.navigate(['/login']);
  }

  getUsuario() {
    return this.loginService.getUser();
  }
}
