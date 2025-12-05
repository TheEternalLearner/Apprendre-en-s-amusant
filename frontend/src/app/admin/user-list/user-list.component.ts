import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class AdminUserListComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  users: User[] = [];

  ngOnInit(): void {
      this.userService.getUsers().subscribe({
        next: (users) => this.users = users,
        error: (error) => console.log("Error while loading users", error)
      }
      )
  }

  onCreate() {
    this.router.navigate(["/admin/utilisateurs/nouveau"]);
  }

}
