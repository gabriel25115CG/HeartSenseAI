import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { NotfoundformComponent } from "../../components/notfoundform/notfoundform.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-error',
  imports: [NavbarComponent, NotfoundformComponent, FooterComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

}
