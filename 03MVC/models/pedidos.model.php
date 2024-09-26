<?php
require_once('../config/config.php');

class Pedidos
{
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT pe.*, pr.nombre AS producto_nombre, prov.nombre AS proveedor_nombre 
                   FROM pedidos pe 
                   LEFT JOIN productos pr ON pe.idProducto = pr.idProducto
                   LEFT JOIN proveedores prov ON pe.idProveedor = prov.idProveedor";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idPedido)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT pe.*, pr.nombre AS producto_nombre, prov.nombre AS proveedor_nombre 
                   FROM pedidos pe 
                   LEFT JOIN productos pr ON pe.idProducto = pr.idProducto
                   LEFT JOIN proveedores prov ON pe.idProveedor = prov.idProveedor
                   WHERE pe.idPedido = $idPedido";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($idProducto, $idProveedor, $cantidad, $fechaPedido, $total)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `pedidos` (`idProducto`, `idProveedor`, `cantidad`, `fechaPedido`, `total`) 
                       VALUES ('$idProducto', '$idProveedor', '$cantidad', '$fechaPedido', '$total')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idPedido, $idProducto, $idProveedor, $cantidad, $fechaPedido, $total)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `pedidos` SET 
                       `idProducto` = '$idProducto', 
                       `idProveedor` = '$idProveedor', 
                       `cantidad` = '$cantidad', 
                       `fechaPedido` = '$fechaPedido', 
                       `total` = '$total' 
                       WHERE `idPedido` = $idPedido";
            if (mysqli_query($con, $cadena)) {
                return $idPedido;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idPedido)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `pedidos` WHERE `idPedido` = $idPedido";
            if (mysqli_query($con, $cadena)) {
                return 1;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function obtenerProveedoresMayor()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT P.nombre AS proveedor, 
       SUM(PD.cantidad) AS totalProductosVendidos, 
       SUM(PD.total) AS montoTotalVentas
FROM Pedidos PD
JOIN Proveedores P ON PD.idProveedor = P.idProveedor
WHERE PD.fechaPedido >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
GROUP BY P.nombre
ORDER BY totalProductosVendidos DESC
LIMIT 1
";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }


}
?>
