import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  imports: [FormsModule, RouterModule, CommonModule, ApiService, Router],
  templateUrl: './login-register.html',
  styleUrl: './login-register.css'
})

export class LoginRegister {
  username = '';
  password = '';
  api: ApiService;
  router: Router;
  first_name = '';
  last_name = '';
  email = '';

  constructor() {
    this.api = new ApiService();
    this.router = new Router();
  }


  login() {
    this.api.login({ username: this.username, password: this.password }).subscribe(
      response => {
        console.log(response);
        if (response.status === 200 && response.body) {
          localStorage.setItem('access_token', response.body.access_token);
          localStorage.setItem('refresh_token', response.body.refresh_token);
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        console.error(error);
        // Type-safe
        const msg = (error.error && error.error.detail) ? error.error.detail : 'An unknown error occurred';
        alert('Login failed: ' + msg);
      }
    );
  }

  register() {
    this.api.register({ username: this.username, password: this.password, first_name: this.first_name, last_name: this.last_name, email: this.email}).subscribe({
      next: (user) => {
        console.log('Utilisateur enregistré avec succès :', user);
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        // Ici, tu peux rediriger vers la page de login si besoin
        // this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription :', err);
        alert('Impossible de vous inscrire : ' + (err.error?.detail || 'erreur serveur'));
      }
    });
  }


}
