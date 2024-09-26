import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproveedor } from '../Interfaces/iproveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  apiurl =
    'http://localhost/sexto/Proyectos/03MVC/controllers/proveedores.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<Iproveedor[]> {
    return this.lector.get<Iproveedor[]>(this.apiurl + 'todos');
  }
  eliminar(idProveedor: number): Observable<number> {
    const formData = new FormData();
    formData.append('idProveedores', idProveedor.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
}
