import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string = localStorage.getItem('authToken') || '';
  helper = new JwtHelperService();

  constructor() { }

  private loggedIn = false;

  login(jwt:string) {
    this.loggedIn = true;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  canPerformAction(action: string): boolean {
    try {
      const decodedToken = this.helper.decodeToken(this.token);
  
      if (decodedToken && decodedToken.permissions) {
        const permissions: string = decodedToken.permissions.toLowerCase();
  
        if (permissions.includes(action.toLowerCase())) {
          return true;
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return false;
  }
  
  canCreate(): boolean {
    return this.canPerformAction('can_create_users');
  }
  
  canRead(): boolean {
    return this.canPerformAction('can_read_users');
  }
  
  canUpdate(): boolean {
    return this.canPerformAction('can_update_users');
  }
  
  canDelete(): boolean {
    return this.canPerformAction('can_delete_users');
  }

  ///// VACUUM ACTIONS

  canSearch(): boolean {
    return this.canPerformAction('can_search_users');
  }

  canStart(): boolean {
    return this.canPerformAction('can_start_users');
  }
  
  canStop(): boolean {
    return this.canPerformAction('can_stop_users');
  }
  
  canDischarge(): boolean {
    return this.canPerformAction('can_discharge_users');
  }

  canRemove(): boolean {
    return this.canPerformAction('can_remove_users');
  }
  
  canAdd(): boolean {
    return this.canPerformAction('can_add_users');
  }

}
