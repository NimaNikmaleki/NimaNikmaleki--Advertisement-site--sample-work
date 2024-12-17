import axios from 'axios';
import { Classified } from './Classified';

export class App {
  static init() {
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['X-Laraplus-Identify'] =
      '9c89b04d-f039-4cb3-a36e-596db347db25';

    this.classified = new Classified();
  }

  static getAdsList() {
    return this.classified.adsList;
  }
  static getAppContainer() {
    return this.classified.appContainer;
  }
  static getRouter() {
    return this.classified.router;
  }

  static getCategory() {
    return this.classified.categoryList;
  }

  static getLocation() {
    return this.classified.locationList;
  }

  static getAuth() {
    return this.classified.auth;
  }
}
