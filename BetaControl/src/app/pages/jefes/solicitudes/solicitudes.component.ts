import { Component, OnInit } from '@angular/core';
import { UsuarioModel, EmpleadoModel, SolicitudEmpleado, ValoresModel } from '../../Models/usuario.model';
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
  private url = 'https://chamacos-43961.firebaseio.com/BaseDatos';
  private url1 = 'https://chamacos-43961.firebaseio.com/registros';
 
  solicitud: SolicitudEmpleado;
  Aemple: SolicitudEmpleado[] = [];
  Aemple1: SolicitudEmpleado[] = [];
  value: ValoresModel;
  constructor(private auth: AuthService,
              private router: Router,
              private http: HttpClient) {

  }

  ngOnInit() {
    this.solicitud = new SolicitudEmpleado();
    this.value = new ValoresModel();

    this.getempleados()
    .subscribe( (resp: any ) => {
    this.Aemple = resp;
    }, (err) => {
      console.log(err.error.error.message);
    });

    this.getempleados1()
    .subscribe( (resp: any ) => {
    this.Aemple1 = resp;
    }, (err) => {
      console.log(err.error.error.message);
    });
  } 
  onSubmit( form: NgForm ){
    const id = this.solicitud.rut;
    this.buscar(this.solicitud.rut).subscribe( (resp: any) => {
      this.solicitud.rut =  resp.rut;
      this.crearSolicitud(this.solicitud)
        .subscribe( resp1 => {
          window.location.reload();
        }, (err) => {
          Swal.fire({
            type: 'error',
            title: 'Error al Modificar el Registro',
            text: err.error.error.message
          });
        });
      }
    );
    

  }
  deletesoli(id: any) {
    console.log(id);
    return this.http.delete(`${ this.url1 }/solicitud/${ id }.json`).subscribe(
      resp => {
        console.log(resp);
        window.location.reload();
      }
    ), ( err1 => {
      console.log(err1);
    });
  }
  gdeleteEmpleado(id: any) {
    this.value.id = id;
  }
  
  buscar(id: any ){
    return this.http.get(`${ this.url }/${ id }/empleado.json`)
  }
  crearSolicitud(solicitud: SolicitudEmpleado){
    return this.http.post(`${ this.url1 }/solicitud.json`, solicitud);
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
  getempleados1() {
    return this.http.get(`${ this.url1 }/solicitud.json`).pipe(
      map(this.creararray1)
    );
  }
  private creararray1( arrays: Object ) {
    const ASoli: SolicitudEmpleado[] = [];
    if (arrays === null) {return []; }
    Object.keys(arrays).forEach(key => {
      const empleado: SolicitudEmpleado = arrays[key];
      empleado.id = key;
      ASoli.push(empleado);
    });
    return ASoli;

  }

}


