import { formatDate } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LettersService } from 'src/app/feature/Services/letters.service';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})


export class EmployeeDetailsComponent implements OnInit{
  empData:any;
  data:any
  updateForm:any=new FormGroup({});

  
  constructor(private service:LettersService,private formbulider:FormBuilder){
   
    this.empData = JSON.parse(localStorage.getItem('empData'));
   

  }
  ngOnInit(): void {
    this.form();
  }

  form(){
    console.log(formatDate(this.empData.Date_of_Joining, 'yyyy-MM-dd','en'));
    
    this.updateForm=this.formbulider.group({
      firstName:[this.empData.Employee_First_Name,Validators.required],
      middleName:[this.empData.Middle_Name],
      lastName:[this.empData.Last_Name,Validators.required],
      employeeNumber:[this.empData.EMPLOYEE_NUMBER,Validators.required],
      dateOfJoining:[formatDate(this.empData.Date_of_Joining, 'yyyy-MM-dd','en'),Validators.required],
      location:[this.empData.Location,Validators.required],
      email:[this.empData.Email,Validators.required],
      workerType:[this.empData.WORKER_TYPE,Validators.required],
      startDate:[formatDate(this.empData.EFFECTIVE_START_DATE, 'yyyy-MM-dd','en'),Validators.required],
      endDate:[this.empData.EFFECTIVE_END_DATE,Validators.required]



    })
  }


  update(){
   // console.log("name",this.updateForm.firstName);
    const employeeNumber = this.updateForm.get('employeeNumber');
    console.log("name" ,employeeNumber.value);
    const id=employeeNumber.value;
   const empId=this.empData.Employee_id;
   console.log("empId",empId);
   
   const empdata ={
    First_Name:this.updateForm.value['firstName'],
    Middle_Name:this.updateForm.value['middleName'],
    Last_Name:this.updateForm.value['lastName'],
    Employee_Number:this.updateForm.value['employeeNumber'],
    Date_Of_Joining:this.updateForm.value['dateOfJoining'],
    Location:this.updateForm.value['location'],
    Email_Id:this.updateForm.value['email'],
    Worker_Type:this.updateForm.value['workerType'],
    Effective_Start_Date:this.updateForm.value['startDate'],
    Effective_End_Date:this.updateForm.value['endDate']
   }
   console.log("updateData",empdata);

    this.service.updateEmp(empdata,empId).subscribe((res)=>{
      alert("update success")
    },
    error=>{
      console.log(error);
      
      alert("update failure")

    }
    )

  }
  
  
}
