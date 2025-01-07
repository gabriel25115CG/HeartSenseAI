import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterFormComponent {
  formData = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.formData).subscribe(response => {
      console.log('Registration successful', response);
    }, error => {
      console.error('Registration failed', error);
    });
  }


}