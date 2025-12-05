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
    if (this.user.id) {
      // TODO if user has id i.e exist apply editUser method
    } else {
      this.router.navigate(["/admin/utilisateurs"]);
      this.userService.createUser(this.user).subscribe({
        next: () => {
          this.router.navigate(['admin/utilisateurs']);
          this.snackBar.open('Utilisateur créé avec succès', 'OK', {
            duration: 3000,
            panelClass: ['snack-success']
          });
        },
        error: () => {
          this.snackBar.open('Erreur lors de la création de l\'utilisateur', 'OK', {
            duration: 3000,
            panelClass: ['snack-error']
          });
        }
      });
    }
  }
}
