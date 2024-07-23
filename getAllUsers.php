<?php
include 'conectar.php';

try {
  $query = $db->query("SELECT * FROM usuarios");

  $users = $query->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $error) {
  die("Error al obtener usuarios: " . $error->getMessage());
}

return json_encode($users);
?>