import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  isLoaded:Boolean = false
  wishList:any[] = []

  constructor(private _user:UserService, private _router:Router) { }

  ngOnInit(): void {
    this._user.showWishList().subscribe(
      (res) =>{
        this.wishList = res.data
        
      },
      (err) => {
        console.log(err)
      },
      () => {
        this.isLoaded = true
      }
    )
  }

  deleteWishListItem(id:any, index:number){
    this._user.deleteWishListItem({item:id}).subscribe(
      (res) => {console.log(res)},
      () => {},
      () => {
        this.wishList.splice(index, 1)
      }
    )
  }

  clearWishList(){
    this._user.clearWishList().subscribe(
      (res) => {console.log(res)},
      () => {},
      () => {this._router.navigateByUrl('/')}
    )
  }

}
