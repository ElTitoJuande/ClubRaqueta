<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir la clase de conexión a BD
require_once '../class.db.php';

// Crear instancia de la base de datos
$database = new DB();
$conn = $database->getConnection();

// Método para obtener todos los usuarios
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT u.id, u.nombre, u.email, u.telefono, r.nombre as rol, u.fecha_registro 
              FROM usuarios u 
              JOIN roles r ON u.rol_id = r.id";
    
    $result = $conn->query($query);
    
    if ($result) {
        $usuarios = array();
        
        while ($row = $result->fetch_assoc()) {
            // Transformar el nombre del rol a las constantes que usa el frontend
            $rolId = $row['rol']; // Ya está en formato ADMIN, SOCIO, INVITADO
            
            $usuario = array(
                'id' => $row['id'],
                'nombre' => $row['nombre'],
                'email' => $row['email'],
                'telefono' => $row['telefono'],
                'rol' => $rolId,
                'fechaRegistro' => $row['fecha_registro']
            );
            
            array_push($usuarios, $usuario);
        }
        
        echo json_encode($usuarios);
    } else {
        http_response_code(500);
        echo json_encode(array('mensaje' => 'Error al obtener usuarios: ' . $conn->error));
    }
}

// Método para registrar un nuevo usuario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados
    $data = json_decode(file_get_contents("php://input"));
    
    // Verificar que existan los datos necesarios
    if (!empty($data->nombre) && !empty($data->email) && !empty($data->password)) {
        
        // Obtener el ID del rol basado en su nombre
        $rolQuery = "SELECT id FROM roles WHERE nombre = ?";
        $stmt = $conn->prepare($rolQuery);
        
        // Convertir el rol del frontend al formato de la base de datos
        $rolNombre = $data->rol ?? 'INVITADO';
        
        $stmt->bind_param("s", $rolNombre);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $rol = $result->fetch_assoc();
            $rolId = $rol['id'];
            
            // Verificar si el email ya existe
            $checkEmail = "SELECT id FROM usuarios WHERE email = ?";
            $stmtCheck = $conn->prepare($checkEmail);
            $stmtCheck->bind_param("s", $data->email);
            $stmtCheck->execute();
            $resultCheck = $stmtCheck->get_result();
            
            if ($resultCheck->num_rows > 0) {
                http_response_code(400);
                echo json_encode(array('success' => false, 'error' => 'El email ya está registrado'));
            } else {
                // Insertar el nuevo usuario
                $query = "INSERT INTO usuarios (nombre, email, password, telefono, rol_id) VALUES (?, ?, ?, ?, ?)";
                
                $stmt = $conn->prepare($query);
                $stmt->bind_param("ssssi", $data->nombre, $data->email, $data->password, $data->telefono, $rolId);
                
                if ($stmt->execute()) {
                    $usuarioId = $stmt->insert_id;
                    
                    // Obtener el usuario recién creado
                    $query = "SELECT u.id, u.nombre, u.email, u.telefono, r.nombre as rol, u.fecha_registro 
                              FROM usuarios u 
                              JOIN roles r ON u.rol_id = r.id
                              WHERE u.id = ?";
                    
                    $stmt = $conn->prepare($query);
                    $stmt->bind_param("i", $usuarioId);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    
                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        
                        $usuario = array(
                            'id' => $row['id'],
                            'nombre' => $row['nombre'],
                            'email' => $row['email'],
                            'telefono' => $row['telefono'],
                            'rol' => $row['rol'],
                            'fechaRegistro' => $row['fecha_registro']
                        );
                        
                        http_response_code(201);
                        echo json_encode(array('success' => true, 'usuario' => $usuario));
                    } else {
                        http_response_code(500);
                        echo json_encode(array('success' => false, 'error' => 'Error al obtener el usuario creado'));
                    }
                } else {
                    http_response_code(500);
                    echo json_encode(array('success' => false, 'error' => 'Error al registrar el usuario: ' . $stmt->error));
                }
            }
        } else {
            http_response_code(400);
            echo json_encode(array('success' => false, 'error' => 'Rol no encontrado'));
        }
    } else {
        http_response_code(400);
        echo json_encode(array('success' => false, 'error' => 'Datos incompletos. Nombre, email y password son obligatorios'));
    }
}
?>
