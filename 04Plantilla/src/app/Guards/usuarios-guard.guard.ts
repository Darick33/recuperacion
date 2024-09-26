import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuariosService } from '../Services/usuarios.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class usuariosGuardGuard implements CanActivate {
  constructor(
    private usuarioService: UsuariosService,
    private navegacion: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.usuarioService.isLoggedIn().pipe(
      map((loggedIn) => {
        console.log(loggedIn);
        if (!loggedIn) {
          this.navegacion.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
