import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { LoginResponse, User } from 'src/model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) {
  }


  login(email: string, password:string): Observable<LoginResponse> {
    const url = `http://localhost:8080/auth/login`;

    const body = {
      email: email,
      password: password
    };

    return this.httpClient.post<LoginResponse>(url, body);
  }

  getUsers(authToken: string): Observable<User[]> {
    const url = `http://localhost:8080/api/users/all`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.httpClient.get<User[]>(url, { headers: headers });

  }


  addUser(user: User, authToken: string): Observable<string> {
    const url = `http://localhost:8080/api/users`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.httpClient.post<string>(url, user, { headers: headers });
  }

  editUser(user: User, authToken: string): Observable<string> {
    const url = `http://localhost:8080/api/users`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.httpClient.put<string>(url, user, { headers: headers });
  }

  getUserById(id:string, authToken: string): Observable<User> {
    const url = `http://localhost:8080/api/users?userId=${id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.httpClient.get<User>(url, { headers: headers });

  }

  deleteUser(id:string, authToken: string): Observable<string> {
    const url = `http://localhost:8080/api/users/${id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.httpClient.delete<string>(url, { headers: headers });

  }
}
