<?php
require('fpdf/fpdf.php');
require_once("../models/conferencias.model.php");
require_once("../models/asistentes.model.php");

$pdf = new FPDF();
$pdf->AddPage();
$conferencias = new Conferencias();
$asistentes = new Asistentes();

// Encabezado
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, mb_convert_encoding('Reporte de Conferencias y Asistentes', 'ISO-8859-1', 'UTF-8'), 0, 1, 'C');
$pdf->Ln(5);

// Estilo para los títulos de las tablas
$pdf->SetFont('Arial', 'B', 12);

// Generar conferencias con sus asistentes
$listaconferencias = $conferencias->todos();

while ($conf = mysqli_fetch_assoc($listaconferencias)) {
    // Mostrar detalles de la conferencia
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 10, mb_convert_encoding($conf["nombre"], 'ISO-8859-1', 'UTF-8'), 0, 1);
    $pdf->SetFont('Arial', '', 10);
    $pdf->Cell(0, 6, mb_convert_encoding('Fecha: ' . $conf["fecha"], 'ISO-8859-1', 'UTF-8'), 0, 1);
    $pdf->Cell(0, 6, mb_convert_encoding('Ubicación: ' . $conf["ubicacion"], 'ISO-8859-1', 'UTF-8'), 0, 1);
    $pdf->Ln(3);

    // Obtener asistentes de la conferencia
    $listaAsistentes = $asistentes->asistentesPorConferencia($conf["conferencia_id"]);

    // Tabla de asistentes
    if (mysqli_num_rows($listaAsistentes) > 0) {
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(10, 8, "#", 1, 0, 'C');
        $pdf->Cell(50, 8, mb_convert_encoding('Nombre', 'ISO-8859-1', 'UTF-8'), 1, 0, 'C');
        $pdf->Cell(50, 8, mb_convert_encoding('Apellido', 'ISO-8859-1', 'UTF-8'), 1, 0, 'C');
        $pdf->Cell(80, 8, mb_convert_encoding('Correo Electrónico', 'ISO-8859-1', 'UTF-8'), 1, 1, 'C');

        // Mostrar los asistentes
        $index = 1;
        $pdf->SetFont('Arial', '', 10);
        while ($asist = mysqli_fetch_assoc($listaAsistentes)) {
            $pdf->Cell(10, 8, $index, 1, 0, 'C');
            $pdf->Cell(50, 8, mb_convert_encoding($asist["nombre"], 'ISO-8859-1', 'UTF-8'), 1, 0);
            $pdf->Cell(50, 8, mb_convert_encoding($asist["apellido"], 'ISO-8859-1', 'UTF-8'), 1, 0);
            $pdf->Cell(80, 8, mb_convert_encoding($asist["email"], 'ISO-8859-1', 'UTF-8'), 1, 1);
            $index++;
        }
    } else {
        $pdf->SetFont('Arial', 'I', 10);
        $pdf->Cell(0, 10, mb_convert_encoding('No hay asistentes registrados para esta conferencia.', 'ISO-8859-1', 'UTF-8'), 0, 1);
    }

    $pdf->Ln(5);
}

// Pie de página
$pdf->SetY(-15);
$pdf->SetFont('Arial', 'I', 8);

// Salida
$pdf->Output();
?>
