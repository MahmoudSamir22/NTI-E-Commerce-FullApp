import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  isLoaded:Boolean = false
  orders:any[] = []
  newOrders:any[] = []
  constructor(private _user:UserService) { }

  ngOnInit(): void {
    this._user.showOrder().subscribe(
      (res)=>{
        this.orders = res.data
        this.orders.forEach((e) => {
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
      (err)=>{console.log(err);
      },
      ()=>{this.isLoaded = true}
    )
  }

  deleteOrder(id:any, index:number){
    this._user.deleteOrder({id}).subscribe(
      (res)=>{console.log(res);
      },
      ()=>{},
      ()=>{this.newOrders.splice(index, 1)}
    )
  }

}
