import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.css']
})
export class HeadbarComponent implements OnInit {  

  userName: string | null = '';

  userId:string | null = '';

  login_data:any;

  constructor() {}

  ngOnInit(): void {
    this.login_data = JSON.parse(localStorage.getItem('loginData'));
    // console.log("Login data header:",this.login_data);
    
  }
}
