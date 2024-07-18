import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorMessage } from 'src/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  private baseUrl = 'http://localhost:8080/api/errors/all'; // Your backend API base URL

  constructor(private httpClient: HttpClient) {
  }

  
  getErrors(authToken: string): Observable<ErrorMessage[]> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    return this.httpClient.get<ErrorMessage[]>(this.baseUrl, { headers: headers });

  }

}
