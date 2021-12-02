import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/providers/services/admin.service';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  myProducts:any[] = []
  isLoaded=false
  constructor(private _admin:AdminService, public _global:GlobalService) { }

  ngOnInit(): void {
    this._admin.showMyProducts().subscribe(
      (res) => {
        this.myProducts = res.data
      },
      (err) => {console.log(err)},
      () => {this.isLoaded=true}
    )
  }
}
