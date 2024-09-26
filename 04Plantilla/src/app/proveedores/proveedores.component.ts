import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Iproveedor } from '../Interfaces/iproveedor';
import { ProveedorService } from '../Services/proveedores.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent {
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
      this.cargatabla();
    });
  }
}
