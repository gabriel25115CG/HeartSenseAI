import { Component } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service'; // Assurez-vous que le chemin est correct
import { FormsModule } from '@angular/forms';  // Pour le binding [(ngModel)]
import { CommonModule } from '@angular/common';  // Nécessaire pour l'utilisation de *ngFor

@Component({
  selector: 'app-chatbox',
  standalone: true,  // Si vous utilisez Angular 14 ou plus
  imports: [CommonModule, FormsModule],  // Ajouter les modules nécessaires
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent {
  messages: any[] = []; // Tableau pour stocker les messages de l'utilisateur et de l'AI
  userMessage: string = ''; // Message de l'utilisateur à envoyer

  constructor(private chatbotService: ChatbotService) {}


  
  // Fonction pour envoyer le message
  sendMessage() {
    if (this.userMessage.trim()) {
      // Ajouter le message de l'utilisateur à la liste des messages
      this.messages.push({ text: this.userMessage, sender: 'user' });

      // Appeler le service pour générer une réponse
      this.chatbotService.generateResponse(this.userMessage).subscribe(
        (response) => {
          // Ajouter la réponse de l'AI à la liste des messages
          this.messages.push({ text: response.response, sender: 'ai' });
          this.userMessage = '';  // Réinitialiser le champ de saisie après envoi
        },
        (error) => {
          console.error('Erreur lors de la génération de la réponse', error);
        }
      );
    }
  }
}
