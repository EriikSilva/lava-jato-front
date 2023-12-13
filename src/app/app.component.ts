import { AtendimentoService } from './components/atendimento/atendimento.service';
import { Component } from '@angular/core';
import { LoginService } from './components/login/login.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private AtendimentoService: AtendimentoService,
    private loginService:LoginService){
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.updateTitle();
      });

    }

  hasToken(): boolean {
    return this.loginService.getToken() !== null;
  }


  private updateTitle() {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
      if (route.snapshot.data && route.snapshot.data.hasOwnProperty('title')) {
        this.AtendimentoService.setTitle(route.snapshot.data['title']);
      }
    }
  }

  isSideNavCollapsed = false;
  screenWidth = 0;
  
  onToggleSideNav(data:SideNavToggle){
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;

  }
}
