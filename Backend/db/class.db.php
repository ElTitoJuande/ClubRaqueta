<?php
require_once("../../../../../cred.php");
    class db{

        private $conn;
        
        //Establece la conexión con la base de datos MySQL usando credenciales externas
        public function __construct(){
            $this->conn = new mysqli("Localhost", USU_CONN, PSW_CONN, "club_raqueta");
            
            if ($this->conn->connect_error) {
                die("Error en la conexión: " . $this->conn->connect_error);
            }
        }

        //Método para obtener la conexión mysqli
        public function getConn() {
            return $this->conn;
        }
    }
    
?>
