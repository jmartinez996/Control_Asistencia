import { Component, OnInit } from '@angular/core';
import { UsuarioModel, EmpleadoModel, SolicitudEmpleado } from '../../Models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { NgForm, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  private url = 'https://chamacos-43961.firebaseio.com/BaseDatos/solicitud';
  solicitud: SolicitudEmpleado;
  Aemple: SolicitudEmpleado[] = [];

  constructor(private auth: AuthService,
              private router: Router,
              private http: HttpClient) {

  }

  ngOnInit() {
    this.solicitud = new SolicitudEmpleado();
    this.getempleados()
    .subscribe( (resp: any ) => {
    console.log(resp);
    this.Aemple = resp;
    }, (err) => {
      console.log(err.error.error.message);
    });
  } 
  onSubmit( form: NgForm ){
    console.log(this.solicitud);
    this.crearSolicitud(this.solicitud)
        .subscribe( resp1 => {
          console.log(resp1);
          window.location.reload();
        }, (err) => {
          console.log(err.error.error.message);
          Swal.fire({
            type: 'error',
            title: 'Error al Modificar el Registro',
            text: err.error.error.message
          });
        });

  }
  crearSolicitud(solicitud: SolicitudEmpleado ){
    return this.http.post(`${ this.url }.json`, solicitud);
  }
  getempleados() {
    return this.http.get(`${ this.url }.json`).pipe(
      map(this.creararray)
    );
  }
  private creararray( arrays: Object ) {
    const ASoli: EmpleadoModel[] = [];
    if (arrays === null) {return []; }
    Object.keys(arrays).forEach(key => {
      const empleado: EmpleadoModel = arrays[key];
      empleado.id = key;
      ASoli.push(empleado);
    });
    return ASoli;

  }
}


