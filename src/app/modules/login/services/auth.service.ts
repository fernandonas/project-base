import { Injectable } from '@angular/core';
import { IUserRequest, IUserResponse } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { environment } from '../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { catchError, map, Observable, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userResponse?: IUserResponse;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    this.loadUserFromLocalStorage();
  }

  private loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      this.userResponse = JSON.parse(storedUser) as IUserResponse;
      this.userService.setUser(this.userResponse);
    }
  }

  login(userRequest: IUserRequest): Observable<IUserResponse | null> {
    return this.httpClient.post<IUserResponse>(`${environment.baseUrl}/api/User/login`, userRequest)
      .pipe(
        take(1),
        map(userResponse => {
          this.userResponse = userResponse;
          localStorage.setItem("User", JSON.stringify(userResponse));
          this.userService.setUser(userResponse);
          this.router.navigate(['/']);
          return userResponse;
        }),
        catchError(() => {
          this.logout();
          return of(null);
        })
      );
  }

  logout(): void {
    this.userResponse = undefined;
    localStorage.removeItem("User");
    this.userService.setUser(undefined);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return Boolean(this.getToken()) && !this.isTokenExpired();
  }

  getToken(): string | undefined {
    return this.userResponse?.token;
  }

  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return exp < Math.floor(Date.now() / 1000);
    } catch {
      return true;
    }
  }
}
