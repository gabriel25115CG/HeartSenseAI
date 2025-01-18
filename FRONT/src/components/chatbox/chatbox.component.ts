import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { AuthService } from '../../services/auth.service';  // Import du service d'authentification
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  messages: any[] = [];
  userMessage: string = '';
  isLoading: boolean = false;
  userFirstName: string = '';  // Variable pour stocker le prénom de l'utilisateur

  constructor(
    private chatbotService: ChatbotService,
    private authService: AuthService  // Injecter le service AuthService
  ) {}

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur à l'initialisation du composant
    this.authService.getUserInfo().subscribe(
      (userInfo) => {
        this.userFirstName = userInfo.firstName || 'Utilisateur';  // Récupérer le prénom de l'utilisateur
        this.sendWelcomeMessage();  // Envoyer un message de bienvenue de l'IA
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
      }
    );
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, sender: 'user' });
      this.isLoading = true;

      this.chatbotService.generateResponse(this.userMessage).subscribe(
        (response) => {
          this.messages.push({ text: response.response, sender: 'ai' });
          this.userMessage = '';
          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors de la génération de la réponse', error);
          this.isLoading = false;
        }
      );
    }
  }

  // Méthode pour envoyer le message de bienvenue
  sendWelcomeMessage() {
    const welcomeMessage = `Bonjour ${this.userFirstName}, comment puis-je t'aider ?`;
    this.messages.push({ text: welcomeMessage, sender: 'ai' });
  }
}
