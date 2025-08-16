import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-register.html',
  styleUrls: ['./login-register.css'],
})
export class LoginRegister {
  username = '';
  password = '';
  first_name = '';
  last_name = '';
  email = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login({ username: this.username, password: this.password }).subscribe(
      response => {
        if (response.status === 200 && response.body) {
          localStorage.setItem('access_token', response.body.access_token);
          localStorage.setItem('refresh_token', response.body.refresh_token);
          this.router.navigate(['/dashboard']);
        }
      },
      error => alert('Login failed: ' + (error.error?.detail || 'unknown error'))
    );
  }

  register() {
    this.api.register({
      username: this.username,
      password: this.password,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email
    }).subscribe({
      next: () => alert('Inscription réussie !'),
      error: err => alert('Impossible de vous inscrire : ' + (err.error?.detail || 'erreur serveur'))
    });
  }
}
