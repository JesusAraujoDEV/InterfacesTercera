import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.error = '';
    const { email, password } = this.loginForm.value;
    try {
      const res = await fetch(`${environment.BACKEND_URL}/api/auth/login`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Invalid credentials');
      }
      const { user, token } = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = err.message || 'Invalid credentials. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get rememberMe() { return this.loginForm.get('rememberMe'); }
}
