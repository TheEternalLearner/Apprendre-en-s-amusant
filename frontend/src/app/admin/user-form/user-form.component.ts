import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  private userService = inject(UserService);
  onSubmit() {

  }
}
