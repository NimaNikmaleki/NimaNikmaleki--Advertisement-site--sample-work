import { App } from '../../App';
import { SubmitForm } from '../../utils/submitForm';
import { Page } from '../Page';

export class submitPage extends Page {
  shouldBeLogoutIn() {
    return true;
  }
  async prepareForRender(pageContent) {
    const pageDom = document.createElement('div');
    pageDom.innerHTML = pageContent;

    const { categories, locations } = await Promise.all([
      App.getCategory().list(),
      App.getLocation().list(),
    ]);

    this._prepareSelectOptions(pageDom);

    return pageDom.innerHTML;
  }

  afterRender() {
    const form = new SubmitForm();
    form.submit();
  }

  _prepareSelectOptions(pageDom) {
    const categoriesElm = pageDom.querySelector('#category');
    App.getCategory().renderTo(categoriesElm);

    const locationsElm = pageDom.querySelector('#location');
    App.getCategory().renderTo(locationsElm);
  }
}
