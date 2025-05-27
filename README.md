
# Projecto Backend 1 - Coderhouse
## Pre entrega 2
### Castellanos Nicolas
##### Esta es una api con endpoints y servicios necesarios para gestionar prodductos y carrito.
## Depencencias necesarias
* node.js
* express
* express handlebars
* socket.io
## Rutas de gestion:
### Productos
* #### GET /api/products
    Obtener todos los productos
* #### GET /api/products/:pid
    Obtener un producto por ID
* #### POST /api/products
    Crear un nuevo producto
* #### PUT /api/products/:pid
    Actualizar un producto
* #### DELETE /api/products/:pid
    Eliminar un producto

### Carritos
* #### POST /api/carts
    Crear un nuevo carrito
* #### GET /api/carts/:cid
    Obtener un carrito por ID
* #### POST /api/carts/:cid/product/:pid
    Agregar un producto al carrito





