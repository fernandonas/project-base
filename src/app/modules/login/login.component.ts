import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { firstValueFrom } from 'rxjs';
import { IUserRequest } from './models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  userRequest: IUserRequest = {
    email: '',
    password: ''
  };

  constructor(
    private readonly authService: AuthService
  ) { }

  async onSubmit() {
    if (this.userRequest.email && this.userRequest.password) {
      try {
        await firstValueFrom(this.authService.login(this.userRequest));
      } catch {
        alert('Usuário e/ou senha inválido.');
      }
    } else {
      alert('Preencha todos os campos corretamente.');
    }
  }
}
