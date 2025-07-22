import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { UserCreateModalComponent } from '../usercreatemodal/usercreatemodal.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, NgClass, UserCreateModalComponent],
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() users: any[] = [];
  @Output() selectUser = new EventEmitter<any>();

  loading = true;
  showCreateModal = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      this.loading = true;
      const response = await fetch(`${environment.BACKEND_URL}/api/users`);
      const data = await response.json();
      this.users = data;
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      this.loading = false;
    }
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  handleUserCreated() {
    this.closeCreateModal();
    this.fetchUsers();
  }

  handleSelectUser(user: any) {
    this.selectUser.emit(user);
  }

  async toggleUserStatus(user: any, checked: boolean) {
    const token = localStorage.getItem('token');
    const action = checked ? 'unblock' : 'block';
    try {
      const res = await fetch(`${environment.BACKEND_URL}/api/block/${user.id}/${action}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('No se pudo cambiar el estado');
      this.users = this.users.map(u => u.id === user.id ? { ...u, status: checked ? 'active' : 'inactive' } : u);
    } catch {
      alert('Error al cambiar el estado del usuario');
    }
  }
  getChecked(event: Event): boolean {
    return !!(event.target && (event.target as HTMLInputElement).checked);
  }
}
