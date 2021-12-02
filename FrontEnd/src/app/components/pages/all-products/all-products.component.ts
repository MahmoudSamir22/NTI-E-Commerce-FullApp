import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/services/global.service';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProducts:any[] = []
  q:number[]=[]
  isLoaded=false
  constructor(public _global:GlobalService, private _user:UserService) { }

  ngOnInit(): void {
    this._global.allProducts().subscribe(result => {
      this.allProducts = result.data
      result.data.forEach( (element:any) => {
        this.q.push(1)
      });
    },
    ()=>{},
    ()=>{
      this.isLoaded=true
      
    })
  }
  
  addToCart(id:any, owner:any, q:number){
    let item = {
      item: id,
      quantity: q,
      seller: owner
    }
    this._user.addToCart(item).subscribe(
      (res) => console.log(res),
      (err) => {console.log(err)},
      () => console.log('Done') 
    )
    console.log(q);
  }
  addToWishList(id:any, owner:any){
    let item = {
      item: id,
      seller: owner
    }
    this._user.addToWishList(item).subscribe(
      (res)=>{console.log(res)},
      (err)=>{console.log(err)},
      ()=>{console.log('Done')},
    )
  }
  
}
