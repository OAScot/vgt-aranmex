// Importamos el cliente de Supabase desde un servidor de módulos gratuito
import { createClient } from 'https://esm.sh/@supabase/supabase-client'

// 1. CONFIGURACIÓN (Copia tus llaves desde Supabase: Settings -> API)
const SUPABASE_URL = 'TU_URL_AQUÍ'
const SUPABASE_ANON_KEY = 'TU_ANON_KEY_AQUÍ'

const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// 2. REFERENCIAS A ELEMENTOS DEL DOM
const requisitionForm = document.getElementById('requisition-form')
const requestsContainer = document.getElementById('requests-container')

// 3. FUNCIÓN PARA ENVIAR DATOS
requisitionForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Capturamos los datos del formulario
    const item = document.getElementById('item-name').value
    const categoria = document.getElementById('category').value
    const prioridad = document.getElementById('priority').value
    const justificacion = document.getElementById('justification').value

    // Insertamos en la base de datos
    const { data, error } = await _supabase
        .from('requisiciones')
        .insert([
            { 
                item: item, 
                categoria: categoria, 
                prioridad: prioridad, 
                justificacion: justificacion 
                // 'estado' y 'area' se ponen solos por el valor por defecto
            }
        ])

    if (error) {
        alert('Error al enviar la requisición: ' + error.message)
    } else {
        alert('Requisición enviada con éxito a Compras')
        requisitionForm.reset() // Limpiamos el formulario
        fetchRequests() // Actualizamos la lista automáticamente
    }
})

// 4. FUNCIÓN PARA LEER DATOS (Seguimiento)
async function fetchRequests() {
    const { data, error } = await _supabase
        .from('requisiciones')
        .select('*')
        .order('id', { ascending: false }) // Los más nuevos arriba

    if (error) {
        console.error('Error al cargar datos:', error)
        return
    }

    // Limpiamos el contenedor y dibujamos las tarjetas
    requestsContainer.innerHTML = ''
    data.forEach(req => {
        const card = document.createElement('div')
        card.className = 'product-card'
        
        // Asignamos clase de color según el estado
        let statusClass = 'status-low-priority'
        if(req.estado === 'PENDIENTE') statusClass = 'status-required'
        if(req.estado === 'RECIBIDO') statusClass = 'status-stock'

        card.innerHTML = `
            <div class="status-badge ${statusClass}">${req.estado}</div>
            <span class="category">${req.categoria}</span>
            <h2 class="product-name">${req.item}</h2>
            <p class="description">${req.justificacion}</p>
            <div class="usage-area"><strong>Folio:</strong> #${req.id}</div>
        `
        requestsContainer.appendChild(card)
    })
}

// Cargar los pedidos al abrir la página
fetchRequests()