import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { VacuumCleaner, VacuumRequest } from 'src/model';

@Injectable({
  providedIn: 'root'
})
export class VacuumService {
  private baseUrl = 'http://localhost:8080/api/vacuums'; // Your backend API base URL

  constructor(private httpClient: HttpClient) {
  }


  searchVacuums(name: string, status: string, dateFrom: string, dateTo: string, authToken: string): Observable<VacuumCleaner[]> {
    let url = `${this.baseUrl}/search?`;

    if (name) {
      url += `name=${name}&`;
    }
    if (status && status.length > 0) {
      url += `status=${status}&`;
    }
    if (dateFrom) {
      url += `dateFrom=${dateFrom}&`;
    }
    if (dateTo) {
      url += `dateTo=${dateTo}&`;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    return this.httpClient.get<VacuumCleaner[]>(url, {headers: headers});
  }

  add(vacuum: VacuumRequest, authToken: string): Observable<string> {
    const url = `${this.baseUrl}/add`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.httpClient.post<string>(url, vacuum, { headers: headers });
  }


  start(id: string, authToken: string): Observable<string> {
    const url = `${this.baseUrl}/start/${id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    console.log(authToken);

    return this.httpClient.post<string>(url, null, { headers: headers });

  }

  stop(id: string, authToken: string): Observable<string> {
    const url = `${this.baseUrl}/stop/${id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.httpClient.post<string>(url, null, { headers: headers });
  }

  discharge(id: string, authToken: string): Observable<string> {
    const url = `${this.baseUrl}/discharge/${id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.httpClient.post<string>(url, null, { headers: headers });
  }

  remove(id: string, authToken: string): Observable<string> {
    const url = `${this.baseUrl}/remove/${id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.httpClient.post<string>(url, null, { headers: headers });
  }
}
