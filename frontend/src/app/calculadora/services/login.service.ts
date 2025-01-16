import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importando HttpClient
import { Observable } from 'rxjs';  // Importando Observable

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://172.28.32.1:44665/login', { username, password });
  }
}
