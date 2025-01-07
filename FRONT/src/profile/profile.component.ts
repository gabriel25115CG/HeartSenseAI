import { Component } from '@angular/core';
import { Navbar2Component } from "../components/navbar2/navbar2.component";
import { ProfilepageComponent } from "../components/profilepage/profilepage.component";
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-profile',
  imports: [Navbar2Component, ProfilepageComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
