import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  productDetails: IProduct = {} as IProduct;
  countNumber: number=0;

  ngOnInit(): void {
    this.cartService.cartNumber.subscribe({
      next: (data) => {
        this.countNumber = data;
      },
    });

    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let productId = p.get('id');

        this.productsService.getSpecificProducts(productId).subscribe({
          next: (res) => {
            this.productDetails=res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
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
}
