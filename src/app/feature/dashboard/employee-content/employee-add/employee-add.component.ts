import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeAddService } from 'src/app/feature/Services/employee-add.service';

@Component({
  selector: 'employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit{

  // addEmpForm:any=new FormGroup({});

  successmsg:boolean=false;
  failmsg:boolean=false;

  addEmpForm:FormGroup;

  excelData:any
  file:any;
  msg:any;
  submitted=false;


  constructor(private formBuilder:FormBuilder,private service:EmployeeAddService,private router:Router){ }

  ngOnInit(): void {
    this.empData();
    
  }
  
  empData(){
    this.addEmpForm=this.formBuilder.group({
      FirstName:['',Validators.required],
      MiddleName:['',[]],
      LastName:['',Validators.required],
      EmployeeNumber:['',Validators.required],
      DateOfJoining:['',Validators.required],
      Location:['',Validators.required],
      Email:['',Validators.required],
      workerType:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['4712-12-31']

    })
  }

  submitEmpData(){
    this.submitted=true
    console.log(this.addEmpForm);

    const addEmpData={
      First_Name:this.addEmpForm.value['FirstName'],
      Middle_Name:this.addEmpForm.value['MiddleName'],
      Last_Name:this.addEmpForm.value['LastName'],
      Employee_Number:this.addEmpForm.value['EmployeeNumber'],
      Date_Of_Joining:this.addEmpForm.value['DateOfJoining'],
      Location:this.addEmpForm.value['Location'],
      Email_Id:this.addEmpForm.value['Email'],
      Worker_Type:this.addEmpForm.value['workerType'],
      Effective_Start_Date:this.addEmpForm.value['startDate'],
      Effective_End_Date:this.addEmpForm.value['endDate']

    }
    console.log(addEmpData);
    
    if (this.addEmpForm.status==='VALID'){
    this.service.addEmployee(addEmpData).subscribe(res=>{
      console.log(res);
      // alert("Employee data submited sucessfully");
      this.successmsg=true;
      // this.addEmpForm.reset();
      // this.successmsg=!this.successmsg;
    },error=>{
      console.log(error);
      if (error.error && error.error.message) {
        console.log(error);
      // alert(error.value);
      // alert("Employee Number/Email already exist");
      this.failmsg=!this.failmsg;
      alert(error.error.message); 
          this.msg=error.error.message;
      }
      else{
        console.log(error);
        alert("An error occurred: " + error.statusText);
      }
    });
  }
    else{
      alert("form is Invalid")
    }

    // this.failmsg=!this.failmsg;
    
    // this.router.navigate(['/home/employees']);
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
      alert("Successfully uploaded the data");
    }, error=>{
      console.log("Bulk Upload failed!");
      alert("fail");
      if (error.error && error.error.message) {
        console.log(error);
        alert("failed to add employee")
        alert(error.error.message); 
      }
    });
  }
  
}
