<?php
/**
 * API para gestionar inscripciones a eventos
 * Proporciona endpoints para inscribir usuarios a eventos, cancelar inscripciones
 * y obtener información sobre inscripciones
 */

// Permitir solicitudes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Si es una solicitud OPTIONS, solo devolver los encabezados
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Incluir la clase de base de datos
require_once '../class.db.php';

// Obtener la conexión a la base de datos
$database = new DB();
$conn = $database->getConnection();

// Verificar la conexión
if (!$conn) {
    http_response_code(500);
    echo json_encode(array("mensaje" => "Error de conexión a la base de datos"));
    exit;
}

// Obtener el método HTTP
$metodo = $_SERVER['REQUEST_METHOD'];

// Procesamiento según el método HTTP
switch ($metodo) {
    case 'GET':
        // Obtener inscripciones
        getInscripciones($conn);
        break;
    case 'POST':
        // Crear una nueva inscripción
        crearInscripcion($conn);
        break;
    case 'PUT':
        // Actualizar estado de una inscripción
        actualizarInscripcion($conn);
        break;
    case 'DELETE':
        // Cancelar una inscripción
        cancelarInscripcion($conn);
        break;
    default:
        // Método no permitido
        http_response_code(405);
        echo json_encode(array("mensaje" => "Método no permitido"));
        break;
}

/**
 * Obtiene las inscripciones según los parámetros de consulta
 * @param mysqli $conn Conexión a la base de datos
 */
function getInscripciones($conn) {
    // Parámetros de consulta
    $id_usuario = isset($_GET['id_usuario']) ? intval($_GET['id_usuario']) : null;
    $id_evento = isset($_GET['id_evento']) ? intval($_GET['id_evento']) : null;
    $estado = isset($_GET['estado']) ? $_GET['estado'] : null;
    
    // Construir la consulta SQL base
    $sql = "SELECT i.*, e.titulo as evento_titulo, e.fecha_inicio, e.hora_inicio, e.tipo_evento 
            FROM inscripciones_eventos i 
            JOIN eventos e ON i.id_evento = e.id 
            WHERE 1=1";
    
    // Añadir filtros según los parámetros
    if ($id_usuario) {
        $sql .= " AND i.id_usuario = $id_usuario";
    }
    
    if ($id_evento) {
        $sql .= " AND i.id_evento = $id_evento";
    }
    
    if ($estado) {
        $sql .= " AND i.estado = '" . $conn->real_escape_string($estado) . "'";
    }
    
    // Ordenar por fecha de inscripción (más recientes primero)
    $sql .= " ORDER BY i.fecha_inscripcion DESC";
    
    // Ejecutar la consulta
    $resultado = $conn->query($sql);
    
    if ($resultado) {
        $inscripciones = array();
        
        // Recorrer los resultados
        while ($fila = $resultado->fetch_assoc()) {
            $inscripciones[] = $fila;
        }
        
        // Devolver inscripciones en formato JSON
        http_response_code(200);
        echo json_encode($inscripciones);
    } else {
        // Error en la consulta
        http_response_code(500);
        echo json_encode(array("mensaje" => "Error al obtener inscripciones: " . $conn->error));
    }
}

/**
 * Crea una nueva inscripción a un evento
 * @param mysqli $conn Conexión a la base de datos
 */
