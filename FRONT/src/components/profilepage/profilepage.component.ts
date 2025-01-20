import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profilepage',
  standalone: true, // Indique que c'est un composant autonome
  imports: [CommonModule, FormsModule], // Importez CommonModule et FormsModule
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})


export class ProfilepageComponent implements OnInit {
  userInfo: any; // Déclarez une variable pour stocker les infos de l'utilisateur
  isEditMode: boolean = false; // Contrôle si l'utilisateur est en mode édition
  errorMessage: string = ''; // Message d'erreur en cas de problème
  successMessage: string = ''; // Message de succès pour informer l'utilisateur

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur dès le chargement du composant
    this.authService.getUserInfo().subscribe(
      (response) => {
        this.userInfo = response; // Stocker les informations récupérées
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
        this.errorMessage = 'Erreur lors de la récupération des informations de l\'utilisateur';
      }
    );
  }

  // Méthode logout pour se déconnecter
  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  // Permet d'activer/désactiver le mode édition
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    this.successMessage = ''; // Réinitialiser le message de succès
    this.errorMessage = '';   // Réinitialiser le message d'erreur
  }

  // Sauvegarder les changements effectués
  saveChanges(): void {
    // Créer un objet contenant les données modifiées
    const updatedData = {
      email: this.userInfo.email,
      address: this.userInfo.address,
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      phoneNumber: this.userInfo.phoneNumber,
    };

    // Appel du service pour mettre à jour les données de l'utilisateur
    this.authService.updateUser(updatedData).subscribe(
      response => {
        console.log('User data updated successfully', response);
        this.successMessage = 'Les modifications ont été enregistrées avec succès.';
        this.isEditMode = false;  // Désactive le mode édition après la sauvegarde
      },
      error => {
        console.error('Error updating user data', error);
        this.errorMessage = 'Erreur lors de la mise à jour des données utilisateur.';
      }
    );
  }
}

