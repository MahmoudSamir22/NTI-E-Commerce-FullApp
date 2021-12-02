import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
  wrongeData:Boolean = false
  constructor(private _global:GlobalService, private _router:Router) { }

  ngOnInit(): void {
  }

  get email(){return this.myForm.get("email")}
  get password(){return this.myForm.get("password")}

  login(){
    this._global.login(this.myForm.value).subscribe(
      (result) =>{
        localStorage.setItem('userToken', result.token)
      },
      (err) => {this.wrongeData = true},
      ()=>{
        this.myForm.reset()
        this._global.readProfile().subscribe(
          (data) => {this._global.userData = data.data},
          () => {this._global.isAuthed=false},
          () => {
            localStorage.setItem('role', this._global.userData.role)
            this._global.isAuthed = true
          }
        )
        this._router.navigateByUrl('/')
      }
      
    )
  }

}
