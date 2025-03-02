import { Component, inject, input, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishService = inject(WishlistService);
  countNumber: number = 0;
  wishCountNumber: number = 0;

  ngOnInit(): void {
    //  this.countNumber = this.cartService.cartNumber.getValue();
    this.cartService.cartNumber.subscribe({
      next: (data) => {
        this.countNumber = data;
        this.cartService.getUserCart().subscribe({
          next: (res) => {
            this.cartService.cartNumber.next(res.numOfCartItems);
          },
        });
      },
    });
    this.wishService.wishNumber.subscribe({
      next: (data) => {
        this.wishCountNumber = data;
        this.wishService.getUserWishList().subscribe({
          next: (res) => {
            console.log(res)
            this.wishService.wishNumber.next(res.count);
          },
        });
      },
    });
  }

  logOutB(): void {
    this.authService.logOut();
  }

  isLogin = input<boolean>(true);
}
