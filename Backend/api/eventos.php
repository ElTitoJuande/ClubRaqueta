<?php
/**
 * API para gestionar eventos
 * Proporciona endpoints para obtener, crear, actualizar y eliminar eventos
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
        // Obtener eventos
        getEventos($conn);
        break;
    case 'POST':
        // Crear un nuevo evento
        crearEvento($conn);
        break;
    case 'PUT':
        // Actualizar un evento existente
        actualizarEvento($conn);
        break;
    case 'DELETE':
        // Eliminar un evento
        eliminarEvento($conn);
        break;
    default:
        // Método no permitido
        http_response_code(405);
        echo json_encode(array("mensaje" => "Método no permitido"));
        break;
}

/**
 * Obtiene los eventos según los parámetros de consulta
 * @param mysqli $conn Conexión a la base de datos
 */
function getEventos($conn) {
    // Parámetros de consulta
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $tipo = isset($_GET['tipo']) ? $_GET['tipo'] : null;
    $estado = isset($_GET['estado']) ? $_GET['estado'] : 'activo';
    
    // Construir la consulta SQL base
    $sql = "SELECT * FROM eventos WHERE 1=1";
    
    // Añadir filtros según los parámetros
    if ($id) {
        $sql .= " AND id = " . intval($id);
    }
    
    if ($tipo) {
        $sql .= " AND tipo_evento = '" . $conn->real_escape_string($tipo) . "'";
    }
    
    if ($estado) {
        $sql .= " AND estado = '" . $conn->real_escape_string($estado) . "'";
    }
    
    // Ordenar por fecha de inicio (más próximos primero)
    $sql .= " ORDER BY fecha_inicio ASC, hora_inicio ASC";
    
    // Ejecutar la consulta
    $resultado = $conn->query($sql);
    
    if ($resultado) {
        $eventos = array();
        
        // Recorrer los resultados
        while ($fila = $resultado->fetch_assoc()) {
            // Para simplificar y evitar problemas si la tabla de inscripciones no está creada
            // simplemente usamos las plazas del evento directamente
            $fila['plazas_disponibles'] = $fila['plazas'];
            
            // Añadir evento al array
            $eventos[] = $fila;
        }
        
        // Devolver eventos en formato JSON
        http_response_code(200);
        echo json_encode($eventos);
    } else {
        // Error en la consulta
        http_response_code(500);
        echo json_encode(array("mensaje" => "Error al obtener eventos: " . $conn->error));
    }
}

/**
 * Crea un nuevo evento
 * @param mysqli $conn Conexión a la base de datos
 */
function crearEvento($conn) {
    // Verificar si el usuario tiene permisos de administrador
    // Nota: Implementar verificación de sesión/token según tu sistema de autenticación
    
    // Obtener los datos del cuerpo de la solicitud
    $datos = json_decode(file_get_contents("php://input"), true);
    
    // Verificar si los datos son válidos
    if (
        !isset($datos['titulo']) || 
        !isset($datos['descripcion']) || 
        !isset($datos['fecha_inicio']) || 
        !isset($datos['hora_inicio']) || 
        !isset($datos['fecha_fin']) || 
        !isset($datos['hora_fin']) || 
        !isset($datos['tipo_evento']) || 
        !isset($datos['ubicacion'])
    ) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "Faltan datos obligatorios"));
        return;
    }
    
    // Preparar los datos para la inserción
    $titulo = $conn->real_escape_string($datos['titulo']);
    $descripcion = $conn->real_escape_string($datos['descripcion']);
    $descripcion_completa = isset($datos['descripcion_completa']) ? $conn->real_escape_string($datos['descripcion_completa']) : $descripcion;
    $fecha_inicio = $conn->real_escape_string($datos['fecha_inicio']);
    $hora_inicio = $conn->real_escape_string($datos['hora_inicio']);
    $fecha_fin = $conn->real_escape_string($datos['fecha_fin']);
    $hora_fin = $conn->real_escape_string($datos['hora_fin']);
    $imagen = isset($datos['imagen']) ? $conn->real_escape_string($datos['imagen']) : '/src/assets/images/eventos-default.jpg';
    $plazas = isset($datos['plazas']) ? intval($datos['plazas']) : 0;
    $tipo_evento = $conn->real_escape_string($datos['tipo_evento']);
    $ubicacion = $conn->real_escape_string($datos['ubicacion']);
    $estado = isset($datos['estado']) ? $conn->real_escape_string($datos['estado']) : 'activo';
    
    // Construir la consulta SQL
    $sql = "INSERT INTO eventos (
        titulo, descripcion, descripcion_completa, fecha_inicio, hora_inicio, 
        fecha_fin, hora_fin, imagen, plazas, tipo_evento, ubicacion, estado
    ) VALUES (
        '$titulo', '$descripcion', '$descripcion_completa', '$fecha_inicio', '$hora_inicio', 
        '$fecha_fin', '$hora_fin', '$imagen', $plazas, '$tipo_evento', '$ubicacion', '$estado'
    )";
    
    // Ejecutar la consulta
    if ($conn->query($sql)) {
        // Obtener el ID del evento creado
        $id = $conn->insert_id;
        
        // Devolver el evento creado
        http_response_code(201);
        echo json_encode(array(
            "mensaje" => "Evento creado exitosamente",
            "id" => $id
        ));
    } else {
        // Error en la consulta
        http_response_code(500);
        echo json_encode(array("mensaje" => "Error al crear el evento: " . $conn->error));
    }
}

