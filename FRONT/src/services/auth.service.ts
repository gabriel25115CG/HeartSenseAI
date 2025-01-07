import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlSignup = 'http://api.heartsense.fr/api/auth/signup';
  private apiUrlLogin = 'http://api.heartsense.fr/api/auth/signin';
  private apiUrlUserInfo = 'http://api.heartsense.fr/api/auth/userinfo';
  private apiUrlUpdateUser = 'http://api.heartsense.fr/api/auth/updateUser'; // Endpoint pour mettre à jour les données utilisateur

  constructor(private http: HttpClient) {}

  // Méthode pour inscrire un utilisateur
  register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
  }): Observable<{ uid: string; email: string }> {
    return this.http.post<{ uid: string; email: string }>(this.apiUrlSignup, data)
      .pipe(
        // Stocker l'UID dans le localStorage après l'inscription
        tap(response => {
          localStorage.setItem('user_uid', response.uid);  // Stockage de l'UID dans le localStorage
        })
      );
  }

  // Méthode pour connecter un utilisateur
  login(data: { email: string; password: string }): Observable<{ token: string; uid: string; email: string }> {
    return this.http.post<{ token: string; uid: string; email: string }>(this.apiUrlLogin, data)
      .pipe(
        // Stocker l'UID et le token dans le localStorage après la connexion
        tap(response => {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_uid', response.uid);  // Stockage de l'UID
        })
      );
  }

  // Vérifie si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Sauvegarde le token dans le localStorage
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Récupère le token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_uid');  // Supprimer l'UID du localStorage lors de la déconnexion
  }

  // Méthode pour récupérer les informations de l'utilisateur
  getUserInfo(): Observable<any> {
    const token = this.getToken();

    if (!token) {
      throw new Error('Token not found');
    }

    return this.http.get<any>(this.apiUrlUserInfo, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Méthode pour mettre à jour les informations de l'utilisateur
  updateUser(data: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    email?: string;
  }): Observable<any> {
    const token = this.getToken();
  
    if (!token) {
      throw new Error('Token not found');
    }
  
    // Récupérer l'UID de l'utilisateur stocké dans le localStorage
    const userId = localStorage.getItem('user_uid');
  
    if (!userId) {
      // Afficher un message d'erreur si l'UID n'est pas trouvé dans le localStorage
      console.error('User ID not found in localStorage');
      throw new Error('User ID not found in localStorage');
    }
  
    console.log('Updating user with UID:', userId);  // Log de l'UID pour débogage
    
    // Construire l'URL avec l'ID de l'utilisateur
    const url = `${this.apiUrlUpdateUser}/${userId}`;
  
    // Utilisation de PATCH pour la mise à jour partielle des informations
    return this.http.patch<any>(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(response => {
        console.log('User updated successfully', response);
      })
    );
  }
  
}
