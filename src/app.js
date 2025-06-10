import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import path from 'path';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { __dirname } from './utils/utils.js';
import { ProductManager } from './filesystem/ProductManager.js';
import { connectDB } from './database/config.js';

const app = express();
const PORT = 8080;
const httpServer = createServer(app);
const io = new Server(httpServer);

const productManager = new ProductManager('products.json', io);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  productManager.getProducts()
    .then(products => {
      socket.emit('initialProducts', products);
    })
    .catch(error => {
      console.error('error al enviar productos:', error);
    });

  socket.on('addProduct', async (productData) => {
    try {
      const newProduct = await productManager.addProduct(productData);
    } catch (error) {
      socket.emit('productError', error.message);
    }
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      await productManager.deleteProduct(productId);
    } catch (error) {
      socket.emit('productError', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('cliente desconectado');
  });
});

app.set('io', io);

httpServer.listen(PORT, () => {
  console.log(`Server corriendo en ${PORT}`);
});
await connectDB();