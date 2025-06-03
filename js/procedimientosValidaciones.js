document.addEventListener("DOMContentLoaded", () => {
  const textareas = ['descripcion', 'editDescripcion'];

  textareas.forEach((id) => {
    const textarea = document.getElementById(id);

    if (textarea) {
      textarea.addEventListener('input', () => {
        // Eliminar caracteres que no sean letras, números o espacios
        textarea.value = textarea.value.replace(/[^a-zA-Z0-9\s]/g, '').slice(0, 300);
      });

      textarea.addEventListener('keydown', (e) => {
        const teclasPermitidas = [
          'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
          'Tab', 'Delete', 'Shift', 'Control', 'CapsLock', 'Enter'
        ];

        const valor = textarea.value;

        if (valor.length >= 300 && !teclasPermitidas.includes(e.key)) {
          e.preventDefault();
        }
      });
    }
  });
});
