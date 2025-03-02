import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
   private readonly cartService = inject(CartService);
    private readonly wishlistService = inject(WishlistService);
  products: IProduct[] = [];
  countNumber: number=0;


  
  ngOnInit(): void {

    this.cartService.cartNumber.subscribe({
      next: (data) => {
        this.countNumber = data;
      },
    });

    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  addToCart(id: string): void {
    this.cartService.addToCart(id).subscribe({
      next:(res)=>{
        this.cartService.cartNumber.next(res.numOfCartItems)        

      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
  addToWishList(id: string): void {
    this.wishlistService.addToWishList(id).subscribe({
      next:(res)=>{
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
