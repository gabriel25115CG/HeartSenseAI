import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définir une interface pour la réponse de l'API
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
  private apiUrl = 'http://localhost:3001/api/generate'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  generateResponse(prompt: string, model: string = 'llama3.2', stream: boolean = false): Observable<ApiResponse> {
    const body = {
      model: model,
      prompt: prompt,
      stream: stream
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ApiResponse>(this.apiUrl, body, { headers });
  }
}
