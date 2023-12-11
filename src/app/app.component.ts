import { Component } from '@angular/core';
import { LoginService } from './components/login/login.service';

interface SideNavToggle{
  screenWidth:number,
  collapsed:boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lava-jato-front';

  constructor(private loginService:LoginService){}

  hasToken(): boolean {
    return this.loginService.getToken() !== null;
  }


  isSideNavCollapsed = false;
  screenWidth = 0;
  
  onToggleSideNav(data:SideNavToggle){
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;

  }
}
