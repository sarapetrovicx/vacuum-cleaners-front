import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: AuthService) {}

  canActivate(): boolean {

    if (this.service.isLoggedIn() && this.service.canRead()) {
      return true;
    } else {
      alert("Bad credentials or bad permissions.");
      this.router.navigate(['/login']);
      return false;
    }
  }
}