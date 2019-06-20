import { Component, OnInit } from '@angular/core';
import { UsuarioModel, EmpleadoModel, SolicitudEmpleado } from '../../Models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  private url = 'https://chamacos-43961.firebaseio.com/BaseDatos';
  solicitud: SolicitudEmpleado;

  constructor(private auth: AuthService,
              private router: Router,
              private http: HttpClient) {

  }

  ngOnInit() {
  } 

  getempleados(){
    return this.http.get(`${ this.url }.json`);
    //return this.http.get('https://chamacos-43961.firebaseio.com/BaseDatos.json');
  }
}


