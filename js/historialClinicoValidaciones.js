document.addEventListener("DOMContentLoaded", () => {
  const campos = [
    'tratamientos',
    'medicamentos',
    'padecimientos',
    'alergias',
    'antecedentes'
  ];

  campos.forEach((id) => {
    const input = document.getElementById(id);

    input.addEventListener('input', () => {
      // Elimina todo lo que no sea letra, número o espacio
      input.value = input.value.replace(/[^a-zA-Z0-9\s]/g, '').slice(0, 100);
    });

    input.addEventListener('keydown', (e) => {
      const teclasPermitidas = [
        'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete', 'Shift', 'Control', 'CapsLock'
      ];
      const valor = input.value;

      // Si ya tiene 100 caracteres, bloquear más escritura excepto teclas de control
      if (valor.length >= 100 && !teclasPermitidas.includes(e.key)) {
        e.preventDefault();
      }
    });
  });
});
