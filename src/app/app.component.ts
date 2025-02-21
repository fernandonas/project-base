import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from './modules/login/services/user.service';
import { IUserResponse } from './modules/login/models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  users: IUserResponse[] = [];
  constructor(
    private readonly userService: UserService
  ) { }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }
}
