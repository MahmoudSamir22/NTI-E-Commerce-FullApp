import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private commonUrl = 'http://localhost:3000/admin/'
  constructor(private _http:HttpClient) { }
  showMyProducts():Observable<any>{
    return this._http.get(`${this.commonUrl}showMyProducts`)
  }
  showOrders():Observable<any>{
    return this._http.get(`${this.commonUrl}showOrders`)
  }
  addProduct(data:any):Observable<any>{
    return this._http.post(`${this.commonUrl}addProduct`, data)
  }

  editProduct(data:any):Observable<any>{
    return this._http.patch(`${this.commonUrl}updateProduct`, data)
  }

  deleteProduct(id:any):Observable<any>{
    return this._http.delete(`${this.commonUrl}deleteProduct`, {body: id})
  }

}
