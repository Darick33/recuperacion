import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducto } from '../Interfaces/iproducto'; // Asegúrate de crear esta interfaz
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiurl = 'http://localhost/recuperacion/03MVC/controllers/productos.controller.php?op=';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los productos
  todos(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(this.apiurl + 'todos');
  }

  // Método para obtener un producto por su ID
  uno(idProductos: number): Observable<IProducto> {
    const formData = new FormData();
    formData.append('idProducto', idProductos.toString());
    return this.http.post<IProducto>(this.apiurl + 'uno', formData);
  }

  // Método para eliminar un producto por su ID
  eliminar(idProductos: number): Observable<number> {
    const formData = new FormData();
    formData.append('idProducto', idProductos.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Método para insertar un nuevo producto junto con el kardex
  insertar(producto: IProducto): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);

    // Insertar el producto y kardex
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  // Método para actualizar un producto
  actualizar(producto: IProducto): Observable<string> {
    const formData = new FormData();
    formData.append('idProducto', producto.idProducto.toString());
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);

    // Actualizar el producto
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }
}
