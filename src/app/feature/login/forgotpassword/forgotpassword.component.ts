import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit{

  forgotPasswordForm:FormGroup;
  verifyOTP:FormGroup;

  otpSentSuccess:boolean=false;
  otpSentFail:boolean=false;

  verifyotpFail:boolean=false;
  verifyotpSuccess:boolean=false;

  submitted:boolean=false;

  email:string ='';

  mailSuccess:string='';
  mailFail:string='';

  otpSuccess:string='';
  otpFail:string='';

  constructor(private formbuilder:FormBuilder,private router:Router,private route:ActivatedRoute,private service:LoginService) { }

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
    };

    // console.log("Sending email id to backend:",sendEmailData.Email_Id);

    this.service.sendEmailOtp(sendEmailData).subscribe((res)=>{
      // alert("Send Otp Success")
      this.otpSentSuccess=true;
      this.submitted=true;
      this.mailSuccess = (res as any).message;
      // console.log(res);
      
    },error=>{
      // alert("send otp Fail")
      this.otpSentFail=true;
      this.mailFail = this.forgotPasswordForm.get('emailId').invalid ? 'Invalid email address': error.error.message;
      // this.mailFail = error.error.message;
      // console.log(error.error.message);
      
    }); 
  }

  otpInitialization(){
    this.verifyOTP=this.formbuilder.group({
      otp: ['', Validators.required]
    });
  }

  verifyOtp(){
    const sendOtp={
      OTP:this.verifyOTP.value['otp'],
      Email_Id:this.forgotPasswordForm.value['emailId']
      // Email_Id:this.email

    };
    
    console.log('Sending OTP and email to backend:',sendOtp.OTP,sendOtp.Email_Id);
    

    this.service.sendOtp(sendOtp).subscribe(
      (res) => {
        // alert('OTP Success');
        this.verifyotpSuccess=true;
        this.otpSuccess=(res as any).message;
        setTimeout(() => {
          this.router.navigate(['/resetpassword', { email: sendOtp.Email_Id }]);
        }, 1500); 
      },
      (error) => {
        // alert('OTP verification failed');
        this.verifyotpFail=true;
        this.otpFail=error.error.message;
        // console.error('Error during OTP verification:', error);
      });
  }

  resetmsg(){
    setTimeout(() => {
      this.otpSentSuccess=false;
      this.otpSentFail=false;
      this.verifyotpFail=false;
    }, 1500);
  }

}
