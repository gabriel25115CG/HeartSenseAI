import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface ApiResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  done_reason: string;
  context: number[];
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  // URL de l'API locale
  private apiUrl = 'http://localhost:3001/api/generate';

  constructor(private http: HttpClient) { }

  /**
   * Génère une réponse du chatbot en envoyant un prompt à l'API.
   * @param prompt Le texte de l'utilisateur à envoyer à l'API.
   * @param model Le modèle à utiliser, par défaut 'toto'.
   * @param stream Si la réponse doit être envoyée en streaming, par défaut 'false'.
   * @returns Observable contenant la réponse de l'API.
   */
  generateResponse(prompt: string, model: string = 'llama3.2', stream: boolean = false): Observable<ApiResponse> {
    // Corps de la requête
    const body = { model, prompt, stream };
    
    // En-têtes HTTP
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Requête POST à l'API avec gestion des erreurs
    return this.http.post<ApiResponse>(this.apiUrl, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Gère les erreurs HTTP en retournant un message d'erreur personnalisé.
   * @param error L'erreur retournée par l'API.
   * @returns Observable d'erreur avec un message d'erreur personnalisé.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    // Vérification de l'origine de l'erreur (réseau ou serveur)
    if (error.error instanceof ErrorEvent) {
      // Erreur réseau ou autre erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur HTTP côté serveur
      errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
    }

    console.error(errorMessage);  // Log des erreurs
    return throwError(() => new Error(errorMessage));  // Retourner une erreur observable
  }
}
