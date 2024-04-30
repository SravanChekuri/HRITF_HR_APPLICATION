import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit{

  forgotPasswordForm:FormGroup;
  verifyOTP:FormGroup;
  email:string;
  otpSentSuccess:boolean=false;
  otpSentFail:boolean=false;
  verifyotpFail:boolean=false;


  constructor(private formbuilder:FormBuilder,private router:Router,private service:LoginService) { }

  ngOnInit() {
    this.forgotPasswordFormIntilization();
    this.otpInitialization();
  }

  forgotPasswordFormIntilization(){
    this.forgotPasswordForm=this.formbuilder.group({
      emailId:['',Validators.required]
    });
  }
  sendOtp(){
    const sendEmailData={
      Email_Id:this.forgotPasswordForm.value['emailId']
    }

    console.log(sendEmailData);

    this.service.sendEmailOtp(sendEmailData).subscribe((res)=>{
      // alert("Send Otp Success")
      this.otpSentSuccess=true;
    },error=>{
      // alert("send otp Fail")
      this.otpSentFail=true;
    });

  }

  otpInitialization(){
    this.verifyOTP=this.formbuilder.group({
      otp: ['', Validators.required]
    });
  }

  verifyOtp(){
    const sendOtp={
      Email_Id:this.forgotPasswordForm.value['emailId'],
      OTP:this.verifyOTP.value['otp']
    };
    console.log(sendOtp);
    

    this.service.sendOtp(sendOtp).subscribe(
      (res) => {
        // alert('OTP Success');
        this.router.navigate(['/resetpassword']);
      },
      (error) => {
        // alert('OTP verification failed');
        this.verifyotpFail=true;
        console.error('Error during OTP verification:', error);
      });
  }
}
