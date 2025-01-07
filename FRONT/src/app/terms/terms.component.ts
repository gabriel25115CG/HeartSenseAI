import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TermstextComponent } from '../../components/termstext/termstext.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-terms',
  imports: [NavbarComponent, TermstextComponent, FooterComponent],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css'
})
export class TermsComponent {

}
