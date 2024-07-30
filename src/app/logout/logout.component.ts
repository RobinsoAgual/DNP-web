import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.logout();
  }

  logout() {
    // Optionally, you can call the backend logout route if you are managing server-side sessions
    this.http.post('http://localhost:5000/api/users/logout', {}).subscribe(
      () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        // Redirect to home
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión. Inténtalo de nuevo.');
      }
    );
  }
}
