// Define una variable para almacenar los productos en el carrito.
const carrito = [];

// Función para agregar un producto al carrito.
function agregarAlCarrito(productoId, nombre, precio) {
  const producto = {
    id: productoId,
    nombre: nombre,
    precio: precio,
    cantidad: 1, // Puedes ajustar esto según tus necesidades.
  };

  // Verifica si el producto ya está en el carrito.
  const productoExistente = carrito.find((item) => item.id === productoId);

  if (productoExistente) {
    // Si el producto ya está en el carrito, aumenta la cantidad.
    productoExistente.cantidad++;
  } else {
    // Si no, agrega el producto al carrito.
    carrito.push(producto);
  }

  // Actualiza el carrito en la interfaz.
  actualizarCarrito();
  // Guarda el carrito en el almacenamiento local.
  guardarCarritoEnStorage();
}

// Función para actualizar el contenido del carrito en la interfaz.
function actualizarCarrito() {
  const carritoContainer = document.getElementById('carrito-container');

  // Limpia el contenido previo del carrito.
  carritoContainer.innerHTML = '';

  // Recorre los productos en el carrito y crea elementos para mostrarlos.
  carrito.forEach((producto) => {
    const productoElement = document.createElement('div');
    productoElement.innerHTML = `
      <p>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio * producto.cantidad}</p>
      <button class="eliminar-producto-button" data-producto-id="${producto.id}">Eliminar</button>
    `;
    carritoContainer.appendChild(productoElement);
  });

  // Calcula y muestra el total del carrito.
  calcularTotal();
}

// Función para calcular y mostrar el total del carrito.
function calcularTotal() {
  const totalContainer = document.getElementById('total-amount');

  // Calcula la suma de los precios de los productos en el carrito.
  const total = carrito.reduce((acumulador, producto) => {
    return acumulador + producto.precio * producto.cantidad;
  }, 0);

  // Actualiza el elemento HTML del total.
  totalContainer.textContent = total;
}

// Función para guardar el carrito en el almacenamiento local.
function guardarCarritoEnStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para recuperar el carrito desde el almacenamiento local.
function recuperarCarritoDesdeStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }
}

// Agrega eventos de clic a los botones "Agregar al carrito".
const botonesAgregarAlCarrito = document.querySelectorAll('.agregar-al-carrito-button');

botonesAgregarAlCarrito.forEach((boton) => {
  boton.addEventListener('click', (event) => {
    const productoId = event.target.getAttribute('data-producto-id');
    const nombre = event.target.previousElementSibling.previousElementSibling.textContent;
    const precio = parseInt(event.target.previousElementSibling.textContent.slice(1));

    agregarAlCarrito(productoId, nombre, precio);
  });
});

// Agrega eventos de clic a los botones "Eliminar" en el carrito.
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('eliminar-producto-button')) {
    const productoId = event.target.getAttribute('data-producto-id');
    eliminarProductoDelCarrito(productoId);
  }
});

// Función para eliminar un producto del carrito.
function eliminarProductoDelCarrito(productoId) {
  const productoIndex = carrito.findIndex((producto) => producto.id === productoId);
  if (productoIndex !== -1) {
    if (carrito[productoIndex].cantidad > 1) {
      carrito[productoIndex].cantidad--;
    } else {
      carrito.splice(productoIndex, 1);
    }
    actualizarCarrito();
    guardarCarritoEnStorage();
  }
}

// Llama a la función para recuperar el carrito desde el almacenamiento local al cargar la página.
window.addEventListener('load', () => {
  recuperarCarritoDesdeStorage();
});
