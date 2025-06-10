import fs from 'fs/promises';
import path from 'path';
import { Product } from '../models/product.model.js';
import { __dirname, generateUniqueId } from '../utils/utils.js';

export class ProductManager {
  constructor(filePath, io) {
    this.path = path.join(__dirname, filePath);
    this.products = [];
    this.io = io;
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      await this.saveToFile();
    }
  }

  async saveToFile() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
  }

  async getProducts(limit) {
    await this.loadProducts();
    if (limit) {
      return this.products.slice(0, parseInt(limit));
    }
    return this.products;
  }

  async getProductById(id) {
    await this.loadProducts();
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async addProduct(productData) {
    const { title, description, price, stock, category } = productData;
    
    if (!title || !description || !price || !stock || !category) {
      throw new Error('All fields are required');
    }

    const newProduct = new Product({
      ...productData,
      status: productData.status ?? true,
      thumbnails: productData.thumbnails ?? [],
    });

    newProduct.id = generateUniqueId();
    this.products.push(newProduct);
    await this.saveToFile();
    
    if (this.io) {
      this.io.emit('newProduct', newProduct);
    }
    
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    await this.loadProducts();
    const productIndex = this.products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }
    
    const product = this.products[productIndex];
    const allowedFields = ['title', 'description', 'price', 'thumbnails', 'stock', 'category'];
    
    for (const field of allowedFields) {
      if (updatedFields[field] !== undefined) {
        product[field] = updatedFields[field];
      }
    }
    
    await this.saveToFile();
    return product;
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    const deletedProduct = this.products.splice(productIndex, 1);
    await this.saveToFile();
    
    if (this.io) {
      this.io.emit('deleteProduct', id);
    }
    
    return deletedProduct[0];
  }
}