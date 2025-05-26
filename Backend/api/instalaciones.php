<?php
// Permitir explícitamente el origen de desarrollo
// Obtener el origen de la solicitud
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Lista de orígenes permitidos (incluir todos los posibles en desarrollo)
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://localhost',
    'http://localhost:3000'
];

// Verificar si el origen está permitido
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    // En desarrollo, permitir cualquier origen (NO usar en producción)
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Responder a las peticiones preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir la clase de conexión a BD
require_once '../class.db.php';

// Crear instancia de la base de datos
$database = new DB();
$conn = $database->getConnection();

// Método para obtener todas las instalaciones
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT * FROM instalaciones WHERE activa = 1";
    
    $result = $conn->query($query);
    
    if ($result) {
        $instalaciones = array();
        
        while ($row = $result->fetch_assoc()) {
            $instalacion = array(
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'tipo' => $row['tipo'],
                'descripcion' => $row['descripcion']
            );
            
            array_push($instalaciones, $instalacion);
        }
        
        echo json_encode(array('success' => true, 'instalaciones' => $instalaciones));
    } else {
        http_response_code(500);
        echo json_encode(array('success' => false, 'error' => 'Error al obtener instalaciones: ' . $conn->error));
    }
}
?>
