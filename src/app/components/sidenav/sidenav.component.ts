import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { navDataBar } from './nav-data';


interface SideNavToggle{
  screenWidth:number,
  collapsed:boolean
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  
  @Output() onToggleSideNav:EventEmitter<SideNavToggle> = new EventEmitter()

  collapsed = false;
  screenWidth = 0;
  navData = navDataBar

  @HostListener('window:resize', ['$event'])

  onResize($event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false
      this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
    }
  }
  

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
  
  toogleCollapse(){
    this.collapsed = !this.collapsed
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
  }

  closeSidenav(){
    this.collapsed = false
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
  }

}
