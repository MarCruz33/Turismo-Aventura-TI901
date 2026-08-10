// Esperamos a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {

    // Elementos del DOM
    const btnBuscar = document.getElementById('buscarVuelos');
    const origenInput = document.getElementById('origen');
    const destinoInput = document.getElementById('destino');
    const fechaInput = document.getElementById('fecha');
    const resultadosDiv = document.getElementById('resultados');

    // Datos simulados de vuelos (podrían venir de una API)
    const vuelosDisponibles = [
        { id: 1, origen: 'Bogotá', destino: 'Medellín', fecha: '2026-08-15', precio: 120 },
        { id: 2, origen: 'Bogotá', destino: 'Cartagena', fecha: '2026-08-20', precio: 250 },
        { id: 3, origen: 'Medellín', destino: 'Bogotá', fecha: '2026-08-18', precio: 130 },
        { id: 4, origen: 'Cali', destino: 'Bogotá', fecha: '2026-08-22', precio: 110 },
        { id: 5, origen: 'Bogotá', destino: 'Santa Marta', fecha: '2026-08-25', precio: 210 },
        { id: 6, origen: 'Medellín', destino: 'Cali', fecha: '2026-08-28', precio: 95 },
        { id: 7, origen: 'Bogotá', destino: 'Medellín', fecha: '2026-09-01', precio: 115 },
    ];

    // Función para mostrar vuelos
    function mostrarVuelos(vuelos) {
        if (!vuelos || vuelos.length === 0) {
            resultadosDiv.innerHTML = `<p class="sin-resultados">✖ No se encontraron vuelos con esos criterios.</p>`;
            return;
        }

        let html = '';
        vuelos.forEach(vuelo => {
            html += `
                <div class="tarjeta-vuelo">
                    <h3>${vuelo.origen} → ${vuelo.destino}</h3>
                    <p>📅 ${vuelo.fecha}</p>
                    <p class="precio">💰 $${vuelo.precio} USD</p>
                </div>
            `;
        });
        resultadosDiv.innerHTML = html;
    }

    // Función para filtrar vuelos según los criterios
    function filtrarVuelos() {
        const origen = origenInput.value.trim().toLowerCase();
        const destino = destinoInput.value.trim().toLowerCase();
        const fecha = fechaInput.value;

        const filtrados = vuelosDisponibles.filter(vuelo => {
            let coincide = true;

            if (origen && !vuelo.origen.toLowerCase().includes(origen)) {
                coincide = false;
            }
            if (destino && !vuelo.destino.toLowerCase().includes(destino)) {
                coincide = false;
            }
            if (fecha && vuelo.fecha !== fecha) {
                coincide = false;
            }
            return coincide;
        });

        mostrarVuelos(filtrados);
    }

    // Evento click del botón
    btnBuscar.addEventListener('click', filtrarVuelos);

    // Opcional: presionar Enter en cualquier input también busca
    const inputs = [origenInput, destinoInput, fechaInput];
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                filtrarVuelos();
            }
        });
    });

    // Al cargar la página, mostramos todos los vuelos
    mostrarVuelos(vuelosDisponibles);
});