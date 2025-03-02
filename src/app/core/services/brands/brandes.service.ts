import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandesService {

  constructor(private readonly httpClient:HttpClient) { }

    getAllProducts():Observable<any>{
      return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
    }
    getSpecificProducts(id:string | null):Observable<any>{
      return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    }
}
