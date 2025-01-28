import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit, AfterViewChecked {
  conversations: any[] = [];
  currentConversation: any[] = [];
  userMessage: string = '';
  isLoading: boolean = false;
  userFirstName: string = '';

  // Référence à l'élément de conteneur des messages
  @ViewChild('messagesContainer') private messagesContainer: any;

  constructor(
    private chatbotService: ChatbotService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (userInfo) => {
        this.userFirstName = userInfo.firstName || 'Utilisateur';
        this.sendWelcomeMessage();
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
    this.currentConversation = [];
    this.conversations.push({ messages: [] });
  }

  // Envoyer un message
  sendMessage() {
    if (this.userMessage.trim()) {
      this.currentConversation.push({ text: this.userMessage, sender: 'user' });
      this.isLoading = true; // Démarrer le chargement
  
      this.chatbotService.generateResponse(this.userMessage).subscribe(
        (response) => {
          const formattedResponse = response.response.replace(/\\n/g, '\n');
          this.currentConversation.push({ text: formattedResponse, sender: 'ai' });
          this.userMessage = '';
          this.isLoading = false; // Arrêter le chargement
        },
        (error) => {
          console.error('Erreur lors de la génération de la réponse', error);
          this.isLoading = false; // Arrêter le chargement en cas d'erreur
        }
      );
    }
  }

  // Message de bienvenue
  sendWelcomeMessage() {
    const welcomeMessage = `Bonjour ${this.userFirstName}, comment puis-je t'aider ?`;
    this.currentConversation.push({ text: welcomeMessage, sender: 'ai' });
  }

  // Faire défiler le conteneur vers le bas après chaque mise à jour
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  // Fonction pour faire défiler vers le bas
  private scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}
