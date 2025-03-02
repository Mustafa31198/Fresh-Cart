import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckoutService } from '../../core/services/checkout/checkout.service';
import { CartService } from '../../core/services/cart/cart.service';

interface OnlinePayment {
  Session: any;
  status: string;
  session: Session;
}
interface Session {
  url: string;
  success_url: string;
  cancel_url: string;
}

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  submitForm!: FormGroup;
  selectedMethod: string = '';
  currentId!: string;
  fb = inject(FormBuilder);
  checkoutService = inject(CheckoutService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  private readonly _CartService = inject(CartService);

  ngOnInit(): void {
    this.getCurrentId();
    this.initForm();
  }
  getCurrentId(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.currentId = res.cartId;
        console.log(res);
      },
    });
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.currentId = res.get('id')!;
      },
    });
  }
  onSubmitForm(selectedMethod: string): void {
    if (selectedMethod === 'online') {
      this.onLinePayment();
    } else {
      this.cashPayment();
    }
  }

  initForm(): void {
    this.submitForm = this.fb.group({
      details: ['details', [Validators.required]],
      phone: ['01010700999', [Validators.required]],
      city: ['Cairo', [Validators.required]],
    });
  }
  onLinePayment(): void {
    this.checkoutService
      .onlinePayment(this.currentId, this.submitForm.value)
      .subscribe({
        next: (res: OnlinePayment) => {
          console.log(res.session.url);

          // window.location.assign(res.session.url);
        },
      });
  }
  cashPayment(): void {
    this.checkoutService
      .cashPayment(this.currentId, this.submitForm.value)
      .subscribe({
        next: (res: OnlinePayment) => {
          this.router.navigate(['/home']);
        },
      });
  }
}