function crearInscripcion($conn) {
    // Obtener los datos del cuerpo de la solicitud
    $datos = json_decode(file_get_contents("php://input"), true);
    
    // Verificar si los datos son válidos
    if (!isset($datos['id_evento']) || !isset($datos['id_usuario'])) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "Se requiere ID del evento y del usuario"));
        return;
    }
    
    // Obtener los datos
    $id_evento = intval($datos['id_evento']);
    $id_usuario = intval($datos['id_usuario']);
    $estado = isset($datos['estado']) ? $conn->real_escape_string($datos['estado']) : 'pendiente';
    
    // Verificar si el evento existe y tiene plazas disponibles
    $sqlEvento = "SELECT * FROM eventos WHERE id = $id_evento AND estado = 'activo'";
    $resultadoEvento = $conn->query($sqlEvento);
    
    if (!$resultadoEvento || $resultadoEvento->num_rows === 0) {
        http_response_code(404);
        echo json_encode(array("mensaje" => "Evento no encontrado o no activo"));
        return;
    }
    
    $evento = $resultadoEvento->fetch_assoc();
    
    // Contar inscripciones confirmadas
    $sqlPlazas = "SELECT COUNT(*) as inscritos FROM inscripciones_eventos 
                  WHERE id_evento = $id_evento AND estado = 'confirmada'";
    $resultadoPlazas = $conn->query($sqlPlazas);
    $inscritos = 0;
    
    if ($resultadoPlazas && $filaPlazas = $resultadoPlazas->fetch_assoc()) {
        $inscritos = $filaPlazas['inscritos'];
    }
    
    // Verificar plazas disponibles
    if ($inscritos >= $evento['plazas'] && $evento['plazas'] > 0) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "No hay plazas disponibles para este evento"));
        return;
    }
    
    // Verificar si el usuario ya está inscrito
    $sqlInscrito = "SELECT * FROM inscripciones_eventos 
                    WHERE id_evento = $id_evento AND id_usuario = $id_usuario";
    $resultadoInscrito = $conn->query($sqlInscrito);
    
    if ($resultadoInscrito && $resultadoInscrito->num_rows > 0) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "El usuario ya está inscrito en este evento"));
        return;
    }
    
    // Insertar la nueva inscripción
    $sql = "INSERT INTO inscripciones_eventos (id_evento, id_usuario, estado) 
            VALUES ($id_evento, $id_usuario, '$estado')";
    
    if ($conn->query($sql)) {
        // Obtener el ID de la inscripción creada
        $id = $conn->insert_id;
        
        // Devolver la inscripción creada
        http_response_code(201);
        echo json_encode(array(
            "mensaje" => "Inscripción creada exitosamente",
            "id" => $id,
            "id_evento" => $id_evento,
            "id_usuario" => $id_usuario,
            "estado" => $estado
        ));
    } else {
        // Error en la consulta
        http_response_code(500);
        echo json_encode(array("mensaje" => "Error al crear la inscripción: " . $conn->error));
    }
}

/**
 * Actualiza el estado de una inscripción
 * @param mysqli $conn Conexión a la base de datos
 */
function actualizarInscripcion($conn) {
    // Obtener los datos del cuerpo de la solicitud
    $datos = json_decode(file_get_contents("php://input"), true);
    
    // Verificar si los datos son válidos
    if (!isset($datos['id']) || !isset($datos['estado'])) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "Se requiere ID de la inscripción y el nuevo estado"));
        return;
    }
    
    // Obtener los datos
    $id = intval($datos['id']);
    $estado = $conn->real_escape_string($datos['estado']);
    
    // Verificar estados válidos
    if (!in_array($estado, ['pendiente', 'confirmada', 'cancelada'])) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "Estado no válido"));
        return;
    }
    
    // Verificar si la inscripción existe
    $sqlInscripcion = "SELECT * FROM inscripciones_eventos WHERE id = $id";
    $resultadoInscripcion = $conn->query($sqlInscripcion);
    
    if (!$resultadoInscripcion || $resultadoInscripcion->num_rows === 0) {
        http_response_code(404);
        echo json_encode(array("mensaje" => "Inscripción no encontrada"));
        return;
    }
    
    // Actualizar el estado de la inscripción
    $sql = "UPDATE inscripciones_eventos SET estado = '$estado' WHERE id = $id";
    
    if ($conn->query($sql)) {
        // Devolver respuesta exitosa
        http_response_code(200);
        echo json_encode(array(
            "mensaje" => "Estado de inscripción actualizado exitosamente",
            "id" => $id,
            "estado" => $estado
        ));
    } else {
        // Error en la consulta
        http_response_code(500);
        echo json_encode(array("mensaje" => "Error al actualizar la inscripción: " . $conn->error));
    }
}

/**
 * Cancela una inscripción (cambia el estado a 'cancelada')
 * @param mysqli $conn Conexión a la base de datos
 */
function cancelarInscripcion($conn) {
    // Obtener los datos del cuerpo de la solicitud
    $datos = json_decode(file_get_contents("php://input"), true);
    
    // Verificar si los datos son válidos
    if (!isset($datos['id'])) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "Se requiere ID de la inscripción"));
        return;
    }
    
    // Obtener el ID de la inscripción
    $id = intval($datos['id']);
    
    // Verificar si la inscripción existe
    $sqlInscripcion = "SELECT * FROM inscripciones_eventos WHERE id = $id";
    $resultadoInscripcion = $conn->query($sqlInscripcion);
    
    if (!$resultadoInscripcion || $resultadoInscripcion->num_rows === 0) {
        http_response_code(404);
        echo json_encode(array("mensaje" => "Inscripción no encontrada"));
        return;
    }
    
    // Actualizar el estado de la inscripción a 'cancelada'
    $sql = "UPDATE inscripciones_eventos SET estado = 'cancelada' WHERE id = $id";
    
    if ($conn->query($sql)) {
        // Devolver respuesta exitosa
        http_response_code(200);
        echo json_encode(array(
            "mensaje" => "Inscripción cancelada exitosamente",
            "id" => $id
        ));
    } else {
        // Error en la consulta
        http_response_code(500);
        echo json_encode(array("mensaje" => "Error al cancelar la inscripción: " . $conn->error));
    }
}
?>
