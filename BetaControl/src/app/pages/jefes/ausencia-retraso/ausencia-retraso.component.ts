import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ausencia-retraso',
  templateUrl: './ausencia-retraso.component.html',
  styleUrls: ['./ausencia-retraso.component.css']
})
export class AusenciaRetrasoComponent implements OnInit {

  datos;
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';

  constructor() {
    this.datos = ["Ausencia","Retraso"];
  }

  ngOnInit() {
  }


    capturar() {
        // Pasamos el valor seleccionado a la variable verSeleccion
        this.verSeleccion = this.opcionSeleccionado;
    }
}
