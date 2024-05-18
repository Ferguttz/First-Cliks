import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AuthenticationRequestDto } from '../../../../services/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  singup = '/auth/signup';

  private authService = inject(AuthService);
  private router = inject(Router);

  authRequest: AuthenticationRequestDto = {
    userName: '',
    password: '',
  };

  errors: string[] = [];

  login(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.authService.login(this.authRequest).subscribe({
      next: (profile) => {
        this.router.navigate(['']);
      },
      error: (error) => {
        if (error.error.errorCode) {
          this.errors.push('Error en el email o contraseña');
        }
      },
    });
  }
}
