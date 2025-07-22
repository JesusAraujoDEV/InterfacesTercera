import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { UserCreateModalComponent } from '../usercreatemodal/usercreatemodal.component';
import { environment } from '../../../../environments/environment';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, NgClass, UserCreateModalComponent, FormsModule],
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() users: any[] = [];
  @Output() selectUser = new EventEmitter<any>();

  loading = true;
  showCreateModal = false;

  filter = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: '',
    role: ''
  };

  get filteredUsers() {
    return this.users.filter(u =>
      (this.filter.id === '' || (u.id + '').includes(this.filter.id)) &&
      (this.filter.firstName === '' || (u.firstName || '').toLowerCase().includes(this.filter.firstName.toLowerCase())) &&
      (this.filter.lastName === '' || (u.lastName || '').toLowerCase().includes(this.filter.lastName.toLowerCase())) &&
      (this.filter.email === '' || (u.email || '').toLowerCase().includes(this.filter.email.toLowerCase())) &&
      (this.filter.phone === '' || (u.phone || '').toLowerCase().includes(this.filter.phone.toLowerCase())) &&
      (this.filter.status === '' || (u.status || '').toLowerCase().includes(this.filter.status.toLowerCase())) &&
      (this.filter.role === '' || (u.role || '').toLowerCase().includes(this.filter.role.toLowerCase()))
    );
  }

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

  exportToExcel() {
    const data = this.users.map(u => ({
      ID: u.id,
      Nombre: u.firstName,
      Apellido: u.lastName,
      Email: u.email,
      Teléfono: u.phone,
      Estado: u.status,
      Rol: u.role
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    // Filtros automáticos solo si ws['!ref'] existe
    if (typeof ws['!ref'] === 'string') {
      ws['!autofilter'] = { ref: ws['!ref'] };
    }
    // Estilos: cabecera en negrita, fondo azul claro, bordes
    const range = XLSX.utils.decode_range(ws['!ref']!);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = ws[XLSX.utils.encode_cell({ r: 0, c: C })];
      if (cell) {
        cell.s = {
          font: { bold: true },
          fill: { fgColor: { rgb: 'D6EAF8' } },
          border: {
            top: { style: 'thin', color: { rgb: 'AAB7B8' } },
            bottom: { style: 'thin', color: { rgb: 'AAB7B8' } },
            left: { style: 'thin', color: { rgb: 'AAB7B8' } },
            right: { style: 'thin', color: { rgb: 'AAB7B8' } }
          }
        };
      }
    }
    ws['!cols'] = [
      { wch: 8 }, { wch: 16 }, { wch: 16 }, { wch: 28 }, { wch: 16 }, { wch: 10 }, { wch: 10 }
    ];
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'usuarios.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const columns = [
      { header: 'ID', dataKey: 'id' },
      { header: 'Nombre', dataKey: 'firstName' },
      { header: 'Apellido', dataKey: 'lastName' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Teléfono', dataKey: 'phone' },
      { header: 'Estado', dataKey: 'status' },
      { header: 'Rol', dataKey: 'role' }
    ];
    const rows = this.users.map(u => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      phone: u.phone,
      status: u.status,
      role: u.role
    }));
    autoTable(doc, {
      columns,
      body: rows,
      headStyles: { fillColor: [52, 152, 219], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 4 },
      margin: { top: 40, left: 20, right: 20 },
      tableWidth: 'auto',
      didDrawPage: (data) => {
        doc.setFontSize(16);
        doc.setTextColor(40);
        doc.text('Usuarios', data.settings.margin.left, 30);
      }
    });
    doc.save('usuarios.pdf');
  }
}
