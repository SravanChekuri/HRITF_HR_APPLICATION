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

  fileError:any;

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
      Job_Location:this.addEmpForm.value['Location'],
      Email_Id:this.addEmpForm.value['Email'],
      Worker_Type:this.addEmpForm.value['workerType'],
      Effective_Start_Date:this.addEmpForm.value['startDate'],
      Effective_End_Date:this.addEmpForm.value['endDate'],
      Date_Of_Birth:this.addEmpForm.value['DateOfBirth']
    };

      // console.log(addEmpData);
      
      this.service.addEmployee(addEmpData).subscribe(res=>{
      console.log(res);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile added Successfull 🎉",
        showConfirmButton: false,
        timer: 1500,
      }).then(()=>{
        this.router.navigate(['/home/employees/empProfile']); 
      });
    },error=>{
      console.log(error);
      if (error.error && error.error.message) {
        this.msg = error.error.message;
      }
      else{
        console.log(error);
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
    if (this.file) {
      const fileName = this.file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      const allowedExtensions = ['xlsx', 'xls'];
      if (!allowedExtensions.includes(fileExtension!)) {
        this.fileError = 'Only Excel files are allowed. Please select a valid file.';
      } else {
        this.fileError = '';
      }
    }
  }



uploadFile(){
    let formData=new FormData();
    formData.append("EXCEL",this.file);
    this.service.bulkUpload(formData).subscribe(res=>{
      // console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "BulkUpload Successfull 🎉",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.router.navigate(['/home/employees/empProfile']); 
      });
    }, error=>{
      // console.log(error);
      if (error.error && error.error.message) {
        this.bulkmsg = error.error.message;
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Failed to Add ☹️",
          text: `${this.bulkmsg}`,
          width:400,
        }); 
      }
      else{
        this.bulkmsg = error.error.statusText;
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


  resetForm(): void {
    this.submitted = false; 
    this.addEmpForm.reset(); 
    // this.addEmpForm.patchValue({ workerType: 'Candidate' });
    // this.addEmpForm.markAsUntouched(); 
    // this.addEmpForm.markAsPristine();
  }


  excelview(){
    this.service.sampleExcelView();
  }

  
}
