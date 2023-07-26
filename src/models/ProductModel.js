import axios from 'axios';

class ProductModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.attributes.name;
    this.price = data.attributes.price;
    this.stock = data.attributes.stock;
    this.description = data.attributes.description;
    this.condition = data.attributes.condition;
    this.createdAt = data.attributes.createdAt;
    this.updatedAt = data.attributes.updatedAt;
    this.publishedAt = data.attributes.publishedAt;
    this.category = data.attributes.category?.data?.attributes?.title || null;
    this.image = data.attributes.photo?.data?.attributes?.url || null;
  }
}

class ProductService {
  async getProducts() {
    try {
      const response = await axios.get('https://strapi-production-3591.up.railway.app/api/products?populate=*');
      const products = response.data.data.map((item) => new ProductModel(item));
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProduct(id) {
    try {
      const response = await axios.get(`https://strapi-production-3591.up.railway.app/api/products/${id}`);
      const product = new ProductModel(response.data.data);
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
}

export { ProductModel, ProductService };
