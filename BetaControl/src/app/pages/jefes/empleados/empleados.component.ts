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
    this.depto = new DepartamentoModel();
    this.value = new ValoresModel();
    this.getempleados()
    .subscribe( resp => {
    console.log(resp);
    this.Aemple = resp;
    }, (err) => {
      console.log(err.error.error.message);
    });
    console.log(this.value)
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
            this.router.navigateByUrl('/jfhome');
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
    crearEmpleado( empleado: EmpleadoModel, id: any ) {
      return this.http.put(`${ this.url }/${ id }/empleado.json`, empleado);
    }
    crearDepto( depto: DepartamentoModel, id: any ) {
      return this.http.put(`${ this.url }/${ id }/departamento.json`, depto);
    }
    deleteEmpleado(id: any) {
      console.log(id);
      return this.http.delete(`${ this.url }/${ id }.json`).subscribe(
        resp => {
          console.log(resp);
        }
      ), ( err1 => {
        console.log(err1);
      })
      

    }
    getempleados() {
      return this.http.get(`${ this.url }.json`).pipe(
        map(this.creararray)
      );
    }
    private creararray( arrays: Object ) {
      const Aempleado: EmpleadoModel[] = [];
      Object.keys(arrays).forEach(key => {
        const empleado: EmpleadoModel = arrays[key];
        empleado.id = key;
        Aempleado.push(empleado);
      });
      return Aempleado;

    }
    delete(algo: any) {
      console.log(algo);
    }
  }

