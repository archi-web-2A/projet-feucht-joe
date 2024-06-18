import { Injectable } from '@angular/core';
import { User } from "../../shared/models/user";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post(environment.backendClient + '/register', user);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(environment.backendClient + '/currentUser');
  }
}
