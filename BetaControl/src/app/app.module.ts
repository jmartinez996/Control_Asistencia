import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { JfhomeComponent } from './pages/jefes/jfhome/jfhome.component';
import { EmhomeComponent } from './pages/empleados/emhome/emhome.component';
import { EmpleadosComponent } from './pages/jefes/empleados/empleados.component';
import { JfnavbarComponent } from './pages/jefes/jfnavbar/jfnavbar.component';
import { EmnavbarComponent } from './pages/empleados/emnavbar/emnavbar.component';
import { AusenciaRetrasoComponent } from './pages/jefes/ausencia-retraso/ausencia-retraso.component';
import { SolicitudesComponent } from './pages/jefes/solicitudes/solicitudes.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    JfhomeComponent,
    EmhomeComponent,
    EmpleadosComponent,
    JfnavbarComponent,
    EmnavbarComponent,
    AusenciaRetrasoComponent,
    SolicitudesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
