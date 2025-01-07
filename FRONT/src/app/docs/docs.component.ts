import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DocspageComponent } from '../../components/docspage/docspage.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-docs',
  imports: [NavbarComponent, FooterComponent, DocspageComponent],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.css',
  standalone: true
})
export class DocsComponent {

}