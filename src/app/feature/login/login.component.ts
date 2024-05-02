import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data:FormGroup;
  loginform:FormGroup;
  loginFail:boolean=false;

  email:string='';


  constructor(private formbuilder:FormBuilder, private service:LoginService, private router:Router){}

  ngOnInit(): void {
    this.logininitilization();
  }

  logininitilization(){
    this.loginform=this.formbuilder.group({
      UserID:['',[Validators.required]],
      Password:['',[Validators.required]]
    })
  }

  login(){
    console.log(this.loginform.value);

    const data={
      User_Id:this.loginform.value['UserID'],
      Password:this.loginform.value['Password']
    }
    
    console.log(data);

    this.service.loginfunctionality1(data).subscribe(res => {
      // alert("Login Success")
      this.router.navigate(['/home']);

      console.log(res);
    },error=>{
      // alert("Incorrect credintial")
      this.loginFail=true;
      console.log(error);
    });
    }

}
