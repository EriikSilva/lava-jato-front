import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//PRIMENG
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DividerModule,
    TabViewModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ToolbarModule,
    SidebarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
