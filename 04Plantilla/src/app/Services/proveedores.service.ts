import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproveedor } from '../Interfaces/iproveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  apiurl = 'http://localhost/recuperacion/03MVC/controllers/proveedores.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<Iproveedor[]> {
    return this.lector.get<Iproveedor[]>(this.apiurl + 'todos');
  }
  uno(idProveedor: number): Observable<Iproveedor> {
    const formData = new FormData();
    formData.append('idProveedor', idProveedor.toString());
    return this.lector.post<Iproveedor>(this.apiurl + 'uno', formData);
  }
  eliminar(idProveedor: number): Observable<number> {
    const formData = new FormData();
    formData.append('idProveedor', idProveedor.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(proveedor: Iproveedor): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', proveedor.nombre);
    formData.append('direccion', proveedor.direccion);
    formData.append('telefono', proveedor.telefono);
    formData.append('email', proveedor.email);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(proveedor: Iproveedor): Observable<string> {
    const formData = new FormData();
    formData.append('idProveedor', proveedor.idProveedor.toString());
    formData.append('nombre', proveedor.nombre);
    formData.append('direccion', proveedor.direccion);
    formData.append('telefono', proveedor.telefono);
    formData.append('email', proveedor.email);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
