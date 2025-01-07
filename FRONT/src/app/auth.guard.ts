import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // La méthode canActivate est utilisée pour vérifier si un utilisateur peut accéder à une route
  canActivate(
    next: ActivatedRouteSnapshot, // Donne accès aux informations sur la route
    state: RouterStateSnapshot    // Donne accès à l'état de la route
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Vérifie si l'utilisateur est authentifié en appelant la méthode isAuthenticated du service AuthService
    if (this.authService.isAuthenticated()) {
      return true;  // Si l'utilisateur est authentifié, permet l'accès à la route
    } else {
      // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
      this.router.navigate(['/login']);
      return false;  // L'accès à la route est refusé
    }
  }
}
