import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoaded = false
  constructor(public _auth:GlobalService) { }

  ngOnInit(): void {
    this._auth.readProfile().subscribe(
      (data)=>{
        this._auth.userData = data.data
      },
      ()=>{
        this.isLoaded = true
        this._auth.isAuthed=false
      },
      ()=>{
        this.isLoaded = true
        this._auth.isAuthed=true
      }
    )
  }

  logout(){
    this._auth.logout().subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
      () => {
        localStorage.clear()
        this._auth.isAuthed=false
      }
    
    )
  }

}
