import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- Interfaces ---
export interface ProffesseursUser {
  id: number;
  username: string;
  password?: string; // On n'expose pas le password côté client
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}

export interface Eleve {
  id: number;
  first_name: string;
  last_name: string;
  classe: number;
  photo: string;
}

export interface Classe {
  id: number;
  name: string;
  user: ProffesseursUser;
}

export interface AuthResponse {
  user: ProffesseursUser;
  access_token: string;
  refresh_token: string;
}

export interface RegisterUser {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  private baseUrl = 'http://127.0.0.1:8000/api';
  private endpoints = {
    login: `${this.baseUrl}/login`,
    register: `${this.baseUrl}/register`,
    eleves: `${this.baseUrl}/eleves`,
    classes: `${this.baseUrl}/classes`,
  };

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // --- Auth ---
  register(user: RegisterUser): Observable<ProffesseursUser> {
    return this.http.post<ProffesseursUser>(this.endpoints.register, user);
  }

  login(credentials: { username: string; password: string }): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(this.endpoints.login, credentials, { observe: 'response' });
  }

  // --- Données protégées ---
  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.endpoints.eleves, { headers: this.getAuthHeaders() });
  }

  getClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(this.endpoints.classes, { headers: this.getAuthHeaders() });
  }
}
