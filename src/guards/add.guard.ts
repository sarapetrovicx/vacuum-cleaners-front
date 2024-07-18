import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {

    if(this.authService.canAdd()){
      return true;
    }
    alert("You don't have adding permission.");
    this.router.navigate(['all']);
    return false;
  }
}
