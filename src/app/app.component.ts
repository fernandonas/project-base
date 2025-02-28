import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './modules/login/services/auth.service';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, NzButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  
  constructor(private readonly authService: AuthService) { }

  get isAuthenticated(): boolean{
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}
