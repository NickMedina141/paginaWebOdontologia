document.addEventListener('DOMContentLoaded', () => {
    const camposValidar = ['nombre', 'descripcion', 'nombreEdit', 'descripcionEdit'];

    const regexValido = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;

    function mostrarError(mensaje) {
        const toast = new bootstrap.Toast(document.getElementById('notificationToast'));
        document.getElementById('toastTitle').textContent = 'Error de validación';
        document.getElementById('toastMessage').textContent = mensaje;
        document.getElementById('toastHeader').classList.add('bg-danger', 'text-white');
        toast.show();
    }

    // Validación al enviar el formulario (modal)
    const formulario = document.querySelector('form');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            for (let id of ['nombre', 'descripcion']) {
                const input = document.getElementById(id);
                if (!regexValido.test(input.value.trim())) {
                    e.preventDefault();
                    mostrarError(`El campo "${id}" solo permite letras, números y espacios.`);
                    input.focus();
                    return;
                }
            }
        });
    }

    // Validación al hacer clic en el botón de actualizar
    const updateBtn = document.getElementById('updateServicioBtn');
    if (updateBtn) {
        updateBtn.addEventListener('click', (e) => {
            for (let id of ['nombreEdit', 'descripcionEdit']) {
                const input = document.getElementById(id);
                if (!regexValido.test(input.value.trim())) {
                    e.preventDefault();
                    mostrarError(`El campo "${id}" solo permite letras, números y espacios.`);
                    input.focus();
                    return;
                }
            }
            // Aquí puedes llamar a tu función de actualización si existe
        });
    }

    // Evita escribir símbolos al tipear
    camposValidar.forEach(id => {
        const input = document.getElementById(id);
        input?.addEventListener('input', () => {
            input.value = input.value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, '');
        });
    });
});
