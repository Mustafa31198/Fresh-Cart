import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { count } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private readonly _HttpClient = inject(HttpClient);

   cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  myToken: any = localStorage.getItem('userToken');

  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: {
          token: this.myToken,
        },
      }
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: this.myToken,
      },
    });
  }
  removeSpecificCartItem(id:string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: {
        token: this.myToken,
      },
    });
  }
  updateProductQuantity(id:string , newCount:number): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
"count": newCount
    }
    ,{
      headers: {
        token: this.myToken,
      },
    });
  }
  clearUserCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: this.myToken,
      },
    });
  }
  
}
