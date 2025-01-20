import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';  // Importer Router

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterFormComponent {
  formData = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router  // Injecter Router
  ) {}

  onSubmit() {
    // Appeler le service d'enregistrement avec les données du formulaire
    this.authService.register(this.formData).subscribe(
      response => {
        console.log('Registration successful', response);
        // Rediriger vers la page de connexion après une inscription réussie
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}
