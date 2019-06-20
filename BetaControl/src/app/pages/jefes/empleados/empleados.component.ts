import { Component, OnInit } from '@angular/core';
import { UsuarioModel, EmpleadoModel, DepartamentoModel, ValoresModel} from '../../Models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  private url = 'https://chamacos-43961.firebaseio.com/BaseDatos';
  usuario: UsuarioModel;
  empleado: EmpleadoModel;
  empleado1: EmpleadoModel;
  depto: DepartamentoModel;
  recuerdame = false;
  Aemple: EmpleadoModel[] = [];
  value: ValoresModel;
  constructor(private auth: AuthService,
              private router: Router,
              private http: HttpClient
              ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.usuario.email = '';
    this.empleado = new EmpleadoModel();
    this.empleado1 = new EmpleadoModel();
    this.depto = new DepartamentoModel();
    this.value = new ValoresModel();
    this.getempleados()
    .subscribe( resp => {
    console.log(resp);
    this.Aemple = resp;
    }, (err) => {
      console.log(err.error.error.message);
    });
    console.log(this.value);
  }
  onSubmit( form: NgForm ) {
    if (form.invalid) {return; }
    Swal.fire({
      allowOutsideClick : false,
      type: 'info',
      text: 'Espere..'
    });
    Swal.showLoading();
    this.auth.registrar( this.usuario )
      .subscribe( (resp: any) => {
        console.log(resp.email);
        console.log(resp.localId);
        const id = resp.localId;
        Swal.close();
        if ( this.recuerdame ) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.crearEmpleado(this.empleado, id)
        .subscribe( resp1 => {
          console.log(resp1);
          this.crearDepto(this.depto, id)
          .subscribe( resp2 => {
            console.log(resp2);
            this.router.navigateByUrl('/ver-empleados');
            window.location.reload();
          }, (err) => {
            console.log(err.error.error.message);
            Swal.fire({
              type: 'error',
              title: 'Error al Autenticar',
              text: err.error.error.message
            });
          });
        }, (err) => {
          console.log(err.error.error.message);
          Swal.fire({
            type: 'error',
            title: 'Error al Autenticar',
            text: err.error.error.message
          });
        });
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          type: 'error',
          title: 'Error al Autenticar',
          text: err.error.error.message
        });

      });
    }
    onSubmit1( form: NgForm ) {
      console.log(this.empleado1);
      this.crearEmpleado(this.empleado1, this.value.id )
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
    crearEmpleado( empleado: EmpleadoModel, id: any ) {
      return this.http.put(`${ this.url }/${ id }/empleado.json`, empleado);
    }
    crearDepto( depto: DepartamentoModel, id: any ) {
      return this.http.put(`${ this.url }/${ id }/departamento.json`, depto);
    }
    gdeleteEmpleado(id: any) {
      this.value.id = id;
    }
    deleteEmpleado(id: any) {
      return this.http.delete(`${ this.url }/${ id }.json`).subscribe(
        resp => {
          console.log(resp);
          window.location.reload();
        }
      ), ( err1 => {
        console.log(err1);
      });
    }
    editEmpleado(id: any) {
      this.value.id = id;
      console.log(id);
    }
    getoneEmpleado(id: any ) {
      console.log(id);
      const ruta = `${ this.url }/${ id }/empleado.json`;
      console.log(ruta);
      return this.http.get(`${ this.url }/${ id }/empleado.json`).subscribe( (rep: any ) => {
        this.empleado1 = rep;
        console.log(this.empleado1);
      });
    }
    getempleados() {
      return this.http.get(`${ this.url }.json`).pipe(
        map(this.creararray)
      );
    }
    private creararray( arrays: Object ) {
      const Aempleado: EmpleadoModel[] = [];
      if (arrays === null) {return [];}
      Object.keys(arrays).forEach(key => {
        const empleado: EmpleadoModel = arrays[key];
        empleado.id = key;
        Aempleado.push(empleado);
      });
      return Aempleado;

    }
    
  }

