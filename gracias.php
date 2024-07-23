<?php session_start();
try {
?>
<!DOCTYPE html>
<html>

<head>
    <title>Gracias</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.3.2"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/gracias.css">
</head>

<body onload="launchConfetti()">
<br><br>
    <h1>Gracias por contactar con nosotros!</h1><br>
    <div id="results" data-form-results='<?php echo json_encode($_SESSION['formResults']); ?>'></div>
    <?php
    try {
        $users = json_decode(include 'getAllUsers.php', true);
    } catch (Exception $e) {
        echo 'Error al obtener usuarios: ',  $e->getMessage(), "\n";
    }
    ?>
    <br><br>

    <h2>Usuarios registrados en la base de datos:</h2>
    <div class="table-responsive">
        <table class="table responsive">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Mensaje</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" name="name" id="new-name" class="form-control" /></td>
                    <td><input type="text" name="email" id="new-email" class="form-control" /></td>
                    <td><input type="text" name="phone" id="new-phone" class="form-control" /></td>
                    <td><input type="text" name="message" id="new-message" class="form-control" /></td>
                    <td>
                        <button class="btn btn-primary" id="create-button">Crear</button>
                    </td>
                </tr>

                <?php foreach ($users as $user): ?>
                    <tr id="user-<?php echo $user['id']; ?>">
                        <td class="data name" contenteditable="false"><?php echo $user['name']; ?></td>
                        <td class="data email" contenteditable="false"><?php echo $user['email']; ?></td>
                        <td class="data phone" contenteditable="false"><?php echo $user['phone']; ?></td>
                        <td class="data message" contenteditable="false"><?php echo $user['message']; ?></td>
                        <td>
                            <button class="btn btn-danger" onclick="window.location.href='deleteUser.php?id=<?php echo $user['id']; ?>'">Eliminar</button>
                        </td>
                        <td>
                            <button class="btn btn-success">Editar</button>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <br><br>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="./js/gracias.js"></script>
</body>

</html>
<?php 
} catch (Exception $e) {
    echo 'Error: ',  $e->getMessage(), "\n";
}
?>