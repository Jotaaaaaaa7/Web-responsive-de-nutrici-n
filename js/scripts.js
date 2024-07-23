/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});










//* A partir de aquí es lo que yo he añadido.

//? Aquí usaremos jquery para animar los elementos de la sección de servicios
$(document).ready(function () {
    // Aquí usaremos jquery para animar los elementos de la sección de servicios
    $('.col-lg-3.col-md-6.text-center > div').css({
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        backgroundColor: '#ffffff'
    }).hover(
        function () {
            // Cuando el ratón entra en la sección
            $(this).css({
                transform: 'scale(1.1)',
            });
        },
        function () {
            // Cuando el ratón sale de la sección
            $(this).css({
                transform: 'scale(1)',
            });
        }
    );
});










// ? Aquí usaremos jquery para ajustar algunos estilos de la página

$(document).ready(function () {
    $('.text-white-75').css('font-size', '20px');
    $('#introMacros').css('font-size', '18px');
    $('#column1').css('margin-right', '50px');
    $('#column3').css('margin-left', '50px');
    $('.list-unstyled').css('font-size', '18px');
    $('#introCalculadora').css('font-size', '18px');
    $('#results').css('display', 'none');
    $('#Ejemplos').css('font-size', '18');
    $('.project-category.text-white-70').css('font-size', '20px');
    $('#services-anchor').css('position', 'relative').css('top', '-100px');
    $('.text-muted.mb-5').css('font-size', '18px')
    $('#message').css('height', '10rem');

});




// ? Aquí usaremos jquery para animar la presentación de los resultados
$(document).ready(function () {
    // Define la animación
    function animateResults() {
        $('#results')
            .stop(true, true)  // Detiene las animaciones actuales y vacía la cola de efectos
            .css({ opacity: 0, fontSize: '1em', left: '0px' })  // Restablece las propiedades CSS a sus valores iniciales
            .animate({ opacity: 1, fontSize: '1.8em' }, 2000)
            .delay(300)
            .animate({ left: '0px', fontSize: '1.2em' }, 1000);
    }

    // Crea un nuevo observador de mutaciones
    var observer = new MutationObserver(animateResults);

    // Comienza a observar el elemento con el id 'results' para cambios en el nodo hijo
    observer.observe(document.querySelector('#results'), { childList: true });
});





// ? Jquery para añadir un pequeño efecto al accordion
$(document).ready(function () {
    $('.accordion-button').hover(
        function () {
            // Cuando el ratón entra en el botón
            $(this).css('background-color', '#e8e8e8');
        },
        function () {
            // Cuando el ratón sale del botón
            // Comprueba si el botón está colapsado
            if ($(this).hasClass('collapsed')) {
                $(this).css('background-color', ''); // Si está colapsado, vuelve al color original
            } else {
                $(this).css('background-color', '#f8f9fa'); // Si no está colapsado, mantiene el color de hover
            }
        }
    );

    // Cuando se hace clic en el botón
    $('.accordion-button').click(function () {
        // Espera a que se complete la animación de colapso
        setTimeout(function () {
            // Recorre todos los botones
            $('.accordion-button').each(function () {
                // Comprueba si el botón está colapsado
                if ($(this).hasClass('collapsed')) {
                    $(this).css('background-color', ''); // Si está colapsado, vuelve al color original
                } else {
                    $(this).css('background-color', '#f8f9fa'); // Si no está colapsado, mantiene el color de hover
                }
            });
        }, 200);
    });
});



$(document).ready(function () {
    var validator = $("#contactForm").validate({
        onkeyup: function (element) {
            $(element).valid();
        },
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 50
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                digits: true,
                minlength: 9,
                maxlength: 15
            },
            message: {
                required: false,
                minlength: 0
            }
        },
        messages: {
            name: {
                required: "Por favor, introduce tu nombre",
                minlength: "Tu nombre debe tener al menos 2 caracteres",
                maxlength: "Tu nombre no debe exceder los 50 caracteres"
            },
            email: {
                required: "Por favor, introduce tu correo electrónico",
                email: "Por favor, introduce un correo electrónico válido"
            },
            phone: {
                required: "Por favor, introduce tu número de teléfono",
                digits: "Por favor, introduce solo números",
                minlength: "Tu número de teléfono debe tener al menos 9 dígitos",
                maxlength: "Tu número de teléfono no debe exceder los 15 dígitos"
            },
            message: {
                required: "Por favor, introduce tu mensaje",
                minlength: "Tu mensaje debe tener al menos 5 caracteres"
            }
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
            error.wrap("<p></p>");
            error.css("color", "red");
        }
    });
});



//* Jquery para ajustar el tamaño de la fuente en la sección de recetas
$(document).ready(function () {
    $(window).resize(function () {
        var width = $(window).width();

        if (width < 360) {
            $('.portfolio-box .recipe-text').css({
                'font-size': '0.7em',
                'padding': '5px'
            });
            $('.recipe-text h4').css('font-size', '0.7em');
        }

        else if (width >= 360 && width < 576) {
            $('.portfolio-box .recipe-text').css({
                'font-size': '1em',
                'padding': '5px'
            });
            $('.recipe-text h4').css('font-size', '1em');
        }
        else if (width >= 576 && width < 660) {
            $('.portfolio-box .recipe-text').css({
                'font-size': '0.75em',
                'padding': '3px'
            });
            $('.recipe-text h4').css('font-size', '0.75em');
        }
        else if (width >= 660 && width < 1172) {
            $('.portfolio-box .recipe-text').css({
                'font-size': '0.9em',
                'padding': '5px'
            });
            $('.recipe-text h4').css('font-size', '0.9em');
        }

        else if (width >= 1172 && width < 1350) {
            $('.portfolio-box .recipe-text').css({
                'font-size': '1.1em',
                'padding': '5px'
            });
            $('.recipe-text h4').css('font-size', '1.1em');
        }

        else if (width >= 1350 && width < 1550) {
            $('.portfolio-box .recipe-text').css({
                'font-size': '1.3em',
                'padding': '15px'
            });
            $('.recipe-text h4').css('font-size', '1.3em');
        }

        else {
            $('.portfolio-box .recipe-text').css({
                'font-size': '1.5em',
                'padding': '20px'
            });
            $('.recipe-text h4').css('font-size', '1.5em');
        }
    }).resize();
});
