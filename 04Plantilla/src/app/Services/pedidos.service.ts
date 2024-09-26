import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPedidos } from '../Interfaces/ipedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  apiurl = 'http://localhost/recuperacion/03MVC/controllers/pedidos.controller.php?op=';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los productos
  todos(): Observable<IPedidos[]> {
    return this.http.get<IPedidos[]>(this.apiurl + 'todos');
  }

  // Método para obtener un producto por su ID
  uno(idProductos: number): Observable<IPedidos> {
    const formData = new FormData();
    formData.append('idPedido', idProductos.toString());
    return this.http.post<IPedidos>(this.apiurl + 'uno', formData);
  }

  // Método para eliminar un producto por su ID
  eliminar(idProductos: number): Observable<number> {
    const formData = new FormData();
    formData.append('idPedido', idProductos.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(producto: IPedidos): Observable<string> {
    const formData = new FormData();
    formData.append('idProducto', producto.idProducto.toString());
    formData.append('idProveedor', producto.idProveedor.toString());
    formData.append('cantidad', producto.cantidad.toString());
    formData.append('fechaPedido', producto.fechaPedido);
    formData.append('total', producto.total);

    // Insertar el producto y kardex
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  // Método para actualizar un producto
  actualizar(producto: IPedidos): Observable<string> {
    const formData = new FormData();
    formData.append('idPedido', producto.idPedido.toString());
    formData.append('idProducto', producto.idProducto.toString());
    formData.append('idProveedor', producto.idProveedor.toString());
    formData.append('cantidad', producto.cantidad);
    formData.append('fechaPedido', producto.fechaPedido);
    formData.append('total', producto.total);

    // Actualizar el producto
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }

  // Método para insertar un nuevo producto junto con el kardex

}
