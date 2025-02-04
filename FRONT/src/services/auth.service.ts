import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlSignup = 'http://localhost:3001/api/auth/signup';
  private apiUrlLogin = 'http://localhost:3001/api/auth/signin';
  private apiUrlUserInfo = 'http://localhost:3001/api/auth/userinfo';
  private apiUrlUpdateUser = 'http://localhost:3001/api/auth/updateUser';

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
    return this.http.post<{ uid: string; email: string }>(this.apiUrlSignup, data).pipe(
      tap(response => {
        localStorage.setItem('user_uid', response.uid);
        localStorage.setItem('user_email', response.email);  // Enregistrer l'email également
      }),
      catchError(this.handleError)  
    );
  }

  // Méthode pour connecter un utilisateur
  login(data: { email: string; password: string }): Observable<{ token: string; uid: string; email: string }> {
    return this.http.post<{ token: string; uid: string; email: string }>(this.apiUrlLogin, data).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_uid', response.uid);
        localStorage.setItem('user_email', response.email);  
      }),
      catchError(this.handleError)  
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
    localStorage.removeItem('user_uid');
    localStorage.removeItem('user_email');  
  }

  // Récupérer les informations de l'utilisateur
  getUserInfo(): Observable<any> {
    const token = this.getToken();
  
    if (!token) {
      console.error('Token not found');
      return throwError('Token not found');
    }
  
    return this.http.get<any>(this.apiUrlUserInfo, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe(
      tap(response => {
        console.log('User info fetched:', response);  
      }),
      catchError(this.handleError)
    );
  }

  // Méthode pour mettre à jour les informations de l'utilisateur
  updateUser(data: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    email?: string;
  }): Observable<any> {
    const { email, ...updateData } = data;
  
    const token = this.getToken();
    if (!token) {
      return throwError('Token not found');
    }
  
    return this.getUserInfo().pipe(
      switchMap(userInfo => {
        console.log('User info in updateUser:', userInfo); // Vérification de l'info utilisateur
  
        const userId = userInfo.uid; // Utiliser 'uid' ici au lieu de 'id'
  
        if (!userId) {
          return throwError('User ID not found');
        }
  
        const url = `${this.apiUrlUpdateUser}/${userId}`;
        return this.http.patch<any>(url, updateData, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).pipe(
          tap(response => {
            // Mettre à jour les valeurs dans localStorage
            if (updateData.firstName) {
              localStorage.setItem('user_firstName', updateData.firstName);
            }
            if (updateData.lastName) {
              localStorage.setItem('user_lastName', updateData.lastName);
            }
            if (updateData.phoneNumber) {
              localStorage.setItem('user_phoneNumber', updateData.phoneNumber);
            }
            if (updateData.address) {
              localStorage.setItem('user_address', updateData.address);
            }
          }),
          catchError(this.handleError)
        );
      })
    );
  }
  

  // Gestion centralisée des erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);  // Retourner l'erreur
  }
}
