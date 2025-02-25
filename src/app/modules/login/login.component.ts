import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private readonly authService: AuthService
  ) { }  

  async onSubmit() {
    if (this.loginData.email && this.loginData.password) {      
      try {
        await firstValueFrom(this.authService.login(this.loginData));
      } catch {
        alert('Usuário e/ou senha inválido.');
      }
    } else {
      alert('Preencha todos os campos corretamente.');
    }
  }

}
