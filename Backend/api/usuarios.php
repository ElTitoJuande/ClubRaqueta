<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
// Permitir credenciales en solicitudes CORS
header('Access-Control-Allow-Credentials: true');
// Aumentamos el max age para evitar preflight repetitivos
header('Access-Control-Max-Age: 86400'); // 24 horas

// Registrar información para depuración
error_log('REQUEST_METHOD: ' . $_SERVER['REQUEST_METHOD']);
error_log('REQUEST_URI: ' . $_SERVER['REQUEST_URI']);
error_log('CONTENT_TYPE: ' . (isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : 'no content type'));
error_log('HTTP_CONTENT_TYPE: ' . (isset($_SERVER['HTTP_CONTENT_TYPE']) ? $_SERVER['HTTP_CONTENT_TYPE'] : 'no http content type'));

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
    $query = "SELECT u.id, u.nombre, u.email, u.dni, u.telefono, r.nombre as rol, u.fecha_registro 
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
                'dni' => $row['dni'],
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
    if (!empty($data->nombre) && !empty($data->email) && !empty($data->dni) && !empty($data->password)) {
        
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
            
            // Verificar si el email o DNI ya existen
            $checkEmail = "SELECT id FROM usuarios WHERE email = ?";
            $stmtCheck = $conn->prepare($checkEmail);
            $stmtCheck->bind_param("s", $data->email);
            $stmtCheck->execute();
            $resultCheck = $stmtCheck->get_result();
            
            $checkDNI = "SELECT id FROM usuarios WHERE dni = ?";
            $stmtCheckDNI = $conn->prepare($checkDNI);
            $stmtCheckDNI->bind_param("s", $data->dni);
            $stmtCheckDNI->execute();
            $resultCheckDNI = $stmtCheckDNI->get_result();
            
            if ($resultCheck->num_rows > 0) {
                http_response_code(400);
                echo json_encode(array('success' => false, 'error' => 'El email ya está registrado'));
            } else if ($resultCheckDNI->num_rows > 0) {
                http_response_code(400);
                echo json_encode(array('success' => false, 'error' => 'El DNI ya está registrado'));
            } else {
                // Insertar el nuevo usuario
                $query = "INSERT INTO usuarios (nombre, email, dni, password, telefono, rol_id) VALUES (?, ?, ?, ?, ?, ?)";
                
                $stmt = $conn->prepare($query);
                $stmt->bind_param("sssssi", $data->nombre, $data->email, $data->dni, $data->password, $data->telefono, $rolId);
                
                if ($stmt->execute()) {
                    $usuarioId = $stmt->insert_id;
                    
                    // Obtener el usuario recién creado
                    $query = "SELECT u.id, u.nombre, u.email, u.dni, u.telefono, r.nombre as rol, u.fecha_registro 
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
                            'dni' => $row['dni'],
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
        echo json_encode(array('success' => false, 'error' => 'Datos incompletos. Nombre, email, DNI y password son obligatorios'));
    }
}

// Método para actualizar usuario (perfil)
// Detectar tanto PUT directo como POST con _method=PUT 
$isPut = $_SERVER['REQUEST_METHOD'] === 'PUT' || ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['_method']) && $_POST['_method'] === 'PUT');

