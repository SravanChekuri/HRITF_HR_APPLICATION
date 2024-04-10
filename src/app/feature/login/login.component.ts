import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data:FormGroup;
  loginform:FormGroup;
  // login:any;

  constructor(private formbuilder:FormBuilder, private service:LoginService, private router:Router){}

  ngOnInit(): void {
    this.logininitilization();
  }

  logininitilization(){
    this.loginform=this.formbuilder.group({
      UserID:['',[]],
      Password:['',[]]
      // Checkbox:['',[]]
    })
  }

  login(){
    console.log(this.loginform.value);
    
    this.router.navigate(['/home']);

    const data={
      Employee_ID:this.loginform.value['UserID'],
      Password:this.loginform.value['Password']
      // Checkbox:this.loginform.value['Checkbox']
    }
    
    console.log(data);

    // this.service.loginfunctionality1(data).subscribe(res => {
    //   console.log(res);
    // },error=>{
    //   console.log(error);
      
    // })
    }

}
