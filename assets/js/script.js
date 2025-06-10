// assets/js/script.js --- VERSIÓN FINAL Y REVISADA

let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// --- Lógica de UI de Autenticación (Sin cambios) ---
function updateNavActions() {
    const navActions = document.getElementById('nav-actions');
    const token = localStorage.getItem('token');
    navActions.innerHTML = ''; 

    if (token) {
        const btnLogout = document.createElement('button');
        btnLogout.id = 'btnLogout';
        btnLogout.textContent = 'Cerrar Sesión';
        btnLogout.onclick = handleLogout;
        navActions.appendChild(btnLogout);
    } else {
        const btnLogin = document.createElement('button');
        btnLogin.id = 'btnLogin';
        btnLogin.textContent = 'Iniciar Sesión';
        btnLogin.onclick = () => abrirModal('modalLogin');
        navActions.appendChild(btnLogin);

        const btnRegister = document.createElement('button');
        btnRegister.id = 'btnRegister';
        btnRegister.textContent = 'Registrarse';
        btnRegister.onclick = () => abrirModal('modalRegistro');
        navActions.appendChild(btnRegister);
    }
    
    const cartDiv = document.createElement('div');
    cartDiv.className = 'cart';
    cartDiv.style.cursor = 'pointer';
    cartDiv.innerHTML = `🛒 <span id="carritoCount">${carrito.length}</span>`;
    cartDiv.onclick = () => {
        if (localStorage.getItem('token')) {
            abrirModal('modalCheckout');
        } else {
            alert('Por favor, inicia sesión para ver tu carrito.');
            abrirModal('modalLogin');
        }
    };
    navActions.appendChild(cartDiv);
}

// --- Renderizado de Productos (VERSIÓN MEJORADA Y A PRUEBA DE ERRORES) ---
function renderizarProductos(lista = productos, filtroCat = 'Todas') {
    const grid = document.getElementById('productos');
    grid.innerHTML = '';
    const filtrados = (filtroCat === 'Todas') ? lista : lista.filter(p => p.categoria === filtroCat);
  
    filtrados.forEach(p => {
        // Creamos los elementos uno por uno
        const card = document.createElement('div');
        card.className = 'producto-card';

        const img = document.createElement('img');
        img.src = p.imagen; // Asignamos la URL directamente al atributo src
        img.alt = p.nombre;

        const h3 = document.createElement('h3');
        h3.textContent = p.nombre;

        const precio = document.createElement('p');
        precio.className = 'precio';
        precio.textContent = `$${p.precio.toLocaleString()}`;

        const button = document.createElement('button');
        button.textContent = 'Ver más';
        button.onclick = () => verProducto(p._id);

        // Los añadimos a la tarjeta
        card.appendChild(img);
        card.appendChild(h3);
        card.appendChild(precio);
        card.appendChild(button);

        // Finalmente, añadimos la tarjeta completa a la grilla
        grid.appendChild(card);
    });
}


// --- RESTO DEL CÓDIGO (Sin cambios, pero incluido para que copies y pegues todo) ---

function handleLogout() {
    localStorage.removeItem('token');
    carrito = [];
    guardarCarrito();
    actualizarResumen();
    updateNavActions(); 
    alert('Has cerrado sesión.');
}

window.onload = () => {
  fetchProductos();
  actualizarResumen();
  updateNavActions(); 
  document.getElementById('formLogin').onsubmit = handleLogin;
  document.getElementById('formRegistro').onsubmit = handleRegister;
  document.getElementById('formNewsletter').onsubmit = handleNewsletter;
  document.getElementById('formCheckout').onsubmit = handleCheckout;
};

async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = ''; 

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg || 'Error en el servidor');
        
        localStorage.setItem('token', data.token);
        cerrarModal('modalLogin');
        updateNavActions();
        alert('Inicio de sesión exitoso');
    } catch (error) {
        errorDiv.textContent = error.message;
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    const errorDiv = document.getElementById('registerError');
    errorDiv.textContent = '';

    if (password !== password2) {
        errorDiv.textContent = 'Las contraseñas no coinciden';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg || 'Error en el servidor');
        
        cerrarModal('modalRegistro');
        alert(data.msg);
        abrirModal('modalLogin');
    } catch (error) {
        errorDiv.textContent = error.message;
    }
}

async function fetchProductos() {
  try {
    const response = await fetch('http://localhost:3000/api/productos');
    if (!response.ok) throw new Error('No se pudo conectar con el servidor.');
    productos = await response.json();
    renderizarCategorias();
    renderizarProductos();
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    document.getElementById('productos').innerHTML = '<p>Error al cargar productos. Intenta más tarde.</p>';
  }
}

async function handleCheckout(e) {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }
  try {
    const carritoIds = carrito.map(p => ({ id: p._id }));
    const response = await fetch('http://localhost:3000/api/productos/pedido', {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ carrito: carritoIds }),
    });
    if (!response.ok) throw new Error('Hubo un problema al procesar el pedido.');
    
    alert('¡Pedido enviado con éxito!');
    carrito = [];
    actualizarResumen();
    guardarCarrito();
    cerrarModal('modalCheckout');
    fetchProductos();
  } catch (error) {
    console.error(error);
    alert('No se pudo completar el pedido. Inténtalo de nuevo.');
  }
}

function mostrarModalRegistro() {
    cerrarModal('modalLogin');
    abrirModal('modalRegistro');
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderizarCategorias() {
  const container = document.querySelector('.categoria-list');
  container.innerHTML = '';
  const categorias = ['Todas', ...new Set(productos.map(p => p.categoria))];
  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.innerText = cat;
    btn.onclick = () => {
      document.querySelectorAll('.categoria-list button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderizarProductos(productos, cat);
    };
    if (cat === 'Todas') btn.classList.add('active');
    container.appendChild(btn);
  });
}

function verProducto(id) {
  const p = productos.find(x => x._id === id);
  if (!p) return;
  document.getElementById('modalTitulo').innerText = p.nombre;
  document.getElementById('modalDescripcion').innerText = p.descripcion;
  document.getElementById('modalPrecio').innerText = `$${p.precio.toLocaleString()}`;
  document.getElementById('modalStock').innerText = p.stock;
  const btnAgregar = document.querySelector('#modalProducto button');
  btnAgregar.onclick = () => agregarAlCarrito(p._id);
  abrirModal('modalProducto');
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p._id === id);
  if (producto && producto.stock > 0) {
    carrito.push(producto);
    actualizarResumen();
    guardarCarrito();
    alert(`${producto.nombre} fue agregado al carrito.`);
    cerrarModal('modalProducto');
  } else {
    alert("Lo sentimos, este producto está fuera de stock.");
  }
}

function actualizarResumen() {
  const carritoCountSpan = document.getElementById('carritoCount');
  if(carritoCountSpan) {
    carritoCountSpan.innerText = carrito.length;
  }
  const lista = document.getElementById('listaCarrito');
  if (lista) {
    lista.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
      lista.innerHTML += `<p>${item.nombre} - $${item.precio.toLocaleString()}</p>`;
      total += item.precio;
    });
    document.getElementById('totalCarrito').innerText = `$${total.toLocaleString()}`;
  }
}

function anularCompra() {
    carrito = [];
    actualizarResumen();
    guardarCarrito();
    cerrarModal('modalCheckout');
    alert('Compra anulada.');
}

function handleNewsletter(e) {
  e.preventDefault();
  e.target.reset();
  alert('¡Gracias por suscribirte!');
}

function abrirModal(id) { document.getElementById(id).style.display = 'flex'; }
function cerrarModal(id) { document.getElementById(id).style.display = 'none'; }
function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }
function filtrarProductos() {
    const texto = document.getElementById('buscador').value.toLowerCase();
    document.querySelectorAll('.producto-card').forEach(card => {
        const nombre = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = nombre.includes(texto) ? 'flex' : 'none';
    });
}
function ordenarProductos() {
    const orden = document.getElementById('orden').value;
    let listaOrdenada = [...productos];
    if (orden === 'precio-asc') listaOrdenada.sort((a, b) => a.precio - b.precio);
    if (orden === 'precio-desc') listaOrdenada.sort((a, b) => b.precio - a.precio);
    if (orden === 'nombre-asc') listaOrdenada.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (orden === 'nombre-desc') listaOrdenada.sort((a, b) => b.nombre.localeCompare(a.nombre));
    const categoriaActiva = document.querySelector('.categoria-list button.active').innerText;
    renderizarProductos(listaOrdenada, categoriaActiva);
}