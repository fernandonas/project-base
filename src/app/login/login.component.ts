import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule ],
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
      console.log('Dados do formulário:', this.loginData);
      await this.authService.login({
        email: this.loginData.email,
        password: this.loginData.password
      }).catch(() => {
        alert('Usuário e ou senha inválido.');
      });
    } else {
      alert('Preencha todos os campos corretamente.');
    }
  }

}
