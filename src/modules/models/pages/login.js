import { LoginSubmit } from '../../utils/loginSubmitForm';
import { Page } from '../Page';

export class LoginPage extends Page {
  restrictOnAuth() {
    return true;
  }
  async prepareForRender(pageContent) {
    return pageContent;
  }
  afterRender() {
    const form = new LoginSubmit();

    form.submit();
    console.log(form);
  }
}
