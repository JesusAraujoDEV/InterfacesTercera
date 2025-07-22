import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile(token: string): Observable<any> {
    return this.http.get(`${environment.BACKEND_URL}/api/profile`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  getUserStatus(userId: string, token: string): Observable<any> {
    return this.http.get(`${environment.BACKEND_URL}/api/block/status/${userId}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}
