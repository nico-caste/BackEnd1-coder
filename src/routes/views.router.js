import { Router } from 'express';
import { ProductsService } from '../services/products.service.js';
import { ProductManager } from '../filesystem/ProductManager.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const productManager = new ProductManager('products.json', req.app.get('io'));
    const productsService = new ProductsService(productManager);
    const products = await productsService.getProducts();
    res.render('home', { 
      title: 'Productos',
      products 
    });
  } catch (error) {
    res.status(500).render('error', {
      error: error.message
    });
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const productManager = new ProductManager('products.json', req.app.get('io'));
    const productsService = new ProductsService(productManager);
    const products = await productsService.getProducts();
    res.render('realTimeProducts', { 
      title: 'Productos en Tiempo Real',
      products 
    });
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error',
      error: 'Error al cargar los productos en tiempo real' 
    });
  }
});

export default router;