export class ProductsService {
  constructor(productManager) {
    this.productManager = productManager;
  }

  async getProducts(limit) {
    return await this.productManager.getProducts(limit);
  }

  async getProductById(id) {
    return await this.productManager.getProductById(id);
  }

  async addProduct(productData) {
    return await this.productManager.addProduct(productData);
  }

  async updateProduct(id, updatedFields) {
    return await this.productManager.updateProduct(id, updatedFields);
  }

  async deleteProduct(id) {
    return await this.productManager.deleteProduct(id);
  }
}