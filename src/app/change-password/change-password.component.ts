// change-password.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  email: string = '';
  newPassword: string = '';

  constructor(private http: HttpClient) {}

  changePassword() {
     // Mostrar alerta de confirmación
    if (window.confirm('¿Estás seguro que deseas cambiar la contraseña?')) {
      // Proceder con el cambio de contraseña si el usuario confirma
      if (!this.email || !this.newPassword) {
        alert('Por favor, ingrese todos los campos.');
        return;
      }

    this.http.put('http://localhost:3000/change-password', {
      email: this.email,
      newPassword: this.newPassword
    }).subscribe(response => {
      alert('Contraseña cambiada con éxito.');
    }, error => {
      alert('Error al cambiar la contraseña: ' + error.message);
    });
  }
}
}