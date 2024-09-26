import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuarios } from '../Interfaces/IUsuarios';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  apiurl = 'http://localhost/sexto/Proyectos/03MVC/controllers/usuarios.controller.php?op=';
  constructor(
    private lector: HttpClient,
    private navegacion: Router
  ) {
    this.checkLoginStatus();
  }
  login(usuario: IUsuarios) {
    let formData = new FormData();
    formData.append('Nombre_Usuario', usuario.Nombre_Usuario);
    formData.append('Contrasenia', usuario.Contrasenia);

    return this.lector.post<any>(this.apiurl + 'login', formData).subscribe((respuesta) => {
      if (respuesta.success == 'true' || respuesta.idUsuarios > 0) {
        console.log(respuesta);
        //variables de entorno -- variables locales -- variables de sesion

        sessionStorage.setItem('nombreUsuario', respuesta.Nombre_Usuario);
        sessionStorage.setItem('rolesIdRoles', respuesta.Roles_idRoles.toString());
        localStorage.setItem('rolesIdRoles', respuesta.Roles_idRoles.toString());
        this.loggedIn.next(true);
        this.navegacion.navigate(['/dashboard/default']);
      } else {
        console.log(respuesta);
        this.navegacion.navigate(['/login/' + respuesta.error]);
      }
    });
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.navegacion.navigate(['/login']);
  }
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  checkLoginStatus() {
    const usuario = sessionStorage.getItem('rolesIdRoles');
    if (parseInt(usuario) > 0) {
      this.loggedIn.next(true);
    }
  }

  todos(): Observable<IUsuarios[]> {
    return this.lector.get<IUsuarios[]>(this.apiurl + 'todos');
  }
  uno(usuario: IUsuarios): Observable<IUsuarios> {
    let formData = new FormData();
    formData.append('idUsuarios', usuario.idUsuarios.toString());
    return this.lector.post<IUsuarios>(this.apiurl + 'uno', formData);
  }
}
