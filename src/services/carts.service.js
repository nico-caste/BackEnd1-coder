import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js';

export class CartsService {
  constructor(cartManager, productManager) {
    this.cartManager = cartManager;
    this.productManager = productManager;
  }

  async createCart() {
    const newCart = new Cart();
    return await newCart.save();
  }

  async getCartById(id) {
    const cart = await Cart.findById(id);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    return cart;
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('producto no econtrado');
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const productIndex = cart.products.findIndex(
      item => item.product.toString() === productId
    );

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    await cart.save();
    return Cart.findById(cartId).populate('products.product');
  }

  async removeProductFromCart(cartId, productId) {
    await this.productManager.getProductById(productId);
    const cart = await this.cartManager.getCartById(cartId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.products = cart.products.filter(
      item => item.product.toString() !== productId
    );
    await this.cartManager.saveToFile();
    return cart;
  }

  async emptyCart(cartId) {
    const cart = await this.cartManager.getCartById(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.products = [];
    await this.cartManager.saveToFile();
    return cart;
  }
};