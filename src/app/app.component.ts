import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './login/services/user.service';
import { IUserResponse } from './login/dtos/user.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  users: IUserResponse[] = [];
  title = 'project-base';
  constructor(
    private readonly userService: UserService
  ) { }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }
}
