import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService { 
  private apiUrl = 'http://localhost:8080/api/users'; 
  http = inject(HttpClient);
  
  createUser(user: User): Observable <User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  
  getUsers(): Observable <User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
  
}