/**
 * Actualiza un evento existente
 * @param mysqli $conn Conexión a la base de datos
 */
function actualizarEvento($conn) {
    // Verificar si el usuario tiene permisos de administrador
    // Nota: Implementar verificación de sesión/token según tu sistema de autenticación
    
    // Obtener los datos del cuerpo de la solicitud
    $datos = json_decode(file_get_contents("php://input"), true);
    
    // Verificar si se proporcionó un ID
    if (!isset($datos['id'])) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "Se requiere el ID del evento"));
        return;
    }
    
    // Obtener el ID del evento
    $id = intval($datos['id']);
    
    // Verificar si el evento existe
    $sql = "SELECT * FROM eventos WHERE id = $id";
    $resultado = $conn->query($sql);
    
    if (!$resultado || $resultado->num_rows === 0) {
        http_response_code(404);
        echo json_encode(array("mensaje" => "Evento no encontrado"));
        return;
    }
    
    // Construir la consulta SQL para actualizar
    $sql = "UPDATE eventos SET ";
    $actualizaciones = array();
    
    // Añadir los campos a actualizar
    if (isset($datos['titulo'])) {
        $actualizaciones[] = "titulo = '" . $conn->real_escape_string($datos['titulo']) . "'";
    }
    
    if (isset($datos['descripcion'])) {
        $actualizaciones[] = "descripcion = '" . $conn->real_escape_string($datos['descripcion']) . "'";
    }
    
    if (isset($datos['descripcion_completa'])) {
        $actualizaciones[] = "descripcion_completa = '" . $conn->real_escape_string($datos['descripcion_completa']) . "'";
    }
    
    if (isset($datos['fecha_inicio'])) {
        $actualizaciones[] = "fecha_inicio = '" . $conn->real_escape_string($datos['fecha_inicio']) . "'";
    }
    
    if (isset($datos['hora_inicio'])) {
        $actualizaciones[] = "hora_inicio = '" . $conn->real_escape_string($datos['hora_inicio']) . "'";
    }
    
    if (isset($datos['fecha_fin'])) {
        $actualizaciones[] = "fecha_fin = '" . $conn->real_escape_string($datos['fecha_fin']) . "'";
    }
    
    if (isset($datos['hora_fin'])) {
        $actualizaciones[] = "hora_fin = '" . $conn->real_escape_string($datos['hora_fin']) . "'";
    }
    
    if (isset($datos['imagen'])) {
        $actualizaciones[] = "imagen = '" . $conn->real_escape_string($datos['imagen']) . "'";
    }
    
    if (isset($datos['plazas'])) {
        $actualizaciones[] = "plazas = " . intval($datos['plazas']);
    }
    
    if (isset($datos['tipo_evento'])) {
        $actualizaciones[] = "tipo_evento = '" . $conn->real_escape_string($datos['tipo_evento']) . "'";
    }
    
    if (isset($datos['ubicacion'])) {
        $actualizaciones[] = "ubicacion = '" . $conn->real_escape_string($datos['ubicacion']) . "'";
    }
    
    if (isset($datos['estado'])) {
        $actualizaciones[] = "estado = '" . $conn->real_escape_string($datos['estado']) . "'";
    }
    
    // Verificar si hay campos para actualizar
    if (empty($actualizaciones)) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "No se proporcionaron campos para actualizar"));
        return;
    }
    
    // Completar la consulta SQL
    $sql .= implode(", ", $actualizaciones);
    $sql .= " WHERE id = $id";
    
    // Ejecutar la consulta
    if ($conn->query($sql)) {
        // Devolver respuesta exitosa
        http_response_code(200);
        echo json_encode(array("mensaje" => "Evento actualizado exitosamente"));
    } else {
        // Error en la consulta
        http_response_code(500);
        echo json_encode(array("mensaje" => "Error al actualizar el evento: " . $conn->error));
    }
}

/**
 * Elimina un evento existente
 * @param mysqli $conn Conexión a la base de datos
 */
function eliminarEvento($conn) {
    // Verificar si el usuario tiene permisos de administrador
    // Nota: Implementar verificación de sesión/token según tu sistema de autenticación
    
    // Obtener el ID del evento a eliminar
    $datos = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($datos['id'])) {
        http_response_code(400);
        echo json_encode(array("mensaje" => "Se requiere el ID del evento"));
        return;
    }
    
    // Obtener el ID del evento
    $id = intval($datos['id']);
    
    // Verificar si el evento existe
    $sql = "SELECT * FROM eventos WHERE id = $id";
    $resultado = $conn->query($sql);
    
    if (!$resultado || $resultado->num_rows === 0) {
        http_response_code(404);
        echo json_encode(array("mensaje" => "Evento no encontrado"));
        return;
    }
    
    // Eliminar el evento
    $sql = "DELETE FROM eventos WHERE id = $id";
    
    if ($conn->query($sql)) {
        // Devolver respuesta exitosa
        http_response_code(200);
        echo json_encode(array("mensaje" => "Evento eliminado exitosamente"));
    } else {
        // Error en la consulta
        http_response_code(500);
        echo json_encode(array("mensaje" => "Error al eliminar el evento: " . $conn->error));
    }
}
?>
