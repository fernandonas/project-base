import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../app/login/services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private readonly authService: AuthService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.user?.token) {
      return true;
    }
    this.authService.logout();
    return false;
  }
}