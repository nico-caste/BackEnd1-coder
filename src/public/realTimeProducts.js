document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  const productsContainer = document.getElementById('productsContainer');
  const addProductForm = document.getElementById('addProductForm');

  addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const stock = parseInt(document.getElementById('stock').value);
    
    const product = {
      title,
      description,
      price,
      stock,
      code: Math.random().toString(36).substring(2, 10),
      category: 'general',
      status: true
    };
    
    socket.emit('addProduct', product);
    addProductForm.reset();
  });

  productsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const productId = e.target.getAttribute('data-id');
      socket.emit('deleteProduct', productId);
    }
  });

  socket.on('newProduct', (product) => {
    const productCard = `
      <div class="col-md-4 mb-4 product-card" id="product-${product.id}">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Price: $${product.price}</p>
            <p class="card-text">Stock: ${product.stock}</p>
            <button class="btn btn-danger delete-btn" data-id="${product.id}">Delete</button>
          </div>
        </div>
      </div>
    `;
    productsContainer.insertAdjacentHTML('beforeend', productCard);
  });

  socket.on('deleteProduct', (productId) => {
    const productElement = document.getElementById(`product-${productId}`);
    if (productElement) {
      productElement.remove();
    }
  });

  socket.on('initialProducts', (products) => {
    productsContainer.innerHTML = products.map(product => `
      <div class="col-md-4 mb-4 product-card" id="product-${product.id}">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Price: $${product.price}</p>
            <p class="card-text">Stock: ${product.stock}</p>
            <button class="btn btn-danger delete-btn" data-id="${product.id}">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  });
});