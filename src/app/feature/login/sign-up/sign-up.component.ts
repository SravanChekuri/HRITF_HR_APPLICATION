import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';


@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent implements OnInit {

  submitted:boolean=false

  signUpForm:FormGroup;

  constructor(private formbulider:FormBuilder,private router:Router, private service:LoginService) { }

  ngOnInit() {
    this.signUpFormIntilization()
  }

  signUpFormIntilization(){
    this.signUpForm=this.formbulider.group({
      userId:['',Validators.required],
      firstName:['',Validators.required],
      middleName:['',Validators.required],
      lastName:['',Validators.required],
      emailId:['',Validators.required],
      mobileNumber:['',Validators.required],
      role:['',Validators.required],
      password:['',Validators.required],
      effectiveStartDate:['',Validators.required],
      effectiveEndDate:['4712-12-31']
      })
  }
  submitForm(){
    this.submitted=true
    const signupData={
      User_Id:this.signUpForm.value['userId'],
      First_Name:this.signUpForm.value['firstName'],
      Middle_Name:this.signUpForm.value['middleName'],
      Last_Name:this.signUpForm.value['lastName'],
      Email_Id:this.signUpForm.value['emailId'],
      Mobile_Number:this.signUpForm.value['mobileNumber'],
      Role:this.signUpForm.value['role'],
      Password:this.signUpForm.value['password'],
      Effective_Start_Date:this.signUpForm.value['effectiveStartDate'],
      Effective_End_Date:this.signUpForm.value['effectiveEndDate']
      }
      console.log(signupData);
      this.service.signUpDataService(signupData).subscribe((res)=>{
        alert("signupdata Success")
        this.router.navigate(['/'])
      },error=>{
        alert("signup failure")
      })
    }
    resetForm(){
      this.signUpForm.reset()
    }

}
