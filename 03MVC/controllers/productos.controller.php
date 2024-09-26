<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/productos.model.php');
error_reporting(0);
$productos = new Productos;

switch ($_GET["op"]) {
    
    case 'todos':
        $datos = array();
        $datos = $productos->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno':
        if (!isset($_POST["idProducto"])) {
            echo json_encode(["error" => "Producto ID not specified."]);
            exit();
        }
        $idProducto = intval($_POST["idProducto"]);
        $datos = array();
        $datos = $productos->uno($idProducto);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar':
        if (!isset($_POST["nombre"]) || !isset($_POST["precio"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $precio = $_POST["precio"];

        $datos = array();
        $datos = $productos->insertar($nombre, $precio,);
        echo json_encode($datos);
        break;

    case 'actualizar':
        if (!isset($_POST["idProducto"]) || !isset($_POST["nombre"]) || !isset($_POST["precio"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idProducto = intval($_POST["idProducto"]);
        $nombre = $_POST["nombre"];
        $precio = $_POST["precio"];

        $datos = array();
        $datos = $productos->actualizar($idProducto, $nombre, $precio, );
        echo json_encode($datos);
        break;

    case 'eliminar':
        if (!isset($_POST["idProducto"])) {
            echo json_encode(["error" => "Producto ID not specified."]);
            exit();
        }
        $idProducto = intval($_POST["idProducto"]);
        $datos = array();
        $datos = $productos->eliminar($idProducto);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
?>
