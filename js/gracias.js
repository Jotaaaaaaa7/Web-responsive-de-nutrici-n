//* Mostrar los resultados del formulario de contacto y lanzar confeti
$(document).ready(function () {
    var formResults = JSON.parse(document.getElementById('results').dataset.formResults);
    var resultsDiv = $('#results');

    resultsDiv.append('<h2 style="opacity: 0;">Estos son los resultados del formulario de contacto:</h2>');
    resultsDiv.append('<ul class="list-group" style="opacity: 0;"></ul>');

    var resultsList = resultsDiv.find('.list-group');
    resultsList.append('<li class="list-group-item" style="opacity: 0;"><strong>Nombre:</strong> ' + formResults.name + '</li>');
    resultsList.append('<li class="list-group-item" style="opacity: 0;"><strong>Email:</strong> ' + formResults.email + '</li>');
    resultsList.append('<li class="list-group-item" style="opacity: 0;"><strong>Telefono:</strong> ' + formResults.phone + '</li>');
    resultsList.append('<li class="list-group-item" style="opacity: 0;"><strong>Mensaje:</strong> ' + formResults.message + '</li>');

    // Muestra los resultados uno a uno con una animación
    resultsDiv.children().each(function (i) {
        $(this).delay(1000 * i).animate({ opacity: 1 }, 1000);
    });

    resultsList.children().each(function (i) {
        $(this).delay(1000 * (i + 1)).animate({ opacity: 1 }, 1000);
    });
});

// ? Lanzar confeti al enviar el formulario y mostrar los resultados
function launchConfetti() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);

        confetti({
            particleCount: particleCount,
            startVelocity: 15, 
            angle: randomInRange(250, 300),
            spread: randomInRange(50, 70),
            origin: { x: 0.25, y: 0 }
        });
        confetti({
            particleCount: particleCount,
            startVelocity: 15, 
            angle: randomInRange(250, 300),
            spread: randomInRange(50, 70),
            origin: { x: 0.75, y: 0 }
        });
    }, 250);
}



//* Crear usuario, con validación para los campos
$("#create-button").click(function () {
    var name = $("#new-name").val();
    var email = $("#new-email").val();
    var phone = $("#new-phone").val();
    var message = $("#new-message").val();

    if (name === "" || email === "" || phone === "") {
        alert("Los campos de nombre, correo electrónico y teléfono no pueden estar vacíos.");
        return;
    }
    else if (name.length > 50 || name.length < 2) {
        alert("El nombre debe tener entre 2 y 50 carácteres.");
        return;
    }
    else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        alert("Por favor ingrese un correo electrónico válido.");
        return;
    }
    else if (phone.length < 9 || phone.length > 15 || isNaN(phone)) {
    alert("El número de teléfono debe tener entre 9 y 15 dígitos y solo contener números.");
    return;
}
    else if (message.length > 300) {
        alert("El mensaje no puede exceder los 500 caracteres.");
        return;
    }

    $.ajax({
        url: 'createUser.php',
        type: 'post',
        data: {
            name: name,
            email: email,
            phone: phone,
            message: message
        },
        success: function () {
            // Recargar la página para mostrar el nuevo usuario
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});



//* Editar usuario, con validación para los campos
$(document).ready(function () {
    $('.btn-success').click(function () {
        var $this = $(this);
        var $tr = $this.closest('tr');
        var id = $tr.attr('id').split('-')[1];

        if ($this.hasClass('edit-mode')) {
            var data = { id: id }; // Incluye el id en los datos que envías
            $tr.find('input').each(function () {
                var $input = $(this);
                var text = $input.val();
                var key = $input.parent().attr('class').split(' ')[1];
                data[key] = text;
            });

            // Validaciones
            if (data.name === "" || data.email === "" || data.phone === "") {
                alert("Los campos de nombre, correo electrónico y teléfono no pueden estar vacíos.");
                return;
            }
            else if (data.name.length > 50 || data.name.length < 2) {
                alert("El nombre debe tener entre 2 y 50 caracteres.");
                return;
            }
            else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
                alert("Por favor ingrese un correo electrónico válido.");
                return;
            }
            else if (data.phone.length < 9 || data.phone.length > 15 || isNaN(data.phone)) {
                alert("El número de teléfono debe tener entre 9 y 15 dígitos y solo contener números.");
                return;
            }
            else if (data.message.length > 300) {
                alert("El mensaje no puede exceder los 300 caracteres.");
                return;
            }

            $.ajax({
                url: 'updateUser.php',
                method: 'POST',
                data: data,
                success: function (response) {
                    alert('Usuario actualizado con éxito');
                    endEditMode($this, $tr);
                },
                error: function () {
                    alert('Hubo un error al actualizar el usuario');
                    endEditMode($this, $tr);
                }
            });
        } else {
            $this.text('Guardar');
            $this.addClass('edit-mode btn-warning').removeClass('btn-success');

            $tr.find('td.data').each(function () {
                var $td = $(this);
                var text = $td.text();
                $td.empty().append($('<input>', {
                    type: 'text',
                    value: text,
                    class: 'editable input-edit'
                }));
            });
        }
    });
});

function endEditMode($button, $row) {
    $button.text('Editar');
    $button.removeClass('edit-mode btn-warning').addClass('btn-success');
    $row.find('input').each(function () {
        var $input = $(this);
        var text = $input.val();
        $input.parent().empty().text(text);
    });
}



