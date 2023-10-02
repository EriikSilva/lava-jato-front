import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServicosComponent } from './components/servicos/servicos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AuthGuard } from './components/guard/auth.guard';
import { FrankensteinComponent } from './components/frankenstein/frankenstein.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'servicos',
    component: ServicosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'frankenstein',
    component: FrankensteinComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
