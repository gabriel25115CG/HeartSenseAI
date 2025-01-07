import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Assurez-vous que c'est le bon chemin
import { FormsModule } from '@angular/forms'; // Importer FormsModule pour ngModel
import { CommonModule } from '@angular/common'; // Pour les directives comme *ngIf

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css'],
  standalone: true,  // Ce composant est autonome (dans un module fonctionnel)
  imports: [FormsModule, CommonModule] // Ajout des modules nécessaires pour le formulaire et ngIf
})
export class LoginformComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode de soumission du formulaire
  onSubmit(): void {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login success', response);
        this.authService.setToken(response.token); // Assurez-vous d'avoir la méthode setToken dans AuthService
        this.router.navigate(['/chat']);
      },
      error: (error) => {
        console.error('Login error', error);
        this.errorMessage = 'Invalid credentials'; // Message d'erreur si la connexion échoue
      }
    });
  }
}
