// =============================================
// js/usuarios.js - 12 USUARIOS (10 + 2 simulados)
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Página de Usuarios cargada");
    
    const container = document.getElementById('usuariosContainer');
    const loading = document.getElementById('loading');
    
    async function fetchUsuarios() {
        try {
            console.log("🔄 Solicitando datos a la API...");
            
            const url = 'https://jsonplaceholder.typicode.com/users';
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const usuariosReales = await response.json();
            
            // 📌 Agregar 2 usuarios simulados
            const usuariosExtra = [
                {
                    id: 11,
                    name: "Carlos Hernández",
                    email: "carlos.hernandez@turismo.com",
                    address: { city: "Cancún" },
                    company: { name: "Turismo Aventura MX" },
                    phone: "998-123-4567",
                    website: "carlos.turismo.com"
                },
                {
                    id: 12,
                    name: "María Fernández",
                    email: "maria.fernandez@turismo.com",
                    address: { city: "Los Cabos" },
                    company: { name: "Viajes del Sol" },
                    phone: "624-789-0123",
                    website: "maria.viajes.com"
                }
            ];
            
            const usuarios = [...usuariosReales, ...usuariosExtra];
            
            console.log(`✅ ${usuarios.length} usuarios (${usuariosReales.length} reales + ${usuariosExtra.length} simulados)`);
            
            loading.style.display = 'none';
            mostrarUsuarios(usuarios);
            
        } catch (error) {
            console.error('❌ Error:', error);
            loading.textContent = `❌ Error: ${error.message}`;
            loading.className = 'error';
            loading.style.color = '#dc3545';
            loading.style.fontWeight = 'bold';
        }
    }
    
    function mostrarUsuarios(usuarios) {
        container.innerHTML = '';
        
        usuarios.forEach((user, index) => {
            const card = document.createElement('div');
            card.className = 'usuario-card';
            
            const colores = ['#2d6a9f', '#1a3c5e', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#fd7e14', '#20c997', '#e83e8c', '#6610f2', '#d63384'];
            const colorBorde = colores[index % colores.length];
            
            const esSimulado = index >= 10;
            const badge = esSimulado ? ' 🌟' : '';
            
            card.innerHTML = `
                <div class="usuario-avatar">
                    <span class="avatar-icon">👤</span>
                </div>
                <h3>${user.name}${badge}</h3>
                <div class="usuario-info">
                    <p><span class="label">📧 Correo:</span> ${user.email}</p>
                    <p><span class="label">📍 Ciudad:</span> ${user.address.city}</p>
                    <p><span class="label">🏢 Empresa:</span> ${user.company.name}</p>
                    <p><span class="label">📞 Teléfono:</span> ${user.phone || 'No disponible'}</p>
                </div>
                <div class="usuario-id">ID: ${user.id}</div>
            `;
            
            card.style.borderLeftColor = colorBorde;
            container.appendChild(card);
        });
        
        console.log(`✅ ${usuarios.length} usuarios mostrados en la interfaz`);
    }
    
    fetchUsuarios();
});