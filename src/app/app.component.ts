import { Component } from '@angular/core';
import { LoginService } from './components/login/login.service';

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

}
