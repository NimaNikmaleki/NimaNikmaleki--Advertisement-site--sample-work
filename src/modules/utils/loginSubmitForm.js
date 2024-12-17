import axios from 'axios';
import { baseUrl } from './options';

import { Loading } from './loading';
import { Form } from './form';
import { App } from '../App';

export class LoginSubmit extends Form {
  constructor() {
    super();

    this.form = document.getElementById('login-form');
    this.submitBtn = document.getElementById('login-submit');
  }

  async submitForm(event) {
    event.preventDefault();

    this.validate();

    if (this.failed()) {
      this.showValidationErrors();

      return;
    }

    Loading.show();

    try {
      const { data: result } = await this.sendFormData();

      this.showSuccessToast('ورود با موفقیت انجام شد');
      console.log(result.user);
      App.getAuth().loginWithToken(result.type, result.token, result.user);

      Loading.hide();

      App.getRouter().navigateTo('dashboard');
      return;
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
      email: this.form.querySelector('#email').value,
      password: this.form.querySelector('#password').value,
    };

    return axios.post(`${baseUrl}login`, params);
  }
}
