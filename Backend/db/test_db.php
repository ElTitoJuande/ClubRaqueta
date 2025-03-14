<?php
require_once('class.db.php');

// Crear una instancia de la clase DB
$db = new DB();
$conn = $db->getConn();

if ($conn->ping()) {
    echo "✅ Conexión exitosa a la base de datos 'club_de_tenis' 🎾";
} else {
    echo "❌ Error en la conexión: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
