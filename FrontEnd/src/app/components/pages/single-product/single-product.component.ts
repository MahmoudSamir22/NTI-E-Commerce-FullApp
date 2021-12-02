import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product:any
  notFound:Boolean=false
  loaded:Boolean = false
  constructor(private _global:GlobalService, private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this._global.singleProduct({id:this._route.snapshot.params['id']}).subscribe(
      result=>{this.product = result.data},
      (e)=>{
        this.notFound=true
      },
      ()=>{
        this.loaded=true
      }
    )
  }

}
