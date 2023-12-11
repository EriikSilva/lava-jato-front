import { Component, Input } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {


  constructor(private loginService:LoginService){}

  hasToken(): boolean {
    return this.loginService.getToken() !== null;
  }


  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(){
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
        styleClass = 'body-trimmed';
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen'
    }
    return styleClass
  }
}