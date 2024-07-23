<?php
include 'conectar.php';

$newName = $_REQUEST['name'];
$newEmail = $_REQUEST['email'];
$newPhone = $_REQUEST['phone'];
$newMessage = $_REQUEST['message'];

$query = "INSERT INTO usuarios(name, email, phone, message) VALUES (?, ?, ?, ?)";

try {
  $stmt = $db->prepare($query);

  if (!$stmt) {
    throw new Exception("Error preparando la consulta: " . $db->errorInfo()[2]);
  }

  if (!$stmt->execute([$newName, $newEmail, $newPhone, $newMessage])) {
    throw new Exception("Error ejecutando la consulta: " . $stmt->errorInfo()[2]);
  }
} catch (Exception $e) {
  http_response_code(500);
  echo $e->getMessage();
  exit();
}

echo "Usuario creado con éxito";
?>