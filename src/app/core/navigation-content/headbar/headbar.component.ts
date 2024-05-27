import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/feature/Services/login.service';

@Component({
  selector: 'headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.css']
})
export class HeadbarComponent implements OnInit {

    adminData:any;

    constructor(private service:LoginService){ }

    ngOnInit(): void {
      this.getAdminDetails();
    }

    getAdminDetails():void{
    this.service.getadmin().subscribe((res:any)=>{
      console.log('Admin details:',res);
    },error=>{
      console.log('Error fetching admin details:', error);
    }); 
    }
  

}
