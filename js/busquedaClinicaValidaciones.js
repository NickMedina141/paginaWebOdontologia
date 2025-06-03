const documento = document.getElementById('documento');

documento.addEventListener('input', () => {
  // Elimina cualquier carácter no numérico y limita a 10 dígitos
    documento.value = documento.value.replace(/[^0-9]/g, '').slice(0, 10);
});

documento.addEventListener('keydown', (e) => {
  const valor = documento.value;

  // Permitir teclas como borrar, tab, flechas, etc.
  const teclasPermitidas = [
    'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'
  ];

  if (valor.length >= 10 && !teclasPermitidas.includes(e.key)) {
    e.preventDefault(); // bloquea más entrada si ya hay 10 dígitos
  }
});