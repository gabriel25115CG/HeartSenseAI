import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RegisterFormComponent } from '../../components/registerform/registerform.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';  // Importez HttpClientModule ici
import { AuthService } from '../../services/auth.service';  // Importez AuthService ici

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, RegisterFormComponent, FooterComponent, HttpClientModule],  // Ajoutez HttpClientModule ici
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {}
