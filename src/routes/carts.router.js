import { Router } from 'express';
import { CartsService } from '../services/carts.service.js';
import { CartManager } from '../fileSystem/CartManager.js';
import { ProductManager } from '../filesystem/ProductManager.js';

const router = Router();
const cartManager = new CartManager('carts.json');
const productManager = new ProductManager('products.json');
const cartsService = new CartsService(cartManager, productManager);

router.post('/', async (req, res) => {
  try {
    const newCart = await cartsService.createCart();
    res.status(201).json({ status: 'success', payload: newCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(cid);
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await cartsService.addProductToCart(cid, pid, quantity);
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

export default router;