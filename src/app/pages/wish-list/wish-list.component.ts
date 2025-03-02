import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { IWishlist } from '../../shared/interfaces/iwishlist';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  wishListDetails!: IWishlist[];

  ngOnInit(): void {
    this.getWishListData();
  }
  getWishListData(): void {
    this._WishlistService.getUserWishList().subscribe({
      next: (res) => {
        // console.log(res.data);

        this.wishListDetails = res.data;
        // for (let index = 0; index < this.wishListDetails.length; index++) {
        //   console.log(this.wishListDetails[index]);
        // }
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeItem(id: string): void {
    this._WishlistService.removeSpecificWishListItem(id).subscribe({
      next: (res) => {
        this.wishListDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {},
      error: (err) => {
        console.log(err);
      },
    });
  }
}
