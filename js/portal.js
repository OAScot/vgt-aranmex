// Diccionario de contraseñas y rutas
const accesos = {
    'vgt': { pin: '1111', url: 'vgt.html' },
    'tubos': { pin: '2222', url: 'tubos.html' },
    'inyectores': { pin: '3333', url: 'inyectores.html' },
    'compras': { pin: '9999', url: 'compras.html' },
    'almacen': { pin: '8888', url: 'almacen.html' }
};

window.verificarAcceso = function(area) {
    // 1. Preguntamos el PIN
    const intento = prompt(`Ingrese el PIN de acceso para el área de ${area.toUpperCase()}:`);
    
    // 2. Si el usuario cancela, no hacemos nada
    if (intento === null) return;

    // 3. Verificamos si es correcto
    if (intento === accesos[area].pin) {
        window.location.href = accesos[area].url;
    } else {
        alert("PIN INCORRECTO. Acceso denegado.");
    }
};
