import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FaqtextComponent } from '../../components/faqtext/faqtext.component';
import { CommonModule } from '@angular/common';
import { Navbar2Component } from '../../components/navbar2/navbar2.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-faq',
  imports: [NavbarComponent, FooterComponent, FaqtextComponent, CommonModule, Navbar2Component],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}