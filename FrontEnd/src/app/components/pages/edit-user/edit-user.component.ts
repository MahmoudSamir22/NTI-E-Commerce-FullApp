import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private _auth: GlobalService, private _router:Router) { }
  isLoaded = false
  isSubmitted = false
  editForm = new FormGroup({
    fname: new FormControl(),
    lname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl()
  })
  ngOnInit(): void {
   this.editForm.patchValue(this._auth.userData)
   
  }

  get fname() {return this.editForm.get('firstName')}
  get lname() {return this.editForm.get('lastName')}
  get email() {return this.editForm.get('email')}
  get phone() {return this.editForm.get('phone')}

  editUser(){
    this.isSubmitted = true
    this._auth.editUser(this.editForm.value).subscribe(
      (res)=> console.log(res),
      (err)=> console.log(err),
      ()=> {
        this._auth.readProfile().subscribe(
          (data) => {this._auth.userData = data.data},
          () => {this._auth.isAuthed=false},
          () => {
            this._auth.isAuthed = true
          }
        )
        this._router.navigateByUrl('/profile')
      }
    )
  }

}
