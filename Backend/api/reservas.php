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

// Método para obtener reservas (todas o por usuario)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $usuario_id = isset($_GET['usuario_id']) ? $_GET['usuario_id'] : null;
    
    // Comprobar si se pide todas las reservas ('all')
    $obtener_todas = ($usuario_id === 'all');
    
    if ($usuario_id && !$obtener_todas) {
        // Convertir a entero para consultas de usuario específico
        $usuario_id = intval($usuario_id);
        
        // Obtener reservas de un usuario específico
        $query = "SELECT r.id, r.usuario_id, r.instalacion_id, i.nombre as instalacion_nombre, 
                  r.fecha, r.hora_inicio, r.hora_fin, r.fecha_creacion,
                  i.nombre as recurso
                  FROM reservas r
                  JOIN instalaciones i ON r.instalacion_id = i.id
                  WHERE r.usuario_id = ?
                  ORDER BY r.fecha DESC, r.hora_inicio";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $usuario_id);
        $stmt->execute();
        $result = $stmt->get_result();
    } else {
        // Obtener todas las reservas
        $query = "SELECT r.id, r.usuario_id, u.nombre as usuario_nombre, r.instalacion_id, 
                  i.nombre as instalacion_nombre, r.fecha, r.hora_inicio, r.hora_fin, r.fecha_creacion,
                  i.nombre as recurso
                  FROM reservas r
                  JOIN usuarios u ON r.usuario_id = u.id
                  JOIN instalaciones i ON r.instalacion_id = i.id
                  ORDER BY r.fecha DESC, r.hora_inicio";
        
        $result = $conn->query($query);
    }
    
    if ($result) {
        $reservas = array();
        
        while ($row = $result->fetch_assoc()) {
            $reserva = array(
                'id' => $row['id'],
                'usuarioId' => $row['usuario_id'],
                'instalacionId' => $row['instalacion_id'],
                'instalacionNombre' => $row['instalacion_nombre'],
                'fecha' => $row['fecha'],
                'horaInicio' => $row['hora_inicio'],
                'horaFin' => $row['hora_fin'],
                'fechaCreacion' => $row['fecha_creacion'],
                'recurso' => $row['recurso']
            );
            
            // Añadir nombre de usuario solo si es la consulta de todas las reservas
            if (isset($row['usuario_nombre'])) {
                $reserva['usuarioNombre'] = $row['usuario_nombre'];
            }
            
            array_push($reservas, $reserva);
        }
        
        echo json_encode(array('success' => true, 'reservas' => $reservas));
    } else {
        http_response_code(500);
        echo json_encode(array('success' => false, 'error' => 'Error al obtener reservas: ' . $conn->error));
    }
}

