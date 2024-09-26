import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoproveedor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nuevoproveedor.component.html',
  styleUrl: './nuevoproveedor.component.scss'
})
export class NuevoproveedorComponent implements OnInit {
  titulo = 'Insertar Proveedor';
  idProveedor = 0;
  Nombre_Empresa: any;
  Direccion;
  Telefono;
  Contacto_Empresa;

  constructor(
    private provedorServicio: ProveedorService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.idProveedor = parseInt(this.ruta.snapshot.paramMap.get('id'));
    /*this.ruta.paramMap.subscribe((parametros) => {
      this.idProveedor = parseInt(parametros.get('id'));
    });*/

    if (this.idProveedor > 0) {
      this.provedorServicio.uno(this.idProveedor).subscribe((proveedor) => {
        console.log(proveedor);
        this.Nombre_Empresa = proveedor.nombre;
        this.Direccion = proveedor.direccion;
        this.Telefono = proveedor.telefono;
        this.Contacto_Empresa = proveedor.email;
        this.titulo = 'Actualizar Proveedor';
      });
    }
  }

  limpiarcaja() {
    alert('Limpiar Caja');
  }
  grabar() {
    let iproveedor: Iproveedor = {
      idProveedor: 0,
      nombre: this.Nombre_Empresa,
      direccion: this.Direccion,
      telefono: this.Telefono,
      email: this.Contacto_Empresa,
    };
    console.log(this.idProveedor);
    if (this.idProveedor == 0 || isNaN(this.idProveedor)) {
      this.provedorServicio.insertar(iproveedor).subscribe((respuesta) => {
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
      iproveedor.idProveedor = this.idProveedor;
      this.provedorServicio.actualizar(iproveedor).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          this.idProveedor = 0;
          Swal.fire({
            title: 'Insertado',
            text: 'Proveedor Actualizado correctamente',
            icon: 'success'
          });
          this.navegacion.navigate(['/proveedores']);
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
