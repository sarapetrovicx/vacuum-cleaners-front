import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {

    if(this.authService.canUpdate()){
      return true;
    }

    alert("You don't have editing permission.");
    this.router.navigate(['all']);
    return false;
  }
}
