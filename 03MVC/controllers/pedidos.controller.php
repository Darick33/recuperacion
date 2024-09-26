<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/pedidos.model.php');
error_reporting(0);
$pedidos = new Pedidos;

switch ($_GET["op"]) {
    
    case 'todos':
        $datos = array();
        $datos = $pedidos->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno':
        if (!isset($_POST["idPedido"])) {
            echo json_encode(["error" => "Pedido ID not specified."]);
            exit();
        }
        $idPedido = intval($_POST["idPedido"]);
        $datos = array();
        $datos = $pedidos->uno($idPedido);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar':
        if (!isset($_POST["idProducto"]) || !isset($_POST["idProveedor"]) || !isset($_POST["cantidad"]) || !isset($_POST["fechaPedido"]) || !isset($_POST["total"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idProducto = intval($_POST["idProducto"]);
        $idProveedor = intval($_POST["idProveedor"]);
        $cantidad = intval($_POST["cantidad"]);
        $fechaPedido = $_POST["fechaPedido"];
        $total = floatval($_POST["total"]);

        $datos = array();
        $datos = $pedidos->insertar($idProducto, $idProveedor, $cantidad, $fechaPedido, $total);
        echo json_encode($datos);
        break;

    case 'actualizar':
        if (!isset($_POST["idPedido"]) || !isset($_POST["idProducto"]) || !isset($_POST["idProveedor"]) || !isset($_POST["cantidad"]) || !isset($_POST["fechaPedido"]) || !isset($_POST["total"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idPedido = intval($_POST["idPedido"]);
        $idProducto = intval($_POST["idProducto"]);
        $idProveedor = intval($_POST["idProveedor"]);
        $cantidad = intval($_POST["cantidad"]);
        $fechaPedido = $_POST["fechaPedido"];
        $total = floatval($_POST["total"]);

        $datos = array();
        $datos = $pedidos->actualizar($idPedido, $idProducto, $idProveedor, $cantidad, $fechaPedido, $total);
        echo json_encode($datos);
        break;

    case 'eliminar':
        if (!isset($_POST["idPedido"])) {
            echo json_encode(["error" => "Pedido ID not specified."]);
            exit();
        }
        $idPedido = intval($_POST["idPedido"]);
        $datos = array();
        $datos = $pedidos->eliminar($idPedido);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
?>
