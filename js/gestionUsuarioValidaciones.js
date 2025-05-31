document.addEventListener('DOMContentLoaded', () => {
  const cedulaInput = document.getElementById('documento');
  const editCedulaInput = document.getElementById('editCedula');

  const camposTexto = [
    { id: 'editNombre', nombre: 'Nombre' },
    { id: 'editApellidos', nombre: 'Apellidos' },
    { id: 'editSexo', nombre: 'Sexo' },
    { id: 'editRol', nombre: 'Rol' }
  ];

  const cedulaRegex = /^\d{10}$/;
  const textoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  function mostrarError(mensaje) {
    const noti = document.getElementById('notification');
    noti.innerText = mensaje;
    noti.classList.add('show');

    setTimeout(() => {
      noti.classList.remove('show');
    }, 3000);
  }

  // Validación de cédula de búsqueda
  document.getElementById('searchForm').addEventListener('submit', (e) => {
    const cedula = cedulaInput.value.trim();
    if (!cedulaRegex.test(cedula)) {
      e.preventDefault();
      mostrarError('La cédula debe contener exactamente 10 dígitos numéricos.');
    }
  });

  // Validaciones al confirmar edición
  const confirmarBtn = document.getElementById('confirmButton');
  if (confirmarBtn) {
    confirmarBtn.addEventListener('click', (e) => {
      const cedula = editCedulaInput.value.trim();
      if (!cedulaRegex.test(cedula)) {
        e.preventDefault();
        mostrarError('La cédula debe contener exactamente 10 dígitos numéricos.');
        return;
      }

      for (let campo of camposTexto) {
        const valor = document.getElementById(campo.id).value.trim();
        if (!textoRegex.test(valor)) {
          e.preventDefault();
          mostrarError(`El campo "${campo.nombre}" solo debe contener letras.`);
          return;
        }
      }
    });
  }
});
