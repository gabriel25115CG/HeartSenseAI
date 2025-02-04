import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { AuthService } from '../../services/auth.service';
import { Navbar2Component } from '../../components/navbar2/navbar2.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-contact',
  imports: [ContactFormComponent, NavbarComponent, FooterComponent, CommonModule, Navbar2Component],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}