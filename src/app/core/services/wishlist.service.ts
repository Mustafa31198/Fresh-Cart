import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }
    private readonly _HttpClient = inject(HttpClient);
     wishNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  
    myToken: any = localStorage.getItem('userToken');
    addToWishList(id: string): Observable<any> {
      return this._HttpClient.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
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

    getUserWishList(): Observable<any> {
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: this.myToken,
        },
      });
    }
    removeSpecificWishListItem(id:string): Observable<any> {
      return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: this.myToken,
        },
      });
    }
}
