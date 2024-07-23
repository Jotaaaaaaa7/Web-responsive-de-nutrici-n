<?php

//* Para conectarse desde localhost

// $dbhost = 'localhost';
// $dbuser = 'root';
// $dbpass = 'mysql';
// $dbname = 'entrega_tewc';


//* Para conectarse desde el hosting

$dbhost = 'sql310.infinityfree.com';
$dbuser = 'if0_36410487';
$dbpass = 'dbdbtewc';
$dbname = 'if0_36410487_db_tewc';

try {
  $db = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass,
    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $error) {
  die("Error de conexión: " . $error->getMessage());
}