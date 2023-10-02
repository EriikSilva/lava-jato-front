import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


//COMPONENTS
import { FrankensteinComponent } from './components/frankenstein/frankenstein.component';
import { ServicosComponent } from './components/servicos/servicos.component';
import { ClientesComponent } from './components/clientes/clientes.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//UTILS
import { CapitalCasePipe } from './utils/CapitalCase';
import { CpfCnpjMaskDirective } from './utils/Cpf_Cnpj_Validations'
import { NumericInputDirective } from './utils/OnlyNumbersInput'; 

//PRIMENG
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { SlideMenuModule } from 'primeng/slidemenu';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/AuthInterceptor';
import { SaveEditClientComponent } from './components/clientes/dialogs/save-edit-client/save-edit-client.component';
import { NewCarComponent } from './components/clientes/dialogs/new-car/new-car.component';
import { PerfilComponent } from './components/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    FrankensteinComponent,
    ServicosComponent,
    ClientesComponent,
    CapitalCasePipe,
    CpfCnpjMaskDirective,
    NumericInputDirective,
    SaveEditClientComponent,
    NewCarComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    DividerModule,
    TabViewModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ToolbarModule,
    SidebarModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    TableModule,
    DialogModule,
    SlideMenuModule,
    InputMaskModule,
    ConfirmPopupModule,
    TooltipModule,
    ToggleButtonModule,
    KeyFilterModule,
    DropdownModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
