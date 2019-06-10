import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../Models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { switchAll } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recuerdame = false;
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    if ( localStorage.getItem('email') ){
      this.usuario.email = localStorage.getItem('email');
      this.recuerdame = true;
    }
  }
  login(form: NgForm){

    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick : false,
      type: 'info',
      text: 'Espere..'
    });
    Swal.showLoading();
    this.auth.login(this.usuario)
    .subscribe( resp => {
      console.log(resp);
      Swal.close();
      if ( this.recuerdame ){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        type: 'error',
        title: 'Error al Autenticar',
        text: err.error.error.message
      });
    });

  }

}
