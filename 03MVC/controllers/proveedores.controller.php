<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/proveedores.model.php');
error_reporting(0);
$proveedores = new Proveedores;

switch ($_GET["op"]) {
    
    case 'todos':
        $datos = array();
        $datos = $proveedores->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno':
        if (!isset($_POST["idProveedor"])) {
            echo json_encode(["error" => "Proveedor ID not specified."]);
            exit();
        }
        $idProveedor = intval($_POST["idProveedor"]);
        $datos = array();
        $datos = $proveedores->uno($idProveedor);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar':
        if (!isset($_POST["nombre"]) || !isset($_POST["direccion"]) || !isset($_POST["telefono"]) || !isset($_POST["email"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $direccion = $_POST["direccion"];
        $telefono = $_POST["telefono"];
        $email = $_POST["email"];

        $datos = array();
        $datos = $proveedores->insertar($nombre, $direccion, $telefono, $email);
        echo json_encode($datos);
        break;

    case 'actualizar':
        if (!isset($_POST["idProveedor"]) || !isset($_POST["nombre"]) || !isset($_POST["direccion"]) || !isset($_POST["telefono"]) || !isset($_POST["email"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idProveedor = intval($_POST["idProveedor"]);
        $nombre = $_POST["nombre"];
        $direccion = $_POST["direccion"];
        $telefono = $_POST["telefono"];
        $email = $_POST["email"];

        $datos = array();
        $datos = $proveedores->actualizar($idProveedor, $nombre, $direccion, $telefono, $email);
        echo json_encode($datos);
        break;

    case 'eliminar':
        if (!isset($_POST["idProveedor"])) {
            echo json_encode(["error" => "Proveedor ID not specified."]);
            exit();
        }
        $idProveedor = intval($_POST["idProveedor"]);
        $datos = array();
        $datos = $proveedores->eliminar($idProveedor);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
?>