// Método para crear una nueva reserva
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados
    $data = json_decode(file_get_contents("php://input"));
    
    // Depuración - Guardar los datos recibidos en un archivo de log
    error_log("Datos recibidos en reservas.php: " . print_r($data, true));
    
    // Verificar que existan los datos necesarios (soportar tanto camelCase como snake_case)
    $usuario_id = $data->usuarioId ?? $data->usuario_id ?? null;
    $instalacion_id = $data->instalacionId ?? $data->instalacion_id ?? null;
    $fecha = $data->fecha ?? null;
    $hora_inicio = $data->horaInicio ?? $data->hora_inicio ?? null;
    $hora_fin = $data->horaFin ?? $data->hora_fin ?? null;
    
    // Verificar que todos los datos estén presentes
    if (!empty($usuario_id) && !empty($instalacion_id) && 
        !empty($fecha) && !empty($hora_inicio) && !empty($hora_fin)) {
        
        // Validar disponibilidad
        $query = "SELECT id FROM reservas 
                  WHERE instalacion_id = ? AND fecha = ? AND 
                  ((hora_inicio <= ? AND hora_fin > ?) OR 
                   (hora_inicio < ? AND hora_fin >= ?) OR 
                   (hora_inicio >= ? AND hora_fin <= ?))";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param("isssssss", 
            $instalacion_id, 
            $fecha, 
            $hora_fin, $hora_inicio, 
            $hora_fin, $hora_inicio, 
            $hora_inicio, $hora_fin
        );
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            // Ya existe una reserva en ese horario
            http_response_code(400);
            echo json_encode(array('success' => false, 'error' => 'La instalación no está disponible en el horario seleccionado'));
        } else {
            // Crear la nueva reserva
            $query = "INSERT INTO reservas (usuario_id, instalacion_id, fecha, hora_inicio, hora_fin) 
                      VALUES (?, ?, ?, ?, ?)";
            
            $stmt = $conn->prepare($query);
            $stmt->bind_param("iisss", 
                $usuario_id, 
                $instalacion_id, 
                $fecha, 
                $hora_inicio, 
                $hora_fin
            );
            
            if ($stmt->execute()) {
                $reservaId = $stmt->insert_id;
                
                // Obtener la reserva recién creada
                $query = "SELECT r.id, r.usuario_id, r.instalacion_id, i.nombre as instalacion_nombre, 
                          r.fecha, r.hora_inicio, r.hora_fin, r.fecha_creacion 
                          FROM reservas r
                          JOIN instalaciones i ON r.instalacion_id = i.id
                          WHERE r.id = ?";
                
                $stmt = $conn->prepare($query);
                $stmt->bind_param("i", $reservaId);
                $stmt->execute();
                $result = $stmt->get_result();
                
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    
                    $reserva = array(
                        'id' => $row['id'],
                        'usuarioId' => $row['usuario_id'],
                        'instalacionId' => $row['instalacion_id'],
                        'instalacionNombre' => $row['instalacion_nombre'],
                        'fecha' => $row['fecha'],
                        'horaInicio' => $row['hora_inicio'],
                        'horaFin' => $row['hora_fin'],
                        'fechaCreacion' => $row['fecha_creacion']
                    );
                    
                    http_response_code(201);
                    echo json_encode(array('success' => true, 'reserva' => $reserva));
                } else {
                    http_response_code(500);
                    echo json_encode(array('success' => false, 'error' => 'Error al obtener la reserva creada'));
                }
            } else {
                http_response_code(500);
                echo json_encode(array('success' => false, 'error' => 'Error al crear la reserva: ' . $stmt->error));
            }
        }
    } else {
        http_response_code(400);
        echo json_encode(array('success' => false, 'error' => 'Datos incompletos para crear la reserva'));
    }
}

// Método para cancelar una reserva
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $reserva_id = isset($_GET['id']) ? intval($_GET['id']) : null;
    $usuario_id = isset($_GET['usuario_id']) ? intval($_GET['usuario_id']) : null;
    $es_admin = isset($_GET['es_admin']) ? filter_var($_GET['es_admin'], FILTER_VALIDATE_BOOLEAN) : false;
    
    if ($reserva_id) {
        // Verificar si la reserva existe
        $query = "SELECT usuario_id FROM reservas WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $reserva_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            
            // Verificar si el usuario tiene permiso para cancelar esta reserva
            if ($es_admin || $row['usuario_id'] == $usuario_id) {
                $query = "DELETE FROM reservas WHERE id = ?";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("i", $reserva_id);
                
                if ($stmt->execute()) {
                    echo json_encode(array('success' => true, 'mensaje' => 'Reserva cancelada correctamente'));
                } else {
                    http_response_code(500);
                    echo json_encode(array('success' => false, 'error' => 'Error al cancelar la reserva: ' . $stmt->error));
                }
            } else {
                http_response_code(403);
                echo json_encode(array('success' => false, 'error' => 'No tienes permiso para cancelar esta reserva'));
            }
        } else {
            http_response_code(404);
            echo json_encode(array('success' => false, 'error' => 'Reserva no encontrada'));
        }
    } else {
        http_response_code(400);
        echo json_encode(array('success' => false, 'error' => 'ID de reserva requerido'));
    }
}
?>
