import { makeAutoObservable } from 'mobx';
import { ProductService } from '../models/ProductModel';


class ProductViewModel {
  products = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProducts() {
    this.isLoading = true;
    try {
      const productService = new ProductService();
      this.products = await productService.getProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      this.isLoading = false;
    }
  }
}

export default ProductViewModel;
