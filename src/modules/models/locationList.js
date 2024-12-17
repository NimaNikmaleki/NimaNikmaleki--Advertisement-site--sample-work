import axios from 'axios';
import { baseUrl } from '../utils/options';

export class LocationList {
  constructor() {
    this.locations = [];
  }

  list() {
    if (this.locations.length > 0) {
      return this.locations;
    }

    return this.loadLocations();
  }

  async loadLocations() {
    const { data: result } = await axios.get(`${baseUrl}locations`);

    this.locations = result.data;

    return this.locations;
  }
  renderTo(targetElm, selected_value = null) {
    this.locations.forEach((item) => {
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
