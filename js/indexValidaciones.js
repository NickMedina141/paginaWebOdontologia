document.addEventListener('DOMContentLoaded', () => {
    validarFormularioLogin();
    validarFormularioRegistro();
    validarFormularioRecuperar();
});


function validarFormularioRegistro() {
  const form = document.getElementById('formRegistro');

  form.addEventListener('submit', function (e) {
    let errores = [];

    const nombre = form.nombre.value.trim();
    const apellidos = form.apellidos.value.trim();
    const cedula = form.cedula.value.trim();
    const email = form.email.value.trim();
    const sexo = form.sexo.value;
    const telefono = form.telefono.value.trim();
    const fecha = form.date.value;
    const password = form.password.value.trim();

    // Nombre y Apellidos: solo letras y espacios
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
      errores.push('Nombre inválido. Solo letras y espacios.');
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellidos)) {
      errores.push('Apellidos inválidos. Solo letras y espacios.');
    }

    // Cedula y teléfono: exactamente 10 dígitos
    if (!/^\d{10}$/.test(cedula)) {
      errores.push('Cédula debe tener exactamente 10 dígitos.');
    }
    if (!/^\d{10}$/.test(telefono)) {
      errores.push('Teléfono debe tener exactamente 10 dígitos.');
    }

    // Email básico
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errores.push('Correo electrónico inválido.');
    }

    // Sexo obligatorio
    if (!sexo) {
      errores.push('Seleccione su sexo.');
    }

    // Fecha válida
    if (!fecha) {
      errores.push('Debe ingresar su fecha de nacimiento.');
    }

    // Contraseña: mínimo 6 caracteres (puedes ajustar esto)
    if (password.length < 6) {
      errores.push('Contraseña debe tener al menos 6 caracteres.');
    }

    // Mostrar errores si hay
    if (errores.length > 0) {
      e.preventDefault(); // Detener el envío
      alert(errores.join('\n')); // Puedes usar un modal más bonito si quieres
    }
  });
}

function validarFormularioLogin() {
  const form = document.getElementById('formLogin');

  form.addEventListener('submit', function (e) {
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      e.preventDefault();
      alert('Por favor, complete todos los campos.');
    }
  });
}

function validarFormularioRecuperar() {
  const form = document.getElementById('formRecuperar');

  form.addEventListener('submit', function (e) {
    const email = form.email.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.preventDefault();
      alert('Ingrese un correo electrónico válido.');
    }
  });
}
