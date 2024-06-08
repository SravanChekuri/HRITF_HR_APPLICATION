import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../feature/Auth-Service/auth.service';

@Component({
  selector: 'page-notfound',
  templateUrl: './page-notfound.component.html',
  styleUrls: ['./page-notfound.component.css']
})
export class PageNotfoundComponent {

  constructor(private AuthService:AuthService){}

  // ngOnInit(){}

  onlogout(){
    this.AuthService.Logout();
  }
}
