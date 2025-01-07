import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FaqtextComponent } from '../../components/faqtext/faqtext.component';

@Component({
  selector: 'app-faq',
  imports: [NavbarComponent, FooterComponent, FaqtextComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

}
