import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private loginService:LoginService, private router:Router){}

  isVisible: boolean = false


  logout(){
    this.loginService.removeToken();
    this.router.navigate(['/login'])
  }

  getUsuario(){
    return this.loginService.getUser()
  }

}
