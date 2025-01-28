import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { PrivacyformComponent } from '../../components/privacyform/privacyform.component';

@Component({
  selector: 'app-privacy',
  imports: [NavbarComponent, FooterComponent, PrivacyformComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent {

}
