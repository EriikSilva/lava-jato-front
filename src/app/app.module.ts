import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//COMPONENTS
import { FrankensteinComponent } from './components/frankenstein/frankenstein.component';
import { ServicosComponent } from './components/servicos/servicos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CarDetailsComponent } from './components/clientes/dialogs/car-details/car-details.component';
import { SaveEditClientComponent } from './components/clientes/dialogs/save-edit-client/save-edit-client.component';
import { NewCarComponent } from './components/clientes/dialogs/new-car/new-car.component';

//UTILS
import { CapitalCasePipe } from './utils/CapitalCase';
import { CpfCnpjMaskDirective } from './utils/Cpf_Cnpj_Validations'
import { NumericInputDirective } from './utils/OnlyNumbersInput'; 
import { TelefoneFormatPipe } from './utils/TelefonePipe';

//PRIMENG
import { PrimengModule } from '../app/primeng/primeng.module'

import { AuthInterceptor } from './shared/AuthInterceptor';
import { InicioComponent } from './components/inicio/inicio.component';
import { NewAtendimentoComponent } from './components/servicos/dialogs/new-atendimento/new-atendimento.component';

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
    TelefoneFormatPipe,
    SaveEditClientComponent,
    NewCarComponent,
    PerfilComponent,
    CarDetailsComponent,
    InicioComponent,
    NewAtendimentoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    PrimengModule
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
