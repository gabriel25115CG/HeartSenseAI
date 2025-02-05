import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';
import { DomSanitizer } from '@angular/platform-browser'; 
import DOMPurify from 'dompurify';


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

  @ViewChild('messagesContainer') private messagesContainer: any;

  constructor(
    private chatbotService: ChatbotService,
    private authService: AuthService,
    private sanitizer: DomSanitizer  
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

  async sendMessage() {
  if (this.userMessage.trim()) {
    // Ajout du message utilisateur dans la conversation
    this.currentConversation.push({ text: this.userMessage, sender: 'user' });
    this.isLoading = true;

    this.chatbotService.generateResponse(this.userMessage).subscribe(
      async (response) => { 

        const rawHtml = await marked(response.response, { breaks: true });
        const formattedHtml = rawHtml.replace(/\n/g, '<br />');

        // Sécuriser le contenu HTML
        const sanitizedHtml = DOMPurify.sanitize(formattedHtml);

        // Ajouter la réponse de l'IA à la conversation
        this.currentConversation.push({ text: sanitizedHtml, sender: 'ai' });
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

  
  async sendWelcomeMessage() {
    // Message de bienvenue avec le prénom de l'utilisateur
    const welcomeMessage = `Bonjour ${this.userFirstName}, comment puis-je t'aider ?`;
    const rawHtml = await marked(welcomeMessage, { breaks: true }); // Conversion du markdown
    const sanitizedMessage = this.sanitizer.bypassSecurityTrustHtml(rawHtml); // Sécurisation avec DomSanitizer
    
    // Ajouter le message de bienvenue à la conversation
    this.currentConversation.push({ text: sanitizedMessage, sender: 'ai' });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      // Scroller la vue vers le bas à chaque nouvel ajout de message
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}
