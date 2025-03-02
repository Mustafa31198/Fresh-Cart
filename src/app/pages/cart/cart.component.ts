import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);

  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        console.log(res.data)
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeItem(id: string): void {
    this._CartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateQuantity(id: string, newCount: number): void {
    this._CartService.updateProductQuantity(id, newCount).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearCart(): void {
    this._CartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);

        if (res.status == 'success') {
          this.cartDetails = {} as ICart;
          this._CartService.cartNumber.next(0);
        }
      },
    });
    
  }
}
