import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  loginFail:boolean=false;
  submitted:boolean=false;

  email:string='';

  successMessage: string = '';
  errorMsg:string='';

  constructor(private formbuilder:FormBuilder, private service:LoginService, private router:Router){}

  ngOnInit(): void {
    this.logininitilization();
  }

  logininitilization(){
    this.loginform=this.formbuilder.group({
      UserID:['',[Validators.required]],
      Password:['',[Validators.required]]
    });
  }

  login(){
    this.submitted=true
    // console.log(this.loginform.value);

    const data={
      User_Id:this.loginform.value['UserID'],
      Password:this.loginform.value['Password']
    }

    // console.log(data);

    this.service.loginfunctionality1(data).subscribe(res => {
      // alert("Login Success")
      this.successMessage = 'Successfully logged in';
      // this.router.navigate(['/home']);
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
      console.log(res);
    },error=>{
      // alert("Incorrect credintial");
      this.loginFail=true;
      // console.log(error);
      if (error.error && error.error.error){
        // alert(error.error.error);
        this.errorMsg=error.error.error;
      }else{
        // console.log(error);
        this.errorMsg=error.statusText;
      }
    });
    }

    resetlogin(){
      this.loginFail=false;
      this.successMessage = '';
      // this.loginform.reset();
    }
    
}
