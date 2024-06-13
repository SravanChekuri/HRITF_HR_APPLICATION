import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { AuthService } from '../Auth-Service/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // data:FormGroup;
  loginform:FormGroup;

  // loginFail:boolean=false;
  submitted:boolean=false;

  // email:string='';

  // successMessage: string = '';
  errorMsg:string='';

  passwordVisible: boolean = false;

  isLoading: boolean = false;

  loginData:any;
  
  constructor(private formbuilder:FormBuilder, private service:LoginService, private router:Router, private AuthService:AuthService){}

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
    this.submitted=true;
    // console.log(this.loginform.value);
    if (this.loginform.invalid) {
      return;
    }

    this.isLoading = true;

    const data={
      User_Id:this.loginform.value['UserID'],
      Password:this.loginform.value['Password']
    }

    // console.log(data);

    this.service.loginfunctionality1(data).subscribe(res => {
      // alert("Login Success")
      // this.successMessage = 'Successfully logged in';
      // this.router.navigate(['/home']);
      console.log(res);

      this.loginData = res;
      console.log("login data:",this.loginData.User_Id);

      // localStorage.setItem('loginData',this.loginData);

      localStorage.setItem('loginData', JSON.stringify(this.loginData));


      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Successfull 🎉",
        text:"You have successfully login into HRIT Factory HR compensation application",
        showConfirmButton: false,
        width:400,
        timer: 2000
      });


      setTimeout(() => {
        // this.router.navigate(['/home']);
        this.onlogin();
      }, 1500);
                // console.log(res);
    },error=>{
      // alert("Incorrect credintial");
      // this.loginFail=!this.loginFail;
              // console.log(error);
      if (error.error && error.error.error){
        // alert(error.error.error);
        this.errorMsg=error.error.error;

        Swal.fire({
          position: "top",
          icon: "error",
          title: "Failed to Login ☹️",
          text: `${this.errorMsg}`,
          width:400,
        });
        
      }else{
        // console.log(error);
        this.errorMsg=error.statusText;
        Swal.fire({
          position: "top",
          title: "The Server?",
          text: "🤔 Backend Server is not running?",
          icon: "question",
          width:400,
        });
      }
      this.isLoading = false;
    },()=>{
      this.isLoading = false;
    });
    }

    // resetlogin(){
      // this.loginFail=false;
      // this.successMessage = '';
      // this.loginform.reset();
    // }
    
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible; 
    }

    onlogin(){
      this.AuthService.Login();
      this.router.navigate(['/home']);
    }


}
