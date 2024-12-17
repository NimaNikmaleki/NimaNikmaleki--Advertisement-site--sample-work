import axios from 'axios';
import { baseUrl } from './options';
import { App } from '../App';
import { Loading } from './loading';
import { Form } from './form';

export class RegisterSubmit extends Form {
  constructor() {
    super();
    this.form = document.getElementById('register-form');

    this.submitBtn = document.getElementById('register-submit');
  }

  async submitForm(event) {
    event.preventDefault();

    this.validate();

    if (this.failed()) {
      this.error().forEach((error) => {
        this.showErrorToast(error);
      });

      return;
    }
    Loading.show();

    try {
      await this.sendFormData();
      this.showSuccessToast('ثبت نام شما به درستی انجام شد');
      Loading.hide();

      App.getRouter().navigateTo('login');
    } catch (e) {
      Loading.hide();

      const errors = e.response.data.errors;

      for (let error in errors) {
        this.showErrorToast(errors[error][0]);
      }
    }
  }

  sendFormData() {
    const params = {
      name: this.form.querySelector('#name').value,
      email: this.form.querySelector('#email').value,
      phone: this.form.querySelector('#phone').value,
      password: this.form.querySelector('#password').value,
      password_confirmation: this.form.querySelector('#password_confirmation')
        .value,
    };

    return axios.post(`${baseUrl}register`, params);
  }

  error() {
    return this._errors.reverse();
  }
  failed() {
    return this._errors.length > 0;
  }
}
