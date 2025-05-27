import { Router } from 'express';
import { ProductsService } from '../services/products.service.js';
import { ProductManager } from '../filesystem/ProductManager.js';

const router = Router();
const productManager = new ProductManager('products.json');
const productsService = new ProductsService(productManager);

router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productsService.getProducts(limit);
    res.json({ status: 'success', payload: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsService.getProductById(pid);
    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productsService.addProduct(productData);
    
    const io = req.app.get('io');
    io.emit('newProduct', newProduct);
    
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedFields = req.body;
    const updatedProduct = await productsService.updateProduct(pid, updatedFields);
    res.json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productsService.deleteProduct(pid);
    
    const io = req.app.get('io');
    io.emit('deleteProduct', pid);
    
    res.json({ status: 'success', payload: deletedProduct });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

export default router;