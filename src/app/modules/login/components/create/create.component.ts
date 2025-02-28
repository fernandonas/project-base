import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUserRequest } from '../../models/user.model';
import { take } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [NzNotificationService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.less'
})
export class CreateComponent {
  userRequest: IUserRequest = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private nzNotificationService: NzNotificationService
  ) { }

  onSubmit() {
    this.userService.addUser(this.userRequest)
      .pipe(
        take(1))
      .subscribe(() => {
        this.nzNotificationService.success('Cadastrado com sucesso!', '');
        this.router.navigate(['/login'])
      })
  }
}
