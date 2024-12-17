export class Loading {
  static show() {
    document.getElementById('loading').setAttribute('aria-busy', true);
  }

  static hide() {
    document.getElementById('loading').setAttribute('aria-busy', false);
  }
}
