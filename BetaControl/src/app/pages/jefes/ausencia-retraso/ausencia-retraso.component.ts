import { Component, OnInit } from '@angular/core';
import { UsuarioModel, EmpleadoModel, SolicitudEmpleado, ValoresModel,AusenciaModel,RetrasoModel } from '../../Models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { NgForm, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ausencia-retraso',
  templateUrl: './ausencia-retraso.component.html',
  styleUrls: ['./ausencia-retraso.component.css']
})
export class AusenciaRetrasoComponent implements OnInit {
  private url = 'https://chamacos-43961.firebaseio.com/BaseDatos';
  private url1 = 'https://chamacos-43961.firebaseio.com/registros';
  solicitud: SolicitudEmpleado;
  Aemple: AusenciaModel[] = [];
  Aemple1: RetrasoModel[] = [];
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
    });
    this.getempleados1()
    .subscribe( (resp: any ) => {
      this.Aemple1 = resp;
    });
  }


  buscar(id: any ){
    return this.http.get(`${ this.url }/${ id }/empleado.json`)
  }
  getempleados() {
    const ruta = `${ this.url1 }/ausencia.json`;
    console.log(ruta);
    return this.http.get(`${ this.url1 }/ausencia.json`).pipe(
      map(this.creararray)
    );
  }
  private creararray( arrays: Object ) {
    const ASoli: AusenciaModel[] = [];
    if (arrays === null) {return []; }
    Object.keys(arrays).forEach(key => {
      const empleado: AusenciaModel = arrays[key];
      empleado.id = key;
      ASoli.push(empleado);
    });
    return ASoli;
  }
  getempleados1() {
    const ruta = `${ this.url1 }/retraso.json`;
    console.log(ruta);
    return this.http.get(`${ this.url1 }/retraso.json`).pipe(
      map(this.creararray1)
    );
  }
  private creararray1( arrays: Object ) {
    const ASoli: RetrasoModel[] = [];
    if (arrays === null) {return []; }
    Object.keys(arrays).forEach(key => {
      const empleado: RetrasoModel = arrays[key];
      empleado.id = key;
      ASoli.push(empleado);
    });
    return ASoli;
  }
}