if ($isPut) {
    // Registrar el cuerpo de la solicitud para depuración
    $rawInput = file_get_contents("php://input");
    error_log('DATOS RAW RECIBIDOS: ' . $rawInput);
    
    // Intentar decodificar los datos como JSON
    $data = json_decode($rawInput);
    
    // Si no es JSON válido, intentar obtener los datos desde $_POST
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log('ERROR AL DECODIFICAR JSON: ' . json_last_error_msg());
        error_log('INTENTANDO OBTENER DATOS DE POST');
        
        // Si hay datos POST disponibles, usarlos
        if (!empty($_POST)) {
            $data = (object)$_POST;
            error_log('DATOS POST: ' . print_r($data, true));
        }
    } else {
        error_log('DATOS JSON DECODIFICADOS: ' . print_r($data, true));
    }
    
    // Verificar que existan los datos necesarios
    if (!empty($data->id) && !empty($data->nombre) && !empty($data->email)) {
        
        // Verificar si el usuario existe
        $checkUser = "SELECT id FROM usuarios WHERE id = ?";
        $stmtCheck = $conn->prepare($checkUser);
        $stmtCheck->bind_param("i", $data->id);
        $stmtCheck->execute();
        $resultCheck = $stmtCheck->get_result();
        
        if ($resultCheck->num_rows === 0) {
            http_response_code(404);
            echo json_encode(array('success' => false, 'error' => 'Usuario no encontrado'));
            exit;
        }
        
        // Verificar si el email ya existe para otro usuario
        $checkEmail = "SELECT id FROM usuarios WHERE email = ? AND id != ?";
        $stmtEmail = $conn->prepare($checkEmail);
        $stmtEmail->bind_param("si", $data->email, $data->id);
        $stmtEmail->execute();
        $resultEmail = $stmtEmail->get_result();
        
        if ($resultEmail->num_rows > 0) {
            http_response_code(400);
            echo json_encode(array('success' => false, 'error' => 'El email ya está registrado para otro usuario'));
            exit;
        }
        
        // Verificar si el DNI ya existe para otro usuario
        if (!empty($data->dni)) {
            $checkDNI = "SELECT id FROM usuarios WHERE dni = ? AND id != ?";
            $stmtDNI = $conn->prepare($checkDNI);
            $stmtDNI->bind_param("si", $data->dni, $data->id);
            $stmtDNI->execute();
            $resultDNI = $stmtDNI->get_result();
            
            if ($resultDNI->num_rows > 0) {
                http_response_code(400);
                echo json_encode(array('success' => false, 'error' => 'El DNI ya está registrado para otro usuario'));
                exit;
            }
        }
        
        // Construir la consulta según los datos proporcionados
        $updateFields = array();
        $bindTypes = "";
        $bindValues = array();
        
        // Añadir campos a actualizar
        if (!empty($data->nombre)) {
            $updateFields[] = "nombre = ?";
            $bindTypes .= "s";
            $bindValues[] = $data->nombre;
        }
        
        if (!empty($data->email)) {
            $updateFields[] = "email = ?";
            $bindTypes .= "s";
            $bindValues[] = $data->email;
        }
        
        if (!empty($data->telefono)) {
            $updateFields[] = "telefono = ?";
            $bindTypes .= "s";
            $bindValues[] = $data->telefono;
        }
        
        if (!empty($data->dni)) {
            $updateFields[] = "dni = ?";
            $bindTypes .= "s";
            $bindValues[] = $data->dni;
        }
        
        if (!empty($data->fecha_nacimiento)) {
            $updateFields[] = "fecha_nacimiento = ?";
            $bindTypes .= "s";
            $bindValues[] = $data->fecha_nacimiento;
        }
        
        // Actualizar contraseña solo si se proporcionó
        if (!empty($data->password)) {
            $updateFields[] = "password = ?";
            $bindTypes .= "s";
            $bindValues[] = $data->password;
        }
        
        // Actualizar el rol si se proporcionó
        if (!empty($data->rol)) {
            // Obtener el ID del rol basado en su nombre
            $rolQuery = "SELECT id FROM roles WHERE nombre = ?";
            $stmtRol = $conn->prepare($rolQuery);
            $stmtRol->bind_param("s", $data->rol);
            $stmtRol->execute();
            $resultRol = $stmtRol->get_result();
            
            if ($resultRol->num_rows > 0) {
                $rol = $resultRol->fetch_assoc();
                $rolId = $rol['id'];
                
                $updateFields[] = "rol_id = ?";
                $bindTypes .= "i";
                $bindValues[] = $rolId;
            } else {
                http_response_code(400);
                echo json_encode(array('success' => false, 'error' => 'Rol no encontrado'));
                exit;
            }
        }
        
        // Preparar la consulta si hay campos para actualizar
        if (!empty($updateFields)) {
            $query = "UPDATE usuarios SET " . implode(", ", $updateFields) . " WHERE id = ?";
            $bindTypes .= "i";
            $bindValues[] = $data->id;
            
            $stmt = $conn->prepare($query);
            
            // Usar reflection para hacer bind_param con un array de valores
            $bindValuesRef = array();
            $bindValuesRef[] = &$bindTypes;
            foreach($bindValues as $key => $value) {
                $bindValuesRef[] = &$bindValues[$key];
            }
            
            call_user_func_array(array($stmt, 'bind_param'), $bindValuesRef);
            
            if ($stmt->execute()) {
                // Obtener el usuario actualizado
                $query = "SELECT u.id, u.nombre, u.email, u.dni, u.telefono, u.fecha_nacimiento, r.nombre as rol, u.fecha_registro 
                          FROM usuarios u 
                          JOIN roles r ON u.rol_id = r.id
                          WHERE u.id = ?";
                
                $stmt = $conn->prepare($query);
                $stmt->bind_param("i", $data->id);
                $stmt->execute();
                $result = $stmt->get_result();
                
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    
                    $usuario = array(
                        'id' => $row['id'],
                        'nombre' => $row['nombre'],
                        'email' => $row['email'],
                        'dni' => $row['dni'],
                        'telefono' => $row['telefono'],
                        'fecha_nacimiento' => $row['fecha_nacimiento'],
                        'rol' => $row['rol'],
                        'fechaRegistro' => $row['fecha_registro']
                    );
                    
                    echo json_encode(array('success' => true, 'usuario' => $usuario));
                } else {
                    http_response_code(500);
                    echo json_encode(array('success' => false, 'error' => 'Error al obtener el usuario actualizado'));
                }
            } else {
                http_response_code(500);
                echo json_encode(array('success' => false, 'error' => 'Error al actualizar el usuario: ' . $stmt->error));
            }
        } else {
            http_response_code(400);
            echo json_encode(array('success' => false, 'error' => 'No se proporcionaron campos para actualizar'));
        }
    } else {
        http_response_code(400);
        echo json_encode(array('success' => false, 'error' => 'Datos incompletos. ID, nombre y email son obligatorios'));
    }
}
?>
