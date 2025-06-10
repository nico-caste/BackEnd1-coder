
# Proyecto Backend 1 - Coderhouse
## Entrega final
### Castellanos Nicolas
##### Esta es una api con endpoints y servicios necesarios para gestionar prodductos y carrito.
## Environment Variables
```bash
  Este proyecto requiere la siguiente certificacion:
mongodb+srv://nicocastellanos:635805@backend1.phx5uq7.mongodb.net/?retryWrites=true&w=majority&
```
## Dependencias necesarias:
```bash
  npm init
```
```bash
  npm install express
```
```bash
  npm install express-handlebars
```
```bash
  npm install socket.io
```
```bash
  npm install mongoose
```
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
* #### DELETE /api/carts/:cid/product/:pid
    Eliminar un producto del carrito
* #### DELETE /api/carts/:cid
    Eliminar carrito





