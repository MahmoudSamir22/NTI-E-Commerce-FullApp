import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private commonUrl = 'http://localhost:3000/general/'
  public userData:any = {}
  public isAuthed = false
  constructor(private _http:HttpClient) { }
  registerUser(userData:any):Observable<any>{
    return this._http.post(`${this.commonUrl}registerUser`, userData)
  }
  registerAdmin(userData:any):Observable<any>{
    return this._http.post(`${this.commonUrl}registerAdmin`, userData)
  }
  deleteUser():Observable<any>{
    return this._http.delete(`${this.commonUrl}meDelete`)
  }
  allProducts():Observable<any>{
    return this._http.get(`${this.commonUrl}showProducts`)
  }

  singleProduct(id:any):Observable<any>{
    return this._http.post(`${this.commonUrl}showSingleProduct`, id)
  }

  login(userData:any):Observable<any>{
    return this._http.post(`${this.commonUrl}login`, userData)
  }

  readProfile():Observable<any>{
    return this._http.get(`${this.commonUrl}me`)
  }

  editUser(userData:any):Observable<any>{
    return this._http.patch(`${this.commonUrl}meUpdate`, userData)
  }

  logout():Observable<any>{
    return this._http.post(`${this.commonUrl}logout`, {})
  }
}
