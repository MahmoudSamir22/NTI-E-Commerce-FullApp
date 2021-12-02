import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isLoaded:Boolean = false
  cart:any[] = []
  constructor(private _user:UserService, private _router:Router) { }

  ngOnInit(): void {
    this.isLoaded = false
    this._user.showCart().subscribe(
      (res) =>{
        this.cart = res.data
        
      },
      (err) => {
        console.log(err)
      },
      () => {
        this.isLoaded = true
      }
    )
  }

  deleteCartItem(id:any, index:number){
    this._user.deleteCartItem({item:id}).subscribe(
      (res) => {console.log(res)},
      () => {},
      () => {
        this.cart.splice(index, 1)
      }
    )
  }

  clearCart(){
    this._user.clearCart().subscribe(
      (res) => {console.log(res)},
      () => {},
      () => {this._router.navigateByUrl('/')}
    )
  }

  postOrder(){
    this._user.postOrder().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
        
      },
      () => {
        this.cart = []
        this._router.navigateByUrl('/')
      }
    )
  }
  

}
