import { App } from '../App';
import { Form } from './form';
import { Loading } from './loading';

export class callSubmit extends Form {
  constructor() {
    super();

    this.form = document.getElementById('register-form');
    this.submitBtn = document.getElementById('register-submit');
  }

  submitForm(event) {
    event.preventDefault();

    this.validate();

    if (this.failed()) {
      this.showValidationErrors();
      return;
    }

    if (!this.failed()) {
      this.showSuccessToast(
        ' اطلاعات شما برای مدیر سایت ارسال شد در سریع ترین زمان پاسخ شما را میدهیم  '
      );

      App.getRouter().navigateTo('home');

      return;
    }
  }

  sendFormData() {
    const params = {
      email: this.form.querySelector('#email').value,
      name: this.form.querySelector('#name').value,
      LastName: this.form.querySelector('#last-name').value,
      description: this.form.querySelector('#description'),
    };

    return params;
  }
}
