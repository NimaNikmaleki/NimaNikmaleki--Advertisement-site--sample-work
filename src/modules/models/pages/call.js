import { callSubmit } from '../../utils/callSubmit';
import { Page } from '../Page';

export class Call extends Page {
  async prepareForRender(pageContent) {
    const pageDom = document.createElement('div');
    pageDom.innerHTML = pageContent;

    return pageDom.innerHTML;
  }
  afterRender() {
    const form = new callSubmit();

    form.submit();
    console.log(form);
  }
}
