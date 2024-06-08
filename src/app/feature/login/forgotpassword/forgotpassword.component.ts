import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit{

  forgotPasswordForm:FormGroup;
  verifyOTP:FormGroup;

  // otpSentSuccess:boolean=false;
  // otpSentFail:boolean=false;

  // verifyotpFail:boolean=false;
  // verifyotpSuccess:boolean=false;

  submitted:boolean=false;

  email:string ='';

  mailSuccess:any;
  mailFail:any;

  otpSuccess:any;
  otpFail:any;

  loading: boolean = false;
  loading2: boolean = false;

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
    this.loading = true;

    this.service.sendEmailOtp(sendEmailData).subscribe((res)=>{
      // alert("Send Otp Success")
      // this.otpSentSuccess=true;
      this.loading = false;
      this.submitted=true;

      this.mailSuccess = (res as any).message;
          // console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title:'Successful👍',
        text: `${ this.mailSuccess }`,
        showConfirmButton: false,
        timer: 2000,
        width:400,
      });
      
    },error=>{
      console.log(error);
      
      this.loading = false;
      // alert("send otp Fail")
      // this.otpSentFail=true;
      // this.mailFail = error.error.error;

      this.mailFail = this.forgotPasswordForm.get('emailId').invalid ? 'Invalid email address': error.error.message;

      Swal.fire({
        position:'top',
        icon: "error",
        title: "Oops...☹️",
        text: `${ this.mailFail }`,
        width:400,
      });
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
    
    // console.log('Sending OTP and email to backend:',sendOtp.OTP,sendOtp.Email_Id);
    
    this.loading2 = true;

    this.service.sendOtp(sendOtp).subscribe(
      (res) => {
        this.loading2 = false;

        // alert('OTP Success');
        // this.verifyotpSuccess=true;
        this.otpSuccess=(res as any).message;

        Swal.fire({
          position: "top-end",
          icon: "success",
          title:'Successful👍',
          text: `${ this.otpSuccess }`,
          showConfirmButton: false,
          timer: 2000,
          width:400,
        });  
        
        setTimeout(() => {
          this.router.navigate(['/resetpassword', { email: sendOtp.Email_Id }]);
        }, 1500); 
      },
      (error) => {
        this.loading2 = false;

        // alert('OTP verification failed');
        // this.verifyotpFail=true;
        this.otpFail=error.error.message;
        // console.error('Error during OTP verification:', error);
        Swal.fire({
          position: 'top',
          icon: "error",
          title: "Verification Failed",
          text: `${this.otpFail}`,
          showConfirmButton: true,
          width: 400,
        });
      });
  }

  resetmsg(){
    // setTimeout(() => {
      // this.otpSentSuccess=false;
      // this.otpSentFail=false;
      // this.verifyotpFail=false;
    // }, 1500);
  }

}
