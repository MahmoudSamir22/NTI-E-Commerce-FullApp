import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSubmitted:Boolean = false

  myForm = new FormGroup({
    fname: new FormControl(),
    lname: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    phone: new FormControl()
  }) 

  constructor(private _global:GlobalService, private _router:Router) { }

  ngOnInit(): void {
  }

  get fname() {return this.myForm.get('fname')}
  get lname() {return this.myForm.get('lname')}
  get email() {return this.myForm.get('email')}
  get password() {return this.myForm.get('password')}
  get phone() {return this.myForm.get('phone')}

  registerUser(){
    this.isSubmitted = true
    this._global.registerUser(this.myForm.value).subscribe(
      result => console.log(result),
      err => console.log(err),
      () => this._router.navigateByUrl('/login')
    )
  }
  registerAdmin(){
    this.isSubmitted = true
    this._global.registerAdmin(this.myForm.value).subscribe(
      result => console.log(result),
      err => console.log(err),
      () => this._router.navigateByUrl('/login')
    )
  }

}
