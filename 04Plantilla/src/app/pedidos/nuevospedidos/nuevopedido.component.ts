import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPedidos } from 'src/app/Interfaces/ipedido';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { PedidoService } from 'src/app/Services/pedidos.service';
import { ProductoService } from 'src/app/Services/productos.service';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrls: ['./nuevoproducto.component.scss']
})
export class NuevopedidoComponent implements OnInit {
  titulo = '';
  frm_Producto: FormGroup;
  listaproductos: IProducto[];
  listaProveedores: Iproveedor[];
  idPedido: number;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private productoService: ProductoService,
    private proveedoresService: ProveedorService,
    private ruta: ActivatedRoute,
    private navegacion: Router,
  ) {}

  ngOnInit(): void {
    this.productoService.todos().subscribe((res) => {
      this.listaproductos = res;
    });
    this.proveedoresService.todos().subscribe((res) => {
      this.listaProveedores = res;
    });

    const id = this.ruta.snapshot.paramMap.get('id');
    this.idPedido = id ? parseInt(id) : 0;
    this.crearFormulario();

    if (this.idPedido > 0) {
      this.pedidoService.uno(this.idPedido).subscribe((producto) => {
        console.log(producto);
        this.frm_Producto.controls['idProducto'].setValue(producto.idProducto);
        this.frm_Producto.controls['idProveedor'].setValue(producto.idProveedor);
        this.frm_Producto.controls['cantidad'].setValue(producto.cantidad);
        this.frm_Producto.controls['fechaPedido'].setValue(producto.fechaPedido);
        this.frm_Producto.controls['total'].setValue(producto.total);
        this.titulo = 'Actualizar producto';
      });
    }
  }

  crearFormulario() {
    this.frm_Producto = new FormGroup({
      idProducto: new FormControl('', Validators.required),
      idProveedor: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      fechaPedido: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
    });
  }

  grabar() {
    let ipedido: IPedidos = {
      idPedido: this.idPedido,
      idProveedor: this.frm_Producto.get('idProveedor').value,
      idProducto: this.frm_Producto.get('idProducto').value,
      cantidad: this.frm_Producto.get('cantidad').value,
      fechaPedido: this.frm_Producto.get('fechaPedido').value,
      total: this.frm_Producto.get('total').value,
    };

    if (this.idPedido == 0 || isNaN(this.idPedido)) {
      this.pedidoService.insertar(ipedido).subscribe((respuesta) => {
        if (parseInt(respuesta) > 1) {
          Swal.fire({
            title: 'Insertado',
            text: 'Pedido ingresado correctamente',
            icon: 'success'
          });
          this.navegacion.navigate(['/pedidos']);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Pedido no ingresado',
            icon: 'error'
          });
        }
      });
    } else {
      this.pedidoService.actualizar(ipedido).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          Swal.fire({
            title: 'Actualizado',
            text: 'Pedido actualizado correctamente',
            icon: 'success'
          });
          this.navegacion.navigate(['/pedidos']);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Pedido no actualizado',
            icon: 'error'
          });
        }
      });
    }
  }
}
