<?php
/**
 * Clase para gestionar la conexión a la base de datos
 */
class DB {
    private $host = 'localhost';
    private $db_name = 'club_raqueta_rute';
    private $username = 'root';
    private $password = '';
    private $conn = null;

    /**
     * Constructor que establece la conexión a la base de datos
     */
    public function __construct() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
        
        // Verificar la conexión
        if ($this->conn->connect_error) {
            die("Error de conexión: " . $this->conn->connect_error);
        }
        
        // Establecer charset utf8mb4
        $this->conn->set_charset("utf8mb4");
    }
    
    /**
     * Obtiene la conexión a la base de datos
     * @return mysqli objeto de conexión a la base de datos
     */
    public function getConnection() {
        return $this->conn;
    }
}
?>
