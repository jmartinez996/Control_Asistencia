import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jfhome',
  templateUrl: './jfhome.component.html',
  styleUrls: ['./jfhome.component.css']
})
export class JfhomeComponent implements OnInit {

  constructor( private auth: AuthService ,
               private router: Router) { }

  ngOnInit() {
  }

}
