import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { PrivacyformComponent } from '../../components/privacyform/privacyform.component';
import { AuthService } from '../../services/auth.service';
import { Navbar2Component } from '../../components/navbar2/navbar2.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  imports: [NavbarComponent, FooterComponent, PrivacyformComponent, CommonModule, Navbar2Component],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})

export class PrivacyComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}