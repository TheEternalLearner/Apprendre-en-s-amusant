import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from "@angular/forms";
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  user !: User;

  ngOnInit(): void {
      
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.user = new User(0, "", "", "", "", 'USER');
      this.userService.getUserById(+id).subscribe({
        next: (user) => {
          this.user = user;
        },
        error: () => { 
          this.snackBar.open('Erreur lors du chargement de l\'utilisateur', 'OK',  {
            duration: 3000, panelClass: ['snack-error']
          })
        }
        
      });
    } else {
      this.user = new User(0, "", "", "", "", 'USER');
    }
  }

  onSubmit(form:NgForm) {
    if(form.invalid) {
      this.snackBar.open('Veuillez remplir tous les champs correctement.', 'OK', {
        duration: 3000,
        panelClass: ['snack-error']
      });
      return;
    }
    if (this.user.id) {
      this.userService.editUser(this.user).subscribe({
      next: () => {
        this.router.navigate(["admin/utilisateurs"])
        this.snackBar.open('Utilisateur modifié avec succès', 'OK', {
          duration: 3000, panelClass: ['snack-success']
        })
      },
      error: () => {
        this.snackBar.open('Erreur lors de l\'édition d\'utilisateur', 'OK', {
          duration: 3000, panelClass: ['snack-error']
        })
      }
    });
    } else {
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
