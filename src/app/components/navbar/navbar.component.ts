import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items: any;
  nm_usuario:any


  constructor(private loginService:LoginService, private router:Router){}

  isVisible: boolean = false

  ngOnInit(): void {

    this.nm_usuario = localStorage.getItem("nm_usuario")

    this.items = [
      {
        label:'Perfil',
        icon:'pi pi-user',
        routerLink: ['/perfil']
      },
      {
        label:'Sair',
        icon:'pi pi-sign-out',
        command: () => {
          this.logout()
        }

     },

    ]
  }


  logout(){
    this.loginService.removeToken();
    this.router.navigate(['/login'])
  }

  getUsuario(){
    return this.loginService.getUser()
  }

}
