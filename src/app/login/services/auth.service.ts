import { Injectable } from '@angular/core';
import { IUserRequest, IUserResponse } from '../dtos/user.dto';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: IUserResponse | undefined;
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly userService: UserService,
  ) { this.getUserFromLocalStorage() }

  getUserFromLocalStorage(): void {
    const user = localStorage.getItem("User")
    if (user) {
      this.user = JSON.parse(user);
      this.userService.setUser(this.user!)
    }
  }

  getUsers(): void {
    this.httpClient.get(`${environment.baseUrl}/api/User`).subscribe({
      next: (user) => {
        console.log(user)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  login(user: IUserRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${environment.baseUrl}/api/User/login`, {
        password: user.password,
        email: user.email
      }).subscribe({
        next: (user: any) => {
          this.user = user
          this.router.navigate(['/']);
          localStorage.setItem("User", JSON.stringify(this.user));
          this.userService.setUser(this.user)
          resolve()
        },
        error: () => {
          this.user = undefined;
          localStorage.removeItem("User");
          this.userService.setUser(undefined)
          reject();
        }
      })
    })
  }

  logout(): void {
    localStorage.removeItem("User");
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.user?.token != undefined;
  }
}