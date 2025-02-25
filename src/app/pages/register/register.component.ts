
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/AuthService';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-z]\w{5,}$/),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  msgError: string = '';
  success: string = '';

  submitForm(): void {
    this.authService.sendRegisterForm(this.registerForm.value).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 500);

          this.success = res.message;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.msgError = err.error.message;
      },
    });
  }

  confirmPassword(g: AbstractControl) {
    const password = g.get('password')?.value;
    const rePassword = g.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }
}
