<?php
session_start();

  $name = $_REQUEST["name"];
  $email = $_REQUEST["email"];
  $phone = $_REQUEST["phone"];
  $message = $_REQUEST["message"];

  // * Enviar correo
  // * No he podido ya que la función mail está deprecada, y hacerlo de otra forma era mucho más largo.
  // $mensaje = "Este mensaje fue enviado por el equipo de NutriAi, a través de su página web.\r\n";
  // $mensaje .= "Su correo es: " . $email . ",\r\n";
  // $mensaje .= "Su teléfono es: " . $phone . ",\r\n";
  // $mensaje .= "Mensaje: " . $message . ",\r\n";
  // $mensaje .= "Enviado el: " . date("d/m/Y", time());
  // $asunto = "Mensaje de NutriAi, proyecto de TEWC";
  // mail($email, $asunto, utf8_decode($mensaje));


// Almacenar los datos del formulario en $_SESSION
$_SESSION['formResults'] = [
  'name' => $name,
  'email' => $email,
  'phone' => $phone,
  'message' => $message,
];
print_r($_SESSION);

require_once("conectar.php");
$sql = "INSERT INTO usuarios (name, email, phone, message) VALUES (:name, :email, :phone, :message)";

try {
  // Preparar la declaración
  $stmt = $db->prepare($sql);

  // Vincular los parámetros
  $stmt->bindParam(':name', $name);
  $stmt->bindParam(':email', $email);
  $stmt->bindParam(':phone', $phone);
  $stmt->bindParam(':message', $message);

  // Ejecutar la declaración
  $stmt->execute();
} catch (Exception $e) {
  die('Error al insertar los datos: ' . $e->getMessage());
}

header("Location:gracias.php");
?>