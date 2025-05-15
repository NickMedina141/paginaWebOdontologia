function edades (cumple) {
    let nacimineto = new Date(cumple);
    let hoy = new Date();
    let edad = hoy.getFullYear() - nacimineto.getFullYear();
    let mes = hoy.getMonth() - nacimineto.getMonth();
    let dia = hoy.getDate() - nacimineto.getDate();
    //calcular la edad
    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }
   return edad;
}
