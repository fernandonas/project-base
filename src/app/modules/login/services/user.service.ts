import { Injectable } from '@angular/core';
import { IUserRequest, IUserResponse } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUserResponse | undefined

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  setUser(user: IUserResponse | undefined): void {
    this.user = user;
  }

  getUser(): IUserResponse | undefined {
    return this.user;
  }

  addUser(user: IUserRequest): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/api/User`, user);
  }

  getUsers(): Observable<IUserResponse[]> {
    return this.httpClient.get<[]>(`${environment.baseUrl}/api/User`);
  }
}
