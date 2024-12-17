import axios from 'axios';
import { Ad } from './Ad';
import { baseUrl } from '../utils/options';
import { App } from '../App';

export class UserAdsList {
  constructor() {
    this.ads = [];
  }

  async loadAds() {
    const { data: result } = await this.fetch();

    result.data.forEach((item) => {
      this.ads.push(new Ad(item));
    });

    return this.ads;
  }

  async find(id) {
    const { data: result } = await axios.get(
      `${baseUrl}account/listing/${id}`,
      {
        headers: {
          Authorization: App.getAuth().authorizationToken(),
        },
      }
    );
    if (!result.data) return;

    return new Ad(result.data);
  }

  fetch() {
    return axios.get(`${baseUrl}account/listing`, {
      headers: {
        Authorization: App.getAuth().authorizationToken(),
      },
    });
  }

  async delete(id) {
    return axios.delete(`${baseUrl}account/listing/${id}`, {
      headers: {
        Authorization: App.getAuth().authorizationToken(),
      },
    });
  }
}
