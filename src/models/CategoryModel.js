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
      const response = await axios.get('http://10.0.2.2:1337/api/categories'); 
      const category = response.data.data.map((item) => new CategoryModel(item));
      return category;
    } catch (error) {
      console.error('Error fetching Category:', error);
      throw error;
    }
  }
}

export { CategoryModel, CategoryService };