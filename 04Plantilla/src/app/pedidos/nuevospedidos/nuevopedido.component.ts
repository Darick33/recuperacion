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
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevopedidoComponent implements OnInit {
  titulo = '';
  frm_Producto: FormGroup;
  listaproductos: IProducto[];
  listaProveedores: Iproveedor[]
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
    this.productoService.todos().subscribe((res)=>{
      this.listaproductos = res;
    })
    this.proveedoresService.todos().subscribe((res)=>{
      this.listaProveedores = res;
    })
    this.idPedido = parseInt(this.ruta.snapshot.paramMap.get('id'));
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

    /*
1.- Modelo => Solo el procedieminto para realizar un select
2.- Controador => Solo el procedieminto para realizar un select
3.- Servicio => Solo el procedieminto para realizar un select
4.-  realizar el insertar y actualizar

*/
  }


  crearFormulario() {
    /* this.frm_Producto = this.fb.group({
      Codigo_Barras: ['', Validators.required],
      Nombre_Producto: ['', Validators.required],
      Graba_IVA: ['', Validators.required],
      Unidad_Medida_idUnidad_Medida: ['', Validators.required],
      IVA_idIVA: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]],
      Valor_Compra: ['', [Validators.required, Validators.min(0)]],
      Valor_Venta: ['', [Validators.required, Validators.min(0)]],
      Proveedores_idProveedores: ['', Validators.required]
    });*/
    this.frm_Producto = new FormGroup({
      idProducto: new FormControl('', Validators.required),
      idProveedor: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      fechaPedido: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
      
    });
  }

  grabar() {
    let iproveedor: IPedidos = {
      idPedido: this.idPedido,
      idProveedor: this.frm_Producto.get('idProducto').value,
      idProducto: parseInt(this.frm_Producto.get('idProducto').value),
      cantidad: this.frm_Producto.get('cantidad').value,
      fechaPedido: this.frm_Producto.get('fechaPedido').value,
      total: this.frm_Producto.get('total').value
    };
    console.log(iproveedor);
    if (this.idPedido == 0 || isNaN(this.idPedido)) {
      this.pedidoService.insertar(iproveedor).subscribe((respuesta) => {
        console.log(respuesta);
        // parseInt(respuesta) > 1 ? alert('Grabado con exito') : alert('Error al grabar');
        if (parseInt(respuesta) > 1) {
          Swal.fire({
            title: 'Insertado',
            text: 'Proveedor Ingresada correctamente',
            icon: 'success'
          });
          this.navegacion.navigate(['/pedidos']);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Proveedor no ingresado',
            icon: 'error'
          });
        }
      });
    } else {
      iproveedor.idProducto = this.idPedido;
      this.pedidoService.actualizar(iproveedor).subscribe((respuesta) => {
        console.log(respuesta)
        if (parseInt(respuesta) > 0) {
          Swal.fire({
            title: 'Insertado',
            text: 'Proveedor Actualizado correctamente',
            icon: 'success'
          });
          this.navegacion.navigate(['/pedidos']);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Proveedor no actualizado',
            icon: 'error'
          });
        }
      });
    }
  }
}
