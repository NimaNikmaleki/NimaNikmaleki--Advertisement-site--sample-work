import { routes } from '../routes';
import { AdsList } from './models/Adslist';
import { CategoryList } from './models/categoryList';
import { LocationList } from './models/locationList';
import { Auth } from './models/pages/Auth';
import { Router } from './Router';

export class Classified {
  constructor() {
    this.appContainer = document.getElementById('app');

    this.initiateApp();
    this.initiateRouter();
  }

  initiateApp() {
    this.adsList = new AdsList();
    this.auth = new Auth();
    this.categoryList = new CategoryList();
    this.locationList = new LocationList();
  }

  initiateRouter() {
    this.pages = routes;

    this.router = new Router(this.pages, this);

    this.handleNavigationLink();

    this.handleHistory();
    this.handleFirstPage();
  }

  handleNavigationLink() {
    document.addEventListener('click', (event) => {
      if (event.target.tagName === 'INPUT') {
        console.log(event.target.tagName);
        return;
      }
      event.preventDefault();
      let link = null;
      if (event.target.tagName === 'IMG' || event.target.tagName === 'I') {
        link = event.target.closest('a');
      }
      if (event.target.tagName === 'A' && event.target.getAttribute('href')) {
        link = event.target;
      }

      if (!link) {
        return;
      }

      const target = link.getAttribute('href').substring(1);
      this.router.navigateTo(target, link.getAttribute('data-item-id'));
    });
  }
  handleHistory() {
    window.addEventListener('popstate', (event) => {
      const target = event.state ? event.state.route : 'home';
      this.router.navigateTo(target);
    });
  }

  handleFirstPage() {
    this.router.navigateTo('home');
  }

  getAppContainer() {
    return this.appContainer;
  }
}
