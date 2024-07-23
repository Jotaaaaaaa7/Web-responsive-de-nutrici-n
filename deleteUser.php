<?php
include 'conectar.php';

$id = $_GET['id'];

$query = "DELETE FROM usuarios WHERE id = ?";

try {
  $stmt = $db->prepare($query);

  if (!$stmt) {
    throw new Exception("Error preparando la consulta: " . $db->errorInfo()[2]);
  }

  if (!$stmt->execute([$id])) {
    throw new Exception("Error ejecutando la consulta: " . $stmt->errorInfo()[2]);
  }
} catch (Exception $e) {
  http_response_code(500);
  echo $e->getMessage();
  exit();
}

header("Location: gracias.php?msg=Usuario eliminado correctamente");
?>