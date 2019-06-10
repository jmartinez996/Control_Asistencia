import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../Models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recuerdame = false;
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
    this.usuario.email = '';
  }
  onSubmit( form: NgForm ){
    if (form.invalid) {return;}
    Swal.fire({
      allowOutsideClick : false,
      type: 'info',
      text: 'Espere..'
    });
    Swal.showLoading();
    this.auth.registrar( this.usuario )
      .subscribe(resp => {
        console.log(resp);
        Swal.close();
        if ( this.recuerdame ){
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');
      },(err)=> {
        console.log(err.error.error.message);
        Swal.fire({
          type: 'error',
          title: 'Error al Autenticar',
          text: err.error.error.message
        });

      });
    ;
    }

  }

