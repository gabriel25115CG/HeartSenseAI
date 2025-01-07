import { Component } from '@angular/core';
import { Navbar2Component } from "../../components/navbar2/navbar2.component";
import { ChatboxComponent } from "../../components/chatbox/chatbox.component";

@Component({
  selector: 'app-chat',
  imports: [Navbar2Component, ChatboxComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
