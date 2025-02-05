import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardsComponent } from "../../components/cards/cards.component";
import { TitleComponent } from '../../components/title/title.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { SeparatorComponent } from '../../components/separator/separator.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { CitationComponent } from "../../components/citation/citation.component";
import { Navbar2Component } from '../../components/navbar2/navbar2.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CardsComponent, TitleComponent, FooterComponent, SeparatorComponent, FeaturesComponent, CitationComponent, Navbar2Component, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}