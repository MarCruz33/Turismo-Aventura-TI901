// ===== ESPERAR A QUE EL DOM ESTÉ LISTO =====
document.addEventListener('DOMContentLoaded', () => {

    // ===== REFERENCIAS A ELEMENTOS DEL DOM =====
    const btnBuscar = document.getElementById('buscarVuelos');
    const origenInput = document.getElementById('origen');
    const destinoInput = document.getElementById('destino');
    const fechaInput = document.getElementById('fecha');
    const resultadosDiv = document.getElementById('resultados');

    // ===== DATOS SIMULADOS DE VUELOS =====
    const vuelosDisponibles = [
        { 
            id: 1, 
            origen: 'Bogotá', 
            destino: 'Medellín', 
            fecha: '2026-08-15', 
            precio: 120,
            aerolinea: 'Avianca'
        },
        { 
            id: 2, 
            origen: 'Bogotá', 
            destino: 'Cartagena', 
            fecha: '2026-08-20', 
            precio: 250,
            aerolinea: 'LATAM'
        },
        { 
            id: 3, 
            origen: 'Medellín', 
            destino: 'Bogotá', 
            fecha: '2026-08-18', 
            precio: 130,
            aerolinea: 'Avianca'
        },
        { 
            id: 4, 
            origen: 'Cali', 
            destino: 'Bogotá', 
            fecha: '2026-08-22', 
            precio: 110,
            aerolinea: 'Viva Air'
        },
        { 
            id: 5, 
            origen: 'Bogotá', 
            destino: 'Santa Marta', 
            fecha: '2026-08-25', 
            precio: 210,
            aerolinea: 'LATAM'
        },
        { 
            id: 6, 
            origen: 'Medellín', 
            destino: 'Cali', 
            fecha: '2026-08-28', 
            precio: 95,
            aerolinea: 'Avianca'
        },
        { 
            id: 7, 
            origen: 'Bogotá', 
            destino: 'Medellín', 
            fecha: '2026-09-01', 
            precio: 115,
            aerolinea: 'Viva Air'
        },
        { 
            id: 8, 
            origen: 'Bogotá', 
            destino: 'Barranquilla', 
            fecha: '2026-09-05', 
            precio: 180,
            aerolinea: 'LATAM'
        },
        { 
            id: 9, 
            origen: 'Cali', 
            destino: 'Medellín', 
            fecha: '2026-09-10', 
            precio: 100,
            aerolinea: 'Avianca'
        },
        { 
            id: 10, 
            origen: 'Bogotá', 
            destino: 'Cali', 
            fecha: '2026-09-12', 
            precio: 140,
            aerolinea: 'Viva Air'
        }
    ];

    // ===== FUNCIÓN PARA MOSTRAR VUELOS =====
    function mostrarVuelos(vuelos) {
        // Limpiar resultados anteriores
        resultadosDiv.innerHTML = '';

        // Verificar si hay vuelos para mostrar
        if (!vuelos || vuelos.length === 0) {
            resultadosDiv.innerHTML = `
                <div class="sin-resultados">
                    <span class="icono">🔍</span>
                    No se encontraron vuelos con esos criterios.<br />
                    <small>Intenta con otros filtros de búsqueda</small>
                </div>
            `;
            return;
        }

        // Generar HTML para cada vuelo
        let html = '';
        vuelos.forEach(vuelo => {
            // Formatear fecha para mejor visualización
            const fechaObj = new Date(vuelo.fecha + 'T00:00:00');
            const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            html += `
                <div class="tarjeta-vuelo">
                    <h3>✈️ ${vuelo.origen} → ${vuelo.destino}</h3>
                    <p>🏢 <strong>Aerolínea:</strong> ${vuelo.aerolinea}</p>
                    <p>📅 <strong>Fecha:</strong> ${fechaFormateada}</p>
                    <p class="precio">💰 $${vuelo.precio} USD</p>
                </div>
            `;
        });

        resultadosDiv.innerHTML = html;
    }

    // ===== FUNCIÓN PARA FILTRAR VUELOS =====
    function filtrarVuelos() {
        // Obtener valores de los inputs y limpiarlos
        const origen = origenInput.value.trim().toLowerCase();
        const destino = destinoInput.value.trim().toLowerCase();
        const fecha = fechaInput.value;

        // Filtrar vuelos según criterios
        const filtrados = vuelosDisponibles.filter(vuelo => {
            let coincide = true;

            // Filtro por origen (búsqueda parcial)
            if (origen && !vuelo.origen.toLowerCase().includes(origen)) {
                coincide = false;
            }

            // Filtro por destino (búsqueda parcial)
            if (destino && !vuelo.destino.toLowerCase().includes(destino)) {
                coincide = false;
            }

            // Filtro por fecha (coincidencia exacta)
            if (fecha && vuelo.fecha !== fecha) {
                coincide = false;
            }

            return coincide;
        });

        // Mostrar los vuelos filtrados
        mostrarVuelos(filtrados);
    }

    // ===== FUNCIÓN PARA LIMPIAR BÚSQUEDA =====
    function limpiarBusqueda() {
        origenInput.value = '';
        destinoInput.value = '';
        fechaInput.value = '';
        mostrarVuelos(vuelosDisponibles);
    }

    // ===== EVENTOS =====
    // Evento click del botón buscar
    btnBuscar.addEventListener('click', filtrarVuelos);

    // Evento Enter en los inputs
    const inputs = [origenInput, destinoInput, fechaInput];
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                filtrarVuelos();
            }
        });
    });

    // Evento para limpiar con Escape (opcional)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            limpiarBusqueda();
        }
    });

    // Evento para limpiar cuando se hace clic fuera (opcional)
    document.addEventListener('click', (e) => {
        // Si se hace clic fuera del formulario y no es un botón
        const busquedaDiv = document.querySelector('.busqueda');
        if (!busquedaDiv.contains(e.target) && e.target.tagName !== 'BUTTON') {
            // No hacemos nada automático para no interrumpir la experiencia
        }
    });

    // ===== INICIALIZAR: MOSTRAR TODOS LOS VUELOS AL CARGAR =====
    mostrarVuelos(vuelosDisponibles);

    // ===== CONSOLA PARA DEPURACIÓN (opcional) =====
    console.log('🛫 Sistema de Vuelos cargado correctamente');
    console.log(`📊 ${vuelosDisponibles.length} vuelos disponibles`);
});