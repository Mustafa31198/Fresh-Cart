import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  myToken: any = localStorage.getItem('userToken');

  constructor(private readonly _HttpClient:HttpClient) { }
  getAllOrders(id:string){
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }
onlinePayment(id:string , userDetails:{}){
  return  this._HttpClient.post<any>(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000` ,
   {
    shippingAddress :userDetails,
  })
}
cashPayment(id:string , userDetails:{}){
  return this._HttpClient.post<any>(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,{
    shippingAddress :userDetails,

  },{
    headers:{
      token:  this.myToken
    }
  })

}

}
