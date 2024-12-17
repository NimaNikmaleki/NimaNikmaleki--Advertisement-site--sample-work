import axios from 'axios';
import { baseUrl } from '../../utils/options';

export class Auth {
  constructor() {
    this.sessionId = null;
    this.user = null;

    this.check();
  }

  login(sessionId, user) {
    this.sessionId = sessionId;
    this.user = user;

    this._renderAuthLink();
  }

  loginWithToken(type, token, user) {
    this.login(`${type} ${token}`, user);

    localStorage.setItem('sessionId', this.sessionId);
    localStorage.setItem('user', this.user);
  }

  check() {
    if (this.sessionId && this.user) {
      return true;
    }

    const sessionId = localStorage.getItem('sessionId');
    const user = localStorage.getItem('user');

    if (sessionId && user) {
      this.login(sessionId, user);

      return true;
    }

    return false;
  }

  authorizationToken() {
    return this.sessionId;
  }

  async logout() {
    try {
      await axios.post(
        `${baseUrl}account/logout`,
        {},
        {
          headers: {
            Authorization: this.authorizationToken(),
          },
        }
      );

      this.sessionId = null;
      this.user = null;

      localStorage.removeItem('sessionId');
      localStorage.removeItem('user');

      this._renderAuthLink();
    } catch (error) {
      console.log(error);
    }
  }

  _renderAuthLink() {
    if (this.check()) {
      document.getElementById('header-auth-link').classList.add('hidden');
      document.getElementById('header-logged').classList.remove('hidden');
    } else {
      document.getElementById('header-auth-link').classList.remove('hidden');
      document.getElementById('header-logged').classList.add('hidden');
    }
  }
}
