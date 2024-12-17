// import { App } from './App';

export class Router {
  constructor(Page, app) {
    this.Pages = Page;
    this.app = app;
  }

  navigateTo(route, data = null) {
    const page = this.Pages.find((item) => item.route === route);

    if (page) {
      page.render(this.app.getAppContainer(), data);
      history.pushState({ route: route }, '', route);
    }
  }
}
