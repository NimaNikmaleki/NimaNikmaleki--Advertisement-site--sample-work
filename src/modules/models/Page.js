import { App } from '../App';
import { Loading } from '../utils/loading';

export class Page {
  constructor(route, template) {
    this.route = route;
    this.template = template;
  }

  render(appContainer, data) {
    Loading.show();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (this.restrictOnAuth() && App.getAuth().check()) {
      App.getRouter().navigateTo('home');
      return;
    }

    if (this.shouldBeLogoutIn() && !App.getAuth().check()) {
      App.getRouter().navigateTo('home');
      return;
    }

    fetch(`./pages/${this.template}`)
      .then((response) => response.text())
      .then((html) => {
        const result = this.prepareForRender(html, data).then((result) => {
          appContainer.innerHTML = result;
          this.afterRender(data);
          Loading.hide();
        });
      });
  }

  async prepareForRender(html) {
    return html;
  }

  afterRender() {}

  restrictOnAuth() {
    return false;
  }

  shouldBeLogoutIn() {
    return false;
  }
}
