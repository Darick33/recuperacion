<?php
require('fpdf/fpdf.php');
require_once("../models/pedidos.model.php");

class PDF extends FPDF
{
    // Encabezado personalizado
    function Header()
    {
        // Fuente para el encabezado
        $this->SetFont('Arial', 'B', 16);
        // Color de fondo del encabezado
        $this->SetFillColor(230, 230, 230);
        // Título
        $this->Cell(0, 10, 'Reporte de Proveedor con Mayor Venta', 0, 1, 'C', true);
        // Línea decorativa
        $this->SetDrawColor(50, 50, 100);
        $this->SetLineWidth(1);
        $this->Line(10, 25, 200, 25);
        $this->Ln(10); // Salto de línea
    }

    // Pie de página personalizado
    function Footer()
    {
        // Posición a 1.5 cm del final
        $this->SetY(-15);
        // Fuente para el pie de página
        $this->SetFont('Arial', 'I', 8);
        // Número de página
        $this->Cell(0, 10, 'Pagina ' . $this->PageNo(), 0, 0, 'C');
    }
}

// Crear un nuevo PDF
$pdf = new PDF();
$pdf->AddPage();
$pedidos = new Pedidos();

// Obtener el proveedor con mayor venta
$proveedorMayor = $pedidos->obtenerProveedoresMayor();

// Verificar si hay datos
if (mysqli_num_rows($proveedorMayor) > 0) {
    // Fuente principal
    $pdf->SetFont('Arial', '', 12);
    // Color de texto para los datos
    $pdf->SetTextColor(50, 50, 50);

    while ($prov = mysqli_fetch_assoc($proveedorMayor)) {
        // Estilo y diseño para los detalles del proveedor
        $pdf->SetFillColor(220, 220, 220);  // Color de fondo para los detalles
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(0, 10, 'Proveedor: ' . $prov["proveedor"], 0, 1, 'L', true);

        $pdf->SetFont('Arial', '', 10);
        $pdf->Ln(2); // Espacio

        // Detalles del proveedor en una tabla con bordes y colores
        $pdf->SetFillColor(240, 240, 240);  // Fondo para las celdas
        $pdf->SetDrawColor(180, 180, 180);  // Color de borde
        $pdf->Cell(70, 8, 'Total de Productos Vendidos:', 1, 0, 'L', true);
        $pdf->Cell(0, 8, $prov["totalProductosVendidos"], 1, 1, 'L');

        $pdf->Cell(70, 8, 'Monto Total de Ventas:', 1, 0, 'L', true);
        $pdf->Cell(0, 8, '$' . number_format($prov["montoTotalVentas"], 2), 1, 1, 'L');

        $pdf->Ln(10); // Espacio
    }
} else {
    $pdf->SetFont('Arial', 'I', 10);
    $pdf->Cell(0, 10, 'No se encontraron datos para el período especificado.', 0, 1, 'C');
}

// Salida del PDF
$pdf->Output();
?>
