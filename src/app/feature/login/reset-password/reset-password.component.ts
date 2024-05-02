import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email:string='';
  resetPasswordForm:FormGroup;

  passwordChanged:boolean=false;

  ispwsaame:boolean=false;

  constructor(private formbuilder:FormBuilder,private service:LoginService, private route:ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe(params =>{
      this.email=params['email'];
      console.log("reset email:",this.email);
    })
    this.resetFormIntilization()
  }

  resetFormIntilization(){
    this.resetPasswordForm=this.formbuilder.group({
      newPassword:['',Validators.required],
      reEneterPassword:['',Validators.required]
    });
  }

  resetPassword(){

    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    const reEnterPassword = this.resetPasswordForm.get('reEneterPassword')?.value;

    console.log('New Password:', newPassword);
    console.log('Re-Enter Password:', reEnterPassword);

    if (newPassword===reEnterPassword){
      const newPasswordSend={
        Password:this.resetPasswordForm.value['newPassword'],
        Email_Id: this.email
      };
      console.log("emailreset",newPasswordSend);

      this.service.newPassword(newPasswordSend).subscribe((res)=>{
        // alert("successfully changed password")
        this.passwordChanged=true;
      }, error=>{
        // alert("fail to change password")
      })  
    }
    else{
      // alert("new password re-enter password do not matched")
      this.ispwsaame=true;
    }
  }
}
