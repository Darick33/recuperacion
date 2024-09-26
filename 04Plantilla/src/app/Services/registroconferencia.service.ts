import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAsistente } from '../Interfaces/iasistentes';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  apiurl = 'http://localhost/Sexto/Sexto/Proyectos/03MVC/controllers/registroconferencia.controller.php?op=';
  constructor(private lector: HttpClient) {}

  eliminar(asistente_id: number, conferencia_id:number): Observable<number> {
    const formData = new FormData();
    formData.append('asistente_id', asistente_id.toString());
    formData.append('conferencia_id', conferencia_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(asistente_id: number, conferencia_id:number): Observable<number> {
    const formData = new FormData();
    formData.append('asistente_id', asistente_id.toString());
    formData.append('conferencia_id', conferencia_id.toString());
    return this.lector.post<number>(this.apiurl + 'insertar', formData);
  }


}
