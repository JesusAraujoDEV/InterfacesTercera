import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Config } from './pages/config/config';
import { Colors } from './pages/config/colors';
import { Fonts } from './pages/config/fonts';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  { path: 'dashboard', component: Dashboard },
  { path: 'config', component: Config },
  { path: 'config/colors', component: Colors },
  { path: 'config/fonts', component: Fonts },
];
