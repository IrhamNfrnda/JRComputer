import axios from 'axios';

class CategoryModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.attributes.title;
  }
}

class CategoryService {
  async getCategory() {
    try {
      const response = await axios.get('https://strapi-production-3591.up.railway.app/api/categories'); 
      const category = response.data.data.map((item) => new CategoryModel(item));
      return category;
    } catch (error) {
      console.error('Error fetching Category:', error.response.data);
      throw error;
    }
  }
}

export { CategoryModel, CategoryService };