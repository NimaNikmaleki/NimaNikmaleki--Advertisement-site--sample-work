import axios from 'axios';
import { Ad } from './Ad';
import { baseUrl } from '../utils/options';

export class AdsList {
  constructor() {
    this.ads = [];

    this.filters = {
      keyword: null,
      category: null,
      location: null,
      sort: 'default',
    };
  }

  list() {
    if (this.ads.length > 0) {
      return this.ads;
    }

    return this.loadAds();
  }

  async loadAds() {
    const { data: result } = await this.fetch();

    this.ads = [];

    result.data.forEach((item) => {
      this.ads.push(new Ad(item));
    });

    return this.ads;
  }

  find(id) {
    return this.ads.find((item) => +item.id === +id);
  }

  fetch() {
    let queryString = '';
    for (let filter in this.filters) {
      if (!this.filters[filter]) continue;

      queryString += `${filter}=${this.filters[filter]}&`;
    }

    return axios.get(`${baseUrl}ads?${queryString}`);
  }

  setFilters(keyword, category, location) {
    this.filters.keyword = keyword;
    this.filters.category = category;
    this.filters.location = location;
  }
  setFilter(filter_name, filter_value) {
    if (!this.filters.hasOwnProperty(filter_name)) return;

    this.filters[filter_name] = filter_value;
  }
  getFilter(filter_name) {
    if (!this.filters.hasOwnProperty(filter_name)) return;

    return this.filters[filter_name];
  }
}
