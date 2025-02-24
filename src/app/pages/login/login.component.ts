import { Message } from './../../../../node_modules/esbuild/lib/main.d';
import { error } from './../../../../node_modules/ajv/lib/vocabularies/applicator/dependencies';
import { FsaNodeWorkerMsgResponseError } from './../../../../node_modules/memfs/lib/fsa-to-node/worker/types.d';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

// private readonly authService = inject(AuthService);
//   private readonly router = inject(Router);

//   loginForm: FormGroup = new FormGroup(
//     {
     
//       password: new FormControl(null, [
//         Validators.required,
//         Validators.pattern(/^[A-z]\w{7,}$/),
//       ]),
//       email: new FormControl(null, [Validators.required, Validators.email]),
    
//     },
  
//   );

//   msgError: string = '';
//   success: string = '';

//   submitForm(): void {
//     this.authService.sendLoginForm(this.loginForm.value).subscribe({
//       next: (res) => {
//         if (res.message === 'success') {
//           setTimeout(() => {
//             this.router.navigate(['/home']);
//           }, 500);


//           this.success = res.message;
//         }
//       },
//       error: (err:HttpErrorResponse) => {
//         this.msgError = err.error.message;
//       },
//     });
//   }

}
