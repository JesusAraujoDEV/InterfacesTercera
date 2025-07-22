import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usercreatemodal.component.html',
  styleUrls: ['./usercreatemodal.component.css']
})
export class UserCreateModalComponent {
  @Output() onClose = new EventEmitter<void>();
  @Output() onSuccess = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  close() {
    this.onClose.emit();
  }

  async submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    try {
      const { name, email, password, confirmPassword } = this.form.value;
      if (password !== confirmPassword) {
        this.error = 'Las contraseñas no coinciden';
        this.loading = false;
        return;
      }
      const res = await fetch(`${environment.BACKEND_URL}/api/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) throw new Error('No se pudo crear el usuario');
      this.onSuccess.emit();
      this.close();
    } catch (e: any) {
      this.error = e.message || 'Error desconocido';
    } finally {
      this.loading = false;
    }
  }
}
