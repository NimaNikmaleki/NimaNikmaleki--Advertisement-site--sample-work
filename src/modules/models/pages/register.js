import { RegisterSubmit } from '../../utils/registerSubmit';
import { Page } from '../Page';

export class RegisterPage extends Page {
  async prepareForRender(pageContent) {
    return pageContent;
  }

  afterRender() {
    const form = new RegisterSubmit();

    form.submit();
    console.log(form);
  }
}
