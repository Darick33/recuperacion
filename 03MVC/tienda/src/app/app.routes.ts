import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent,
  },
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
];
