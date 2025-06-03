document.addEventListener('DOMContentLoaded', () => {
  const camposValidar = ['tratamientos', 'medicamentos', 'padecimientos', 'alergias', 'antecedentes'];

  // Expresión regular: permite letras, números y espacios
  const regexAlfanumerico = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;

  document.getElementById('submitGuardar').addEventListener('click', (e) => {
    for (let id of camposValidar) {
      const input = document.getElementById(id);
      const valor = input.value.trim();
    }
  });

  // Impedir ingreso de símbolos mientras se escribe
  camposValidar.forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, '');
    });
  });
});
