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

  newPasswordVisible: boolean = false;
  reEnterPasswordVisible: boolean = false;

  // pwSuccessMsg:string='';
  // pwFailMsg:string='';

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
      newPassword:['',[Validators.required,Validators.minLength(8),this.passwordValidator]],
      reEneterPassword:['',Validators.required]
    });
  }

  passwordValidator(inputElement: any): { [key: string]: boolean } | null {
    const password = inputElement.value;
    if (!password || password.length < 8 || password.length > 8) {
      return { 'length': true }; 
    }
    if (!/[A-Z]/.test(password)) {
      return { 'uppercase': true }; 
    }
    if (!/\d/.test(password)) {
      return { 'number': true }; 
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return { 'special': true }; 
    }
    return null;
  }

  togglePasswordVisibility(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) {
      inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
      if (inputId === 'newpw') {
        this.newPasswordVisible = !this.newPasswordVisible;
    } else if (inputId === 'repw') {
        this.reEnterPasswordVisible = !this.reEnterPasswordVisible;
    }
    }
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
      // console.log("emailreset",newPasswordSend);

      this.service.newPassword(newPasswordSend).subscribe((res)=>{
        // alert("successfully changed password")
        this.passwordChanged=true;
        // this.pwSuccessMsg= (res as any).message;
      }, error=>{
        // alert("fail to change password")
        // this.pwFailMsg=error.error.message;
        console.log(error.error.message);
        
      })  
    }
    else{
      // alert("new password re-enter password do not matched")
      this.ispwsaame=true;
    }
  }
}
