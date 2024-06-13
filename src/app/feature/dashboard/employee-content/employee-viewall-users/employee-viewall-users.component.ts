import { Component } from '@angular/core';
import { LoginService } from 'src/app/feature/Services/login.service';

@Component({
  selector: 'employee-viewall-users',
  templateUrl: './employee-viewall-users.component.html',
  styleUrls: ['./employee-viewall-users.component.css']
})
export class EmployeeViewallUsersComponent {

  adminData:any;

  constructor(private service:LoginService){ }

  ngOnInit(): void {
    this.getAdminDetails();
  }

  getAdminDetails():void{
  this.service.getadmin().subscribe((res:any)=>{
    // console.log('Admin details:',res);
    this.adminData = res.data;
  },error=>{
    // console.log('Error fetching admin details:', error);
  }); 
  }


}
