import { Component, OnInit } from '@angular/core';
import { UsuarioModel, EmpleadoModel } from '../../Models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  private url = 'https://chamacos-43961.firebaseio.com/BaseDatos';
  usuario: UsuarioModel;
  empleado: EmpleadoModel;
  recuerdame = false;
  constructor(private auth: AuthService,
              private router: Router,
              private http: HttpClient
              ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.usuario.email = '';
    this.empleado = new EmpleadoModel();
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
          this.router.navigateByUrl('/ver-empleado');
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
    crearDepto( empleado: EmpleadoModel, id: any ) {
      return this.http.put(`${ this.url }/${ id }/empleado.json`, empleado);
    }
  }

