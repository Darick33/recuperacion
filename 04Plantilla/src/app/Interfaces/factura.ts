export interface IFactura {
  idFactura?: number;
  Fecha: string;
  Sub_total: number;
  Sub_total_iva: number;
  Valor_IVA: number;
  Clientes_idClientes: number;

  //son solo para mostrar informacion
  Nombres?: string;
  total?: number;
}
