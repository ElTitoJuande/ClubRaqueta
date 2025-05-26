<?php
// Encabezados CORS - Esto es lo más importante para resolver el problema
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Recibir datos
$datos = json_decode(file_get_contents("php://input"));

// Verificar datos
if (!isset($datos->email) || !isset($datos->password)) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit();
}

// Conectar a la base de datos
$mysqli = new mysqli('localhost', 'root', '', 'club_raqueta_rute');

// Verificar conexión
if ($mysqli->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Error de conexión: ' . $mysqli->connect_error]);
    exit();
}

// Consultar usuario
$query = "SELECT u.id, u.nombre, u.email, u.telefono, r.nombre as rol 
          FROM usuarios u
          JOIN roles r ON u.rol_id = r.id
          WHERE u.email = ? AND u.password = ?";

$stmt = $mysqli->prepare($query);
$stmt->bind_param("ss", $datos->email, $datos->password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $usuario = $result->fetch_assoc();
    echo json_encode(['success' => true, 'usuario' => $usuario]);
} else {
    echo json_encode(['success' => false, 'error' => 'Credenciales incorrectas']);
}

// Cerrar conexión
$mysqli->close();
?>
