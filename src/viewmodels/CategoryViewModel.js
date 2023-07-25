import { makeAutoObservable } from 'mobx';
import { CategoryService } from '../models/CategoryModel';


class CategoryViewModel {
  category = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCategory() {
    this.isLoading = true;
    try {
      const categoryService = new CategoryService();
      this.category = await categoryService.getCategory();
    } catch (error) {
      console.error('Error fetching category:', error);
    } finally {
      this.isLoading = false;
    }
  }
}

export default CategoryViewModel;
