export interface IPedidos {
    idPedido?: number,
    idProducto: number,
    idProveedor: number,
    cantidad: string,
    fechaPedido: string,
    total: string,
    producto_nombre?: string,
    proveedor_nombre?: string,

}