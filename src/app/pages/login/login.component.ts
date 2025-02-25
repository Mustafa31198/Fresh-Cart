import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/AuthService';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-z]\w{5,}$/),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  msgError: string = '';
  success: string = '';

  submitForm(): void {
    this.authService.sendLoginForm(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          setTimeout(() => {
            localStorage.setItem('userToken', res.token);
            // this.authService.saveUserData();
            this.router.navigate(['/home']);
          }, 500);

          this.success = res.message;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.msgError = err.error.message;
      },
    });
  }
}
