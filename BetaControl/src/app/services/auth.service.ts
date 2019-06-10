import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../pages/Models/usuario.model';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
    private apikey = 'AIzaSyA0_LElkrpaI28jB--EpwdCDvpeppbhjlM';

    userToken: string;
  // Crea nuevo Usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  // LoginUsuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]
  constructor(private http: HttpClient) { this.leerToken(); }

  logout() {
    localStorage.removeItem('token');
  }
  login( usuario: UsuarioModel ) {
    const authdata = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}/verifyPassword?key=${this.apikey}`,
      authdata
    ).pipe(
      map( resp => {
        this.guardartoke( resp[ 'idToken' ] );
        return resp;
      })
    );
  }
  registrar(usuario: UsuarioModel) {
    const authdata = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}/signupNewUser?key=${this.apikey}`,
      authdata
    ).pipe(
      map( resp => {
        this.guardartoke( resp[ 'idToken' ] );
        return resp;
      })
    );
  }
  private guardartoke(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }
  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
  estaAutenticado(): boolean {
    return this.userToken.length > 2;
  }
}
