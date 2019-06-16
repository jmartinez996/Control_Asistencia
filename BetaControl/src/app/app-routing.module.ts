import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { JfhomeComponent } from './pages/jefes/jfhome/jfhome.component';
import { EmpleadosComponent } from './pages/jefes/empleados/empleados.component';
import { EmhomeComponent } from './pages/empleados/emhome/emhome.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent , canActivate: [ AuthGuard ] },
  { path: 'jfhome', component: JfhomeComponent },
  { path: 'ver-empleados', component: EmpleadosComponent },
  { path: 'emhome', component: EmhomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
