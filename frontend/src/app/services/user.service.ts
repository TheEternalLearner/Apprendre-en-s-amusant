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
  
  getUsers(): Observable <User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  
}
