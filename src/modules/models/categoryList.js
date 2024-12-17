import axios from 'axios';
import { baseUrl } from '../utils/options';

export class CategoryList {
  constructor() {
    this.categories = [];
  }

  async list() {
    if (this.categories.length > 0) {
      return this.categories;
    }

    return this.loadCategories();
  }

  async loadCategories() {
    const { data: result } = await axios.get(`${baseUrl}categories`);

    this.categories = result.data;

    return this.categories;
  }

  renderTo(targetElm, selected_value = null) {
    this.categories.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.innerText = item.title;

      if (item.id === +selected_value) {
        option.setAttribute('selected', true);
      }

      targetElm.append(option);
    });
  }
}
