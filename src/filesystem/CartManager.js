import fs from 'fs/promises';
import path from 'path';
import { Cart } from '../models/cart.model.js';
import { __dirname } from '../utils/utils.js';
import { generateUniqueId } from '../utils/utils.js';

export class CartManager {
  constructor(filePath) {
    this.path = path.join(__dirname, filePath);
    this.carts = [];
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      await fs.writeFile(this.path, JSON.stringify([], null, 2));
    }
  }

  async saveToFile() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }

  async createCart() {
    const newCart = new Cart();
    newCart.id = generateUniqueId();
    this.carts.push(newCart);
    await this.saveToFile();
    return newCart;
  }

  async getCartById(id) {
    const cart = this.carts.find((c) => c.id === id);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    return cart;
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const cart = await this.getCartById(cartId);
    const existingProduct = cart.products.find((p) => p.product === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await this.saveToFile();
    return cart;
  }
}