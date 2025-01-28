import { Component, OnInit } from '@angular/core';
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
export class ChatboxComponent implements OnInit {
  conversations: any[] = [];
  currentConversation: any[] = [];
  userMessage: string = '';
  isLoading: boolean = false;
  userFirstName: string = '';

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

  loadConversation(index: number) {
    this.currentConversation = this.conversations[index].messages;
  }

  newConversation() {
    this.currentConversation = [];
    this.conversations.push({ messages: [] });
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.currentConversation.push({ text: this.userMessage, sender: 'user' });
      this.isLoading = true;
  
      this.chatbotService.generateResponse(this.userMessage).subscribe(
        (response) => {
          const formattedResponse = response.response.replace(/\\n/g, '\n');
          this.currentConversation.push({ text: formattedResponse, sender: 'ai' });
          this.userMessage = '';
          console.log('Champ réinitialisé:', this.userMessage); // Vérification
          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors de la génération de la réponse', error);
          this.isLoading = false;
        }
      );
    }
  }
  
  sendWelcomeMessage() {
    const welcomeMessage = `Bonjour ${this.userFirstName}, comment puis-je t'aider ?`;
    this.currentConversation.push({ text: welcomeMessage, sender: 'ai' });
  }
}