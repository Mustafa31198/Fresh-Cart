import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  step: number = 1;

  Verifyemail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  Verifycode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required , Validators.pattern(/^[0-9]{6}$/)
    ]),
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required , Validators.pattern(/^\w{5,}$/)
    ]),
  });

  VerifyEmailSubmit(): void {
    this._AuthService.setEmailVerify(this.Verifyemail.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  VerifycodeSubmit(): void {
    this._AuthService.setCodeVerify(this.Verifycode.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  resetPassSubmit(): void {
    this._AuthService.setResetPass(this.resetPassword.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData();
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
