document.addEventListener('DOMContentLoaded', () => {
  const cedulaInput = document.getElementById('documento');
  const editCedulaInput = document.getElementById('editCedula');
  const telefonoInput = document.getElementById('editTelefono');

  const camposTexto = [
    { id: 'editNombre', nombre: 'Nombre' },
    { id: 'editApellidos', nombre: 'Apellidos' },
    { id: 'editSexo', nombre: 'Sexo' },
    { id: 'editRol', nombre: 'Rol' }
  ];

  const cedulaRegex = /^\d{10}$/;
  const textoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  // Validación de cédula para búsqueda
  document.getElementById('searchForm').addEventListener('submit', (e) => {
    const cedula = cedulaInput.value.trim();
    if (!cedulaRegex.test(cedula)) {
      e.preventDefault();
      // mostrarError('La cédula debe contener exactamente 10 dígitos numéricos.');
    }
  });

  // Validaciones al confirmar edición
  const confirmarBtn = document.getElementById('confirmButton');
  if (confirmarBtn) {
    confirmarBtn.addEventListener('click', (e) => {
      const cedula = editCedulaInput.value.trim();
      const telefono = telefonoInput.value.trim();

      if (!cedulaRegex.test(cedula)) {
        e.preventDefault();
        mostrarError('La cédula debe contener exactamente 10 dígitos numéricos.');
        return;
      }

      if (!cedulaRegex.test(telefono)) {
        e.preventDefault();
        mostrarError('El teléfono debe contener exactamente 10 dígitos numéricos.');
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

  // Impedir entrada de letras en campos numéricos
  [cedulaInput, editCedulaInput, telefonoInput].forEach(input => {
    input.setAttribute('maxlength', '10');
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(0, 10);
    });
  });

  // Impedir caracteres no permitidos en campos de texto
  camposTexto.forEach(campo => {
    const input = document.getElementById(campo.id);
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });
  });
});
