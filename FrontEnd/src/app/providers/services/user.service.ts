import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private commonUrl = 'http://localhost:3000/user/'
  constructor(private _http:HttpClient) { }
  
  addToCart(itemData:any):Observable<any>{
    return this._http.post(`${this.commonUrl}addToCart`, {body: itemData})
  }

  showCart():Observable<any>{
    return this._http.get(`${this.commonUrl}showCart`)
  }

  deleteCartItem(item:any):Observable<any>{
    console.log(item);
    return this._http.delete(`${this.commonUrl}removeFromCart`, { body: item })
  }

  clearCart():Observable<any>{
    return this._http.delete(`${this.commonUrl}clearCart`)
  }

  addToWishList(itemData:any):Observable<any>{
    return this._http.post(`${this.commonUrl}addToWishList`, {body: itemData})
  }

  showWishList():Observable<any>{
    return this._http.get(`${this.commonUrl}showWishList`)
  }

  deleteWishListItem(item:any):Observable<any>{
    return this._http.delete(`${this.commonUrl}removeFromWishList`, { body: item })
  }

  clearWishList():Observable<any>{
    return this._http.delete(`${this.commonUrl}clearWishList`)
  }

  postOrder():Observable<any>{
    return this._http.post(`${this.commonUrl}placeOrder`, {})
  }

  showOrder():Observable<any>{
    return this._http.get(`${this.commonUrl}readOrder`)
  }

  deleteOrder(id:any):Observable<any>{
    return this._http.delete(`${this.commonUrl}deleteOrder`, {body: id} )
  }
  
}
