import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/providers/services/admin.service';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm = new FormGroup ({
    title: new FormControl(),
    description: new FormControl(),
    quantity: new FormControl()
  })
  constructor(private _global:GlobalService, private _route:ActivatedRoute, private _admin:AdminService, private _router:Router) { }
  id:any
  ngOnInit(): void {
    this._global.singleProduct({id:this._route.snapshot.params['id']}).subscribe(
      (res) => {
        this.editProductForm.patchValue(res.data)
        this.id = res.data._id
      },
      () => {},
      () => {}
    )
  }

  get title() {return this.editProductForm.get('title')}
  get description() {return this.editProductForm.get('description')}
  get quantity() {return this.editProductForm.get('quantity')}

  editProduct(){
    this._admin.editProduct({id:this.id, ...this.editProductForm.value}).subscribe(
      (res ) => {console.log(res);
      },
      (err) => {console.log(err);
      },
      () => {
        this._router.navigateByUrl('/adminProducts')
      }
    )
  }
}
