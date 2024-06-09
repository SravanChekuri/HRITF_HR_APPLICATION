import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeAddService } from 'src/app/feature/Services/employee-add.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit{

  addEmpForm:FormGroup;

  submitted=false;

  file:any;

  msg:any;

  bulkmsg:any='';

  bulkUpadateMsg:any='';

  today: string;

  maxDate: string;
  
  minDate: string;

  constructor(private formBuilder:FormBuilder,private service:EmployeeAddService,private router:Router){ }

  ngOnInit(): void {
    this.empData();
    this.today = this.getTodayDate();
    this.maxDate = this.getMaxDate();
    this.minDate = this.getMinDate();
    this.addEmpForm.patchValue({ workerType: 'Candidate' });
  }
  
  empData(){
    this.addEmpForm=this.formBuilder.group({
      FirstName:['',Validators.required],
      MiddleName:['',],
      LastName:['',Validators.required],
      EmployeeNumber:['',Validators.required],
      mobileNumber:['',[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.maxLength(10),Validators.minLength(10)]],
      // DateOfJoining:['',Validators.required],
      Location:['',Validators.required],
      Email:['',[Validators.required,Validators.email]],
      workerType:['',Validators.required],
      startDate:['',Validators.required],
      DateOfBirth:['',[Validators.required,this.dateOfBirthValidator.bind(this)]],
      endDate:['4712-12-31']
    });

    this.addEmpForm.setValidators(this.customValidation.bind(this));  
  }

  customValidation(formGroup: FormGroup): { [key: string]: any } | null {
    const firstName = formGroup.get('FirstName').value.toLowerCase();
    const lastName = formGroup.get('LastName').value.toLowerCase();
    if (firstName && lastName && firstName === lastName) {
      return { sameName: true };
    }
    return null;
  }

      getTodayDate(): string {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      getMaxDate(): string {
        const today = new Date();
        const year = today.getFullYear() - 18;
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      getMinDate(): string {
        const today = new Date();
        const year = today.getFullYear() - 67;
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      dateOfBirthValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if (!control.value) {
          return null; 
        }
        const dob = new Date(control.value);
        const today = new Date();
        const minAge = 18;
        const maxAge = 67;
        const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
        const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

        if (dob < minDate || dob > maxDate) {
          return { invalidDateOfBirth: true };
        }
        return null;
      }

  submitEmpData(){
    this.submitted = true;
    // console.log(this.addEmpForm);
    if (this.addEmpForm.valid){

    const addEmpData={
      First_Name:this.addEmpForm.value['FirstName'],
      Middle_Name:this.addEmpForm.value['MiddleName'],
      Last_Name:this.addEmpForm.value['LastName'],
      Employee_Number:this.addEmpForm.value['EmployeeNumber'],
      Mobile_No:this.addEmpForm.value['mobileNumber'],
      // Date_Of_Joining:this.addEmpForm.value['DateOfJoining'],
      Job_Location:this.addEmpForm.value['Location'],
      Email_Id:this.addEmpForm.value['Email'],
      Worker_Type:this.addEmpForm.value['workerType'],
      Effective_Start_Date:this.addEmpForm.value['startDate'],
      Effective_End_Date:this.addEmpForm.value['endDate'],
      Date_Of_Birth:this.addEmpForm.value['DateOfBirth']
    };

      console.log(addEmpData);
      
      this.service.addEmployee(addEmpData).subscribe(res=>{
      console.log(res);
      // alert("Employee data submited sucessfully");
      // this.successmsg = true;

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile added Successfull 🎉",
        showConfirmButton: false,
        timer: 1500,
      }).then(()=>{
        this.resetForm();
        this.router.navigate(['/home/employees/empProfile']); 
      });
        // this.addEmpForm.reset();
    },error=>{
      console.log(error);
      if (error.error && error.error.message) {
        // this.failmsg = true;
        this.msg = error.error.message;
        // console.log(error);
      // alert(error.error.message); 
      }
      else{
        // this.failmsg=true;
        console.log(error);
        // alert("An error occurred: " + error.statusText);
        // this.msg = 'An error occurred while adding the employee';
        this.msg = error.error.error;
      }

      Swal.fire({
        position: "top",
        icon: "error",
        title: "Failed to Add ☹️",
        text: `${this.msg}`,
        width:400,
      });
        this.submitted = false;
    });
  }
    else{
      // alert("form is Invalid");
      this.msg='Form is Invalid';
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Failed to Add ☹️",
        text: `${this.msg}`,
        width:400,
      });
    }
  }



  selectFile(event:any){
    console.log('event',event);
    this.file=event.target.files[0];
    console.log(this.file);
  }

  uploadFile(){
    let formData=new FormData();
    formData.append("EXCEL",this.file);

    this.service.bulkUpload(formData).subscribe(res=>{
      console.log("Bulk upload Successfull:",res);
      // alert("Successfully uploaded the data");
      // this.bulkpass=true;

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "BulkUpload Successfull 🎉",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // this.bulkpass = false;
        this.router.navigate(['/home/employees/empProfile']); 
      });
    }, error=>{
      console.log("Bulk Upload failed!");
      // alert("fail");
      if (error.error && error.error.message) {
        console.log(error);
        // this.bulkfail=true;
        // alert("failed to add employee:"+ error.error.message)
        this.bulkmsg=error.error.message;

        Swal.fire({
          position: "top",
          icon: "error",
          title: "Failed to Add ☹️",
          text: `${this.bulkmsg}`,
          width:400,
        });
        
      }
    });
  }

  updateBulk(){
    let formData = new FormData();
    formData.append("EXCEL",this.file);

    this.service.bulkUpdate(formData).subscribe(res=>{
      console.log("bulk Update Success",res);
      // this.bulkpass=true;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "BulkUpdate Successfull 🎉",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // this.bulkpass = false;
        this.router.navigate(['/home/employees/empProfile']); 
      });
    },error=>{
      console.log("bulk Update fail");
      if (error.error && error.error.error) {
        console.log(error);
        // this.bulkfail=true;
        this.bulkUpadateMsg=error.error.error;
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Failed to Add ☹️",
          text: `${this.bulkUpadateMsg}`,
          width:400,
        });

      }
    });
  }


  resetForm(): void {
    this.addEmpForm.reset(); 
    // this.addEmpForm.patchValue({ workerType: 'Candidate' });
    this.addEmpForm.markAsUntouched(); 
    this.addEmpForm.markAsPristine();
    this.submitted = false; 
    // this.failmsg = false; 
    // this.successmsg = false;
  }

  
}
