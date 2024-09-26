import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFactura } from '../Interfaces/factura';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  apiurl = 'http://localhost/sexto/Proyectos/03MVC/controllers/factura.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IFactura[]> {
    return this.lector.get<IFactura[]>(this.apiurl + 'todos');
  }

  uno(idFactura: number): Observable<IFactura> {
    const formData = new FormData();
    formData.append('idFactura', idFactura.toString());
    return this.lector.post<IFactura>(this.apiurl + 'uno', formData);
  }

  eliminar(idFactura: number): Observable<number> {
    const formData = new FormData();
    formData.append('idFactura', idFactura.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(factura: IFactura): Observable<string> {
    const formData = new FormData();
    formData.append('Fecha', factura.Fecha);
    formData.append('Sub_total', factura.Sub_total.toString());
    formData.append('Sub_total_iva', factura.Sub_total_iva.toString());
    formData.append('Valor_IVA', factura.Valor_IVA.toString());
    formData.append('Clientes_idClientes', factura.Clientes_idClientes.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(factura: IFactura): Observable<string> {
    const formData = new FormData();
    formData.append('idFactura', factura.idFactura.toString());
    formData.append('Fecha', factura.Fecha);
    formData.append('Sub_total', factura.Sub_total.toString());
    formData.append('Sub_total_iva', factura.Sub_total_iva.toString());
    formData.append('Valor_IVA', factura.Valor_IVA.toString());
    formData.append('Clientes_idClientes', factura.Clientes_idClientes.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
