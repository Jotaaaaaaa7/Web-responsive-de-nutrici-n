<?php
include 'conectar.php';

$id = $_REQUEST['id'];
$name = $_REQUEST['name'];
$email = $_REQUEST['email'];
$phone = $_REQUEST['phone'];
$message = $_REQUEST['message'];

$query = "UPDATE usuarios SET name = ?, email = ?, phone = ?, message = ? WHERE id = ?";

try {
  $stmt = $db->prepare($query);

  if (!$stmt) {
    throw new Exception("Error preparando la consulta: " . $db->errorInfo()[2]);
  }

  if (!$stmt->execute([$name, $email, $phone, $message, $id])) {
    throw new Exception("Error ejecutando la consulta: " . $stmt->errorInfo()[2]);
  }
} catch (Exception $e) {
  http_response_code(500);
  echo $e->getMessage();
  exit();
}
?>