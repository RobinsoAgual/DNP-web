import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  users: any[] = [];
  showForm: boolean = false;
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@ups.edu.ec$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
    });
  }

  showCreateUserForm() {
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.userForm.reset();
  }

  submitForm() {
    if (this.userForm.invalid) {
      return;
    }
  
    const newUser = this.userForm.value;
    newUser.role = Number(newUser.role);  // Asegúrate de que el rol sea un número
  
    this.http.post('http://localhost:3000/create-user', newUser).subscribe(() => {
      alert('Usuario creado con éxito.');
      this.loadUsers();
      this.cancelForm();
    }, error => {
      alert('Error al crear el usuario: ' + error.message);
    });
  }
  
}
