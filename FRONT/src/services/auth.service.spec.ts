import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.heartsense.fr/api/auth/signup';

  constructor(private http: HttpClient) {}

  // Définition correcte de la méthode register
  register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
  }): Observable<{ uid: string; email: string }> {
    return this.http.post<{ uid: string; email: string }>(this.apiUrl, data);
  }
}
