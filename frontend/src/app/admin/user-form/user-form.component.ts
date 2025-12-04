import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from "@angular/forms";
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  user !: User;

  onSubmit(form:NgForm) {
    if(form.invalid) {
      this.snackBar.open('Veuillez remplir tous les champs correctement.', 'OK', {
        duration: 3000,
        panelClass: ['snack-error']
      });
      return;
    }
    this.router.navigate("/admin/utilisateurs");
  }
}
