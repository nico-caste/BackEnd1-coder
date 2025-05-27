export class CartsService {
  constructor(cartManager, productManager) {
    this.cartManager = cartManager;
    this.productManager = productManager;
  }

  async createCart() {
    return await this.cartManager.createCart();
  }

  async getCartById(id) {
    const cart = await this.cartManager.getCartById(id);
    
    // Populate products with full product data
    const populatedProducts = await Promise.all(
      cart.products.map(async (item) => {
        const product = await this.productManager.getProductById(item.product);
        return {
          ...item,
          product: {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnails: product.thumbnails,
          },
        };
      })
    );

    return {
      ...cart,
      products: populatedProducts,
    };
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    // Verify product exists
    await this.productManager.getProductById(productId);
    return await this.cartManager.addProductToCart(cartId, productId, quantity);
  }
}