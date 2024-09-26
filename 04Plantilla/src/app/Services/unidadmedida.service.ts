import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUnidadMedida } from '../Interfaces/iunidadmedida';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {
  apiurl = 'http://localhost/sexto/Proyectos/03MVC/controllers/unidadmedida.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IUnidadMedida[]> {
    return this.lector.get<IUnidadMedida[]>(this.apiurl + 'todos');
  }

  uno(idUnidad: number): Observable<IUnidadMedida> {
    const formData = new FormData();
    formData.append('idUnidad', idUnidad.toString());
    return this.lector.post<IUnidadMedida>(this.apiurl + 'uno', formData);
  }

  eliminar(idUnidad: number): Observable<number> {
    const formData = new FormData();
    formData.append('idUnidad', idUnidad.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(unidad: IUnidadMedida): Observable<string> {
    const formData = new FormData();
    formData.append('Descripcion', unidad.Detalle);
    formData.append('Tipo', unidad.Tipo.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(unidad: IUnidadMedida): Observable<string> {
    const formData = new FormData();
    formData.append('idUnidad', unidad.idUnidad_Medida.toString());
    formData.append('Descripcion', unidad.Detalle);
    formData.append('Tipo', unidad.Tipo.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
