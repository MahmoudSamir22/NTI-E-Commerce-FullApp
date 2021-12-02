import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/providers/services/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm = new FormGroup ({
    title: new FormControl(),
    description: new FormControl(),
    quantity: new FormControl()
  })
  constructor(private _admin:AdminService, private _router:Router) { }

  ngOnInit(): void {
  }

  get title() {return this.productForm.get('title')}
  get description() {return this.productForm.get('description')}
  get quantity() {return this.productForm.get('quantity')}

  addProduct(){
      this._admin.addProduct(this.productForm.value).subscribe(
        (res) => {
          console.log(res?.message)
        },
        (err) => {console.log(err?.message);
        },
        () => {
          this._router.navigateByUrl('/')
        },
      )
  }

}
