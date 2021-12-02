import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/providers/services/admin.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  isLoaded:Boolean = false
  myOrders:any[] = []
  newOrders:any[] = []
  constructor(private _admin:AdminService) { }

  ngOnInit(): void {
    this._admin.showOrders().subscribe(
      (res) => {
        this.myOrders = res.data
        this.myOrders.forEach((e) => {
          e.order.orderContent.forEach((el:any) => {
            e.details.forEach((ele:any) =>{
              if(ele._id == el.item) {
                el.title = ele.title
                el.description = ele.description
              }
            })
          })
          this.newOrders.push(e.order)
        })
      },
      (err) => {console.log(err)},
      () => {this.isLoaded = true}
    )
  }

}
