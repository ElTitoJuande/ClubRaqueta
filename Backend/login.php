<?php
// Encabezados CORS correctos (más permisivos para desarrollo)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir la clase de conexión a BD
require_once 'class.db.php';

// Obtener datos JSON de la solicitud
$data = json_decode(file_get_contents("php://input"));

// Verificar si los datos existen
if (!isset($data->email) || !isset($data->password)) {
    echo json_encode([
        'success' => false,
        'error' => 'Datos incompletos. Email y contraseña son requeridos.'
    ]);
    exit();
}

try {
    // Crear instancia de la base de datos
    $database = new DB();
    $conn = $database->getConnection();
    
    // Consultar el usuario por email
    $query = "SELECT u.id, u.nombre, u.email, u.password, u.telefono, r.nombre as rol, u.fecha_registro 
              FROM usuarios u 
              JOIN roles r ON u.rol_id = r.id
              WHERE u.email = ?";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $data->email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Verificar la contraseña
        if ($row['password'] === $data->password) { // En producción debería usar password_verify()
            // Crear objeto de usuario para la respuesta (sin la contraseña)
            $usuario = array(
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'email' => $row['email'],
                'telefono' => $row['telefono'],
                'rol' => $row['rol'],
                'fechaRegistro' => $row['fecha_registro']
            );
            
            echo json_encode([
                'success' => true,
                'usuario' => $usuario,
                'message' => 'Inicio de sesión exitoso'
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'error' => 'Contraseña incorrecta'
            ]);
        }
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'error' => 'Usuario no encontrado'
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error en el servidor: ' . $e->getMessage()
    ]);
}
?>
