import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  role: number;  // Asegúrate de que el rol sea un número
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Por favor, ingrese todos los campos.');
      return;
    }

    this.http.get<LoginResponse>('http://localhost:3000/login', {
      params: {
        email: this.email,
        password: this.password
      }
    }).subscribe(
      (response: LoginResponse) => {
        // Verifica el rol del usuario y redirige según corresponda
        const role = Number(response.role); // Convierte el rol a número
        if (role === 1) {
          this.router.navigate(['/admin-menu']);
        } else if (role === 2) {
          this.router.navigate(['/operator-menu']);
        } else {
          alert('Rol de usuario no reconocido.');
        }
      },
      (error: any) => {
        alert('Error al iniciar sesión: ' + (error.message || error));
      }
    );
  }
}
