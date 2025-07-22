import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TangramLoadingComponent } from '../../components/shared/tangram-loading/tangram-loading.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

// Placeholders para los subcomponentes
import { Component as NgComponent, Input, Output, EventEmitter } from '@angular/core';
@NgComponent({ selector: 'app-users-list', standalone: true, template: '<div class="p-4 bg-white rounded shadow">UsersList (placeholder)</div>' })
export class UsersList { @Output() selectUser = new EventEmitter<any>(); }
@NgComponent({ selector: 'app-user-details', standalone: true, template: '<div class="p-4 bg-white rounded shadow">UserDetails (placeholder)</div>' })
export class UserDetails { @Input() user: any; }
@NgComponent({ selector: 'app-user-profile', standalone: true, template: '<div class="p-4 bg-white rounded shadow">UserProfile (placeholder)</div>' })
export class UserProfile { @Input() user: any; @Input() status: any; }
@NgComponent({ selector: 'app-user-map', standalone: true, template: '<div class="p-4 bg-white rounded shadow">UserMap (placeholder)</div>' })
export class UserMap { @Input() latitude: number = 0; @Input() longitude: number = 0; @Input() userName: string = ''; }

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, UsersList, UserDetails, UserProfile, UserMap, TangramLoadingComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  selectedUser: any = null;
  currentUser: any = null;
  userStatus: string | null = null;
  statusLoading = false;
  statusError: string | null = null;

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.fetchProfile();
  }

  async fetchProfile() {
    let token: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token');
    }
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    try {
      const res = await fetch(`${environment.BACKEND_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('No autorizado');
      const data = await res.json();
      this.currentUser = data;
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      await this.fetchStatus();
    } catch {
      this.router.navigate(['/login']);
    }
  }

  async fetchStatus() {
    if (!this.currentUser || !this.currentUser.id) return;
    this.statusLoading = true;
    this.statusError = null;
    try {
      let token: string | null = null;
      if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token');
      }
      const res = await fetch(`${environment.BACKEND_URL}/api/block/status/${this.currentUser.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('No se pudo obtener el estado');
      const data = await res.json();
      this.userStatus = data.status;
    } catch {
      this.statusError = 'Error al obtener el estado';
    } finally {
      this.statusLoading = false;
    }
  }

  get isAdminView(): boolean {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return this.currentUser?.role === 'admin' && params.get('view') === 'admin';
  }

  volverInicio() {
    this.router.navigate(['/']);
  }

  onSelectUser(user: any) {
    this.selectedUser = user;
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }
}
