import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { firstValueFrom } from 'rxjs';
import { IUserRequest } from './models/user.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, NzButtonModule],
  providers: [NzNotificationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  loading = false;
  userRequest: IUserRequest = {
    email: '',
    password: ''
  };

  constructor(
    private readonly authService: AuthService,
    private nzNotificationService: NzNotificationService
  ) { }

  async onSubmit() {

    if (this.userRequest.email && this.userRequest.password) {
      this.loading = true;
      const response = await firstValueFrom(this.authService.login(this.userRequest));
      if (!response) {
        this.nzNotificationService.error('Usuário e/ou senha inválido.', '');
      } else {
        this.nzNotificationService.success('Bem vindo!', response.name);
      }
      this.loading = false;
    } else {
      this.nzNotificationService.warning('Preencha todos os campos corretamente.', '');
    }
  }
}
