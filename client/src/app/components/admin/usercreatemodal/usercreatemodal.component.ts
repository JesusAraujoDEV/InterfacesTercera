import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule],
  templateUrl: './usercreatemodal.component.html',
  styleUrls: ['./usercreatemodal.component.css']
})
export class UserCreateModalComponent {
  @Input() open: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSuccess = new EventEmitter<void>();

  form: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  async submit() {
    this.error = '';
    this.success = '';
    if (this.form.invalid) return;
    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    this.loading = true;
    try {
      let username = this.form.value.email;
      if (username.endsWith('@gmail.com')) {
        username = username.replace('@gmail.com', '');
      } else if (username.includes('@')) {
        username = username.split('@')[0];
      }
      const payload = {
        email: this.form.value.email,
        password: this.form.value.password,
        username,
      };
      const res = await fetch(`${(window as any).env?.VITE_BACKEND_URL || ''}/api/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed');
      }
      this.success = '¡Cuenta creada exitosamente!';
      setTimeout(() => {
        this.onSuccess.emit();
        this.onClose.emit();
        window.location.reload();
      }, 1200);
    } catch (err: any) {
      this.error = err.message || 'Registration failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.onClose.emit();
  }
}
