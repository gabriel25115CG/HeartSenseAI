import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DocspageComponent } from '../../components/docspage/docspage.component';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Navbar2Component } from '../../components/navbar2/navbar2.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-docs',
  imports: [NavbarComponent, FooterComponent, DocspageComponent, CommonModule, Navbar2Component],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.css',
  standalone: true
})

export class DocsComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}