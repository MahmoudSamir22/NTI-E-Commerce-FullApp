import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any = ''
  constructor(private _global:GlobalService, private _router:Router) { }

  ngOnInit(): void {
    this._global.readProfile().subscribe(
      (res) => {
        this.user = res.data
      },
      (err)=> {
        console.log(err)
      },
      ()=>{}
    )
  }

  deleteUser(){
    this._global.deleteUser().subscribe(
      (res) => {console.log(res)},
      (err) => {console.log(err)},
      () => {
        localStorage.removeItem('userToken')
        this._global.readProfile().subscribe(
          (data) => { this._global.userData = {}},
          () => {},
          () => {}
        )
        this._global.isAuthed = false
        this._router.navigateByUrl('/')
      }
    )
  }

}
