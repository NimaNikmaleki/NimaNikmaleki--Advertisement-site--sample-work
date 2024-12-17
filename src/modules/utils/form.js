import Toastify from 'toastify-js';

export class Form {
  constructor() {
    this.form = null;
    this.submitBtn = null;

    this._errors = [];
  }
  submit() {
    this.submitBtn.addEventListener('click', this.submitForm.bind(this));
  }

  error() {
    return this._errors.reverse();
  }
  failed() {
    return this._errors.length > 0;
  }

  addError(message) {
    this._errors.push(message);
  }

  clearErrors() {
    this._errors = [];
  }

  showErrorToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: '#bb4141',
      },
    }).showToast();
  }

  showSuccessToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: '#3aa43e',
      },
    }).showToast();
  }
  showValidationErrors() {
    this.error().forEach((error) => {
      this.showErrorToast(error);
    });
  }

  validate() {
    this.clearErrors();

    const inputs = this.form.querySelectorAll('input');

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        this.addError(
          `وارد کردن ${input.getAttribute('data-title')} ضروری است`
        );
      }
    });
  }

  // console.log(inputs);
}
