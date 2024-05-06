import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/feature/Services/login.service';

@Component({
  selector: 'employee-newrole',
  templateUrl: './employee-newrole.component.html',
  styleUrls: ['./employee-newrole.component.css']
})
export class EmployeeNewroleComponent implements OnInit{

  signUpForm:FormGroup;

  submitted:boolean=false;
  registerFail:boolean=false;

  msg:any='';

  constructor(private formbulider:FormBuilder,private router:Router, private service:LoginService) { }

  ngOnInit() {
    this.signUpFormIntilization()
  }

  signUpFormIntilization(){
    this.signUpForm=this.formbulider.group({
      userId:['',Validators.required],
      firstName:['',Validators.required],
      middleName:['',],
      lastName:['',Validators.required],
      emailId:['',[Validators.required,Validators.email]],
      mobileNumber:['',[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.maxLength(10)]],
      role:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(8),this.passwordValidator]],
      effectiveStartDate:['',Validators.required],
      effectiveEndDate:['4712-12-31']
      });

      this.signUpForm.setValidators(this.customValidation.bind(this));  
  } 
    
  customValidation(formGroup: FormGroup): { [key: string]: any } | null {
    const firstName = formGroup.get('firstName').value.toLowerCase();
    const lastName = formGroup.get('lastName').value.toLowerCase();

    if (firstName && lastName && firstName === lastName) {
      return { sameName: true };
    }
    return null
  }

  passwordValidator(control: any): { [key: string]: boolean } | null {
    const password = control.value;
    if (!password || password.length < 8 || password.length > 8 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return { 'minlength': true };
    }
    return null;
  }


  submitForm(){
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
      };

      console.log(signupData);

      this.service.signUpDataService(signupData).subscribe((res)=>{
        // alert("signupdata Success")
        // this.router.navigate(['/'])
        if (this.signUpForm.invalid) {
          this.submitted = true;
          return;
        }
        this.submitted=true;
        this.signUpForm.reset();

      },error=>{
        this.registerFail=true;
        if (error.error && error.error.message){
          // alert(error.error.error);
          console.log(error.error.message);
          this.msg=error.error.message;
        }else{
          console.log(error);
          // alert("An error occured:"+error.statusText);
          this.msg=error.statusText;
        }
      });
    }

    resetmsg(){
      this.submitted=false;
      this.registerFail=false;
    }


}
