import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProveedorService } from './Services/proveedor.service';
import { Iproveedor } from './Interfaces/iproveedor';
//import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Lista de Proveedores';

  listaProveedores: Iproveedor[] = [];
  constructor(private ServicioProveedor: ProveedorService) {}
  ngOnInit() {
    this.cargatabla();
  }

  cargatabla() {
    this.ServicioProveedor.todos().subscribe((data) => {
      this.listaProveedores = data;
    });
  }
  eliminar(idProveedor: number) {
    this.ServicioProveedor.eliminar(idProveedor).subscribe((data) => {
      console.log(data);
      this.cargatabla();
    });
  }
}
