import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../theme/shared/shared.module';
import { RouterLink } from '@angular/router';
import { IProducto } from '../Interfaces/iproducto';
import { ProductoService } from '../Services/productos.service';
import Swal from 'sweetalert2';
import { PedidoService } from '../Services/pedidos.service';
import { IPedidos } from '../Interfaces/ipedido';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './pedidos.component.html',
})
export class PedidosComponent implements OnInit {
  listaproductos: IPedidos[] = [];

  constructor(private prodcutoServicio: ProductoService,
    private pedidoService: PedidoService,
  ) {}

  ngOnInit(): void {
    this.cargaproductos();
  }

  cargaproductos() {
    this.pedidoService.todos().subscribe((data) => {
      this.listaproductos = data;
      console.log(data);
    });
  }
  trackByFn() {}
  abiriInforme(){
    window.open('http://localhost/recuperacion/03MVC/reports/proveedormayor.report.php');
  }

  eliminar(idProductos) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.eliminar(idProductos).subscribe((data) => {
          this.cargaproductos();
        });
        Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
      } else {
        Swal.fire('Error', 'Ocurrio un erro', 'error');
      }
    });
  }
}
