import { Call } from './modules/models/pages/call';
import { DashBoardPage } from './modules/models/pages/Dashboard';
import { Home } from './modules/models/pages/Home';
import { LoginPage } from './modules/models/pages/login';
import { RegisterPage } from './modules/models/pages/register';
import { SinglePage } from './modules/models/pages/single';
import { submitPage } from './modules/models/pages/submitPage';

export const routes = [
  new Home('home', 'home.html'),
  new SinglePage('single', 'single.html'),
  new RegisterPage('register', 'register.html'),
  new LoginPage('login', 'login.html'),
  new DashBoardPage('dashboard', 'dashboard.html'),
  new submitPage('submit', 'submit.html'),
  new Call('call', 'call.html'),
];
