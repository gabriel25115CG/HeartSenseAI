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
  conversations: any[] = []; // Historique des conversations
  currentConversation: any[] = []; // Conversation actuellement sélectionnée
  userMessage: string = '';
  isLoading: boolean = false;
  userFirstName: string = '';  // Variable pour stocker le prénom de l'utilisateur

  constructor(
    private chatbotService: ChatbotService,
    private authService: AuthService  // Injecter le service AuthService
  ) {}

  ngOnInit(): void {
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

  // Charger une conversation existante
  loadConversation(index: number) {
    this.currentConversation = this.conversations[index].messages;
  }

  // Créer une nouvelle conversation
  newConversation() {
    this.currentConversation = []; // Réinitialiser la conversation active
    this.conversations.push({ messages: [] }); // Ajouter une nouvelle conversation vide
  }

  // Fonction pour envoyer un message
  sendMessage() {
    if (this.userMessage.trim()) {
      this.currentConversation.push({ text: this.userMessage, sender: 'user' });
      this.isLoading = true;

      this.chatbotService.generateResponse(this.userMessage).subscribe(
        (response) => {
          this.currentConversation.push({ text: response.response, sender: 'ai' });
          this.userMessage = '';  // Réinitialiser le champ de saisie
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
    this.currentConversation.push({ text: welcomeMessage, sender: 'ai' });
  }
}
