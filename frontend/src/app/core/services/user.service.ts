import { Injectable } from '@angular/core';
import { User } from "../../shared/models/user";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(environment.backendClient + '/register', user).pipe(
      tap(response => {
        const token = response.accessToken;
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    )
  }

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(environment.backendClient + '/login', credentials).pipe(
      tap(response => {
        const token = response.accessToken;
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    )
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(environment.backendClient + '/currentUser');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
