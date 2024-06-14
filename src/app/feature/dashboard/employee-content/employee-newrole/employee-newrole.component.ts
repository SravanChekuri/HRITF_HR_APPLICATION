import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/feature/Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'employee-newrole',
  templateUrl: './employee-newrole.component.html',
  styleUrls: ['./employee-newrole.component.css']
})
export class EmployeeNewroleComponent implements OnInit{

  signUpForm:FormGroup;

  submitted:boolean=false;

  msg:any='';

  regSuccessMsg:string='';

  loading: boolean = false; 

  constructor(private formbulider:FormBuilder, private service:LoginService) { }

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
      mobileNumber:['',[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.maxLength(10),Validators.minLength(10)]],
      role:['',Validators.required],
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



  submitForm(){
    if (this.signUpForm.invalid) {
      this.submitted = true;
      return;
    }

    this.loading = true;

    const signupData={

      User_Id:this.signUpForm.value['userId'],
      First_Name:this.signUpForm.value['firstName'],
      Middle_Name:this.signUpForm.value['middleName'],
      Last_Name:this.signUpForm.value['lastName'],
      Email_Id:this.signUpForm.value['emailId'],
      Mobile_Number:this.signUpForm.value['mobileNumber'],
      Role:this.signUpForm.value['role'],
      // Password:this.signUpForm.value['password'],
      Effective_Start_Date:this.signUpForm.value['effectiveStartDate'],
      Effective_End_Date:this.signUpForm.value['effectiveEndDate']
      
      };

      // console.log(signupData);

      this.service.signUpDataService(signupData).subscribe((res)=>{

        this.submitted=true;

        this.regSuccessMsg=(res as any).message;

        this.loading = false;

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${this.regSuccessMsg}`,
          showConfirmButton: false,
          timer: 1500
        });

      },error=>{

        this.loading = false;

        if (error.error && error.error.message){
          this.msg=error.error.message;
        }else{
          this.msg=error.statusText;
        }
        Swal.fire({
          position:'top',
          icon: "error",
          title: "Oops...",
          text: `${this.msg}`,
          showConfirmButton: true,
          width:400,
        });      
      });
    }

    resetmsg(){
      this.submitted=false;
      // this.signUpForm.reset();
    }

    isFormValid(): boolean {
      return this.signUpForm.valid;
    }

}
