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
  addEmpForm:FormGroup;

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
      Email:['',Validators.required]
    })
  }

  submitEmpData(){
    alert("employee data submited!");
    console.log(this.addEmpForm);

    const addEmpData={
      First_Name:this.addEmpForm.value['FirstName'],
      Middle_Name:this.addEmpForm.value['MiddleName'],
      Last_Name:this.addEmpForm.value['LastName'],
      Employee_Number:this.addEmpForm.value['EmployeeNumber'],
      Date_Of_Joining:this.addEmpForm.value['DateOfJoining'],
      Location:this.addEmpForm.value['Location'],
      Email_Id:this.addEmpForm.value['Email']
    }
    console.log(addEmpData);
    
    this.service.addEmployee(addEmpData).subscribe(res=>{
      console.log(res);
    },error=>{
      console.log(error);
      
    });
  }
  
}
