import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Component } from '@angular/core';

// Placeholders para los nuevos componentes
@Component({
  selector: 'app-config',
  standalone: true,
  templateUrl: './pages/config/config.html',
  styleUrl: './pages/config/config.css'
})
export class Config {}
@Component({
  selector: 'app-colors',
  standalone: true,
  templateUrl: './pages/config/colors.html',
  styleUrl: './pages/config/colors.css'
})
export class Colors {}
@Component({
  selector: 'app-fonts',
  standalone: true,
  templateUrl: './pages/config/fonts.html',
  styleUrl: './pages/config/fonts.css'
})
export class Fonts {}

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  { path: 'dashboard', component: Dashboard },
  { path: 'config', component: Config },
  { path: 'config/colors', component: Colors },
  { path: 'config/fonts', component: Fonts },
];
