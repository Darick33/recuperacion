import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
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
export class NuevoproductoComponent implements OnInit {
  titulo = '';
  frm_Producto: FormGroup;
  idProducto: number;
  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private ruta: ActivatedRoute,
    private navegacion: Router,

  ) {}
  ngOnInit(): void {
    this.idProducto = parseInt(this.ruta.snapshot.paramMap.get('id'));
    this.crearFormulario();
    if (this.idProducto > 0) {
      this.productoService.uno(this.idProducto).subscribe((producto) => {
        console.log(producto);
        this.frm_Producto.controls['nombre'].setValue(producto.nombre);
        this.frm_Producto.controls['precio'].setValue(producto.precio);
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
      nombre: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      
    });
  }

  grabar() {
    let iproveedor: IProducto = {
      idProducto: 0,
      nombre: this.frm_Producto.get('nombre').value,
      precio: this.frm_Producto.get('precio').value,
    };
    if (this.idProducto == 0 || isNaN(this.idProducto)) {
      this.productoService.insertar(iproveedor).subscribe((respuesta) => {
        // parseInt(respuesta) > 1 ? alert('Grabado con exito') : alert('Error al grabar');
        if (parseInt(respuesta) > 1) {
          Swal.fire({
            title: 'Insertado',
            text: 'Proveedor Ingresada correctamente',
            icon: 'success'
          });
          this.navegacion.navigate(['/proveedores']);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Proveedor no ingresado',
            icon: 'error'
          });
        }
      });
    } else {
      iproveedor.idProducto = this.idProducto;
      this.productoService.actualizar(iproveedor).subscribe((respuesta) => {
        console.log(respuesta)
        if (parseInt(respuesta) > 0) {
          this.idProducto = 0;
          Swal.fire({
            title: 'Insertado',
            text: 'Proveedor Actualizado correctamente',
            icon: 'success'
          });
          this.navegacion.navigate(['/productos']);
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
