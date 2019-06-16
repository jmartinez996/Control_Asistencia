import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jfnavbar',
  templateUrl: './jfnavbar.component.html',
  styleUrls: ['./jfnavbar.component.css']
})
export class JfnavbarComponent implements OnInit {

  constructor(
      private auth: AuthService,
      private router: Router

  ) { }

  ngOnInit() {
  }
  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
