import { Product } from '../models/product.model.js';

export class ProductsService {
  async getProducts(limit = 10, page = 1, sort, query) {
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      lean: true
    };

    if (sort) {
      options.sort = { price: sort === 'asc' ? 1 : -1 };
    }

    const filter = query ? { category: query } : {};

    return await Product.paginate(filter, options);
  }

  async getProductById(id) {
    const product = await Product.findById(id).lean();
    if (!product) {
      throw new Error('producto no encontrado');
    }
    return product;
  }

  async addProduct(productData) {
  if (productData.code && typeof productData.code === 'string') {
    productData.code = productData.code.trim();
    if (productData.code === '') {
      delete productData.code;
    }
  } else {
    delete productData.code;
  }

  try {
    const newProduct = new Product(productData);
    return await newProduct.save();
  } catch (error) {
    if (error.code === 11000) {
      delete productData.code;
      const newProduct = new Product(productData);
      return await newProduct.save();
    }
    throw error;
  }
}

  async updateProduct(id, updatedFields) {
    const product = await Product.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );
    if (!product) {
      throw new Error('producto no encontrado');
    }
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new Error('producto no encontrado');
    }
    return product;
  }
}