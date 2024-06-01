import { formatDate } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDetailsService } from 'src/app/feature/Services/employee-details.service';


@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})


export class EmployeeDetailsComponent implements OnInit{

  empData:any;
  data:any;
  empDataDetails:any;
  submitted:any=false;
  ishide:any=false;

  
  updateForm:FormGroup;
  employementForm:FormGroup; 

  isEditable: boolean = false;
  
  constructor(private service:EmployeeDetailsService,private formbulider:FormBuilder){
   
    this.empData = JSON.parse(localStorage.getItem('empData'));
    // console.log('this.empData',this.empData);

  }

  ngOnInit(){
    this.form1();
  }


// Candidate/Employee details 

  form1(){
            // console.log("editemp",this.empData);
    // console.log(this.empData.Employee_First_Name);
    // console.log('this.empData.WORKER_TYPE',this.empData.WORKER_TYPE);

    if (this.empData.WORKER_TYPE==='Employee'){
      this.ishide=true;
    }

    this.updateForm=this.formbulider.group({
      startDate:[formatDate(this.empData.EFFECTIVE_START_DATE, 'yyyy-MM-dd','en'),Validators.required],
      endDate:[formatDate(this.empData.EFFECTIVE_END_DATE,'yyyy-MM-dd','en'),Validators.required],
      workerType:[this.empData.WORKER_TYPE,Validators.required],
      employeeNumber:[this.empData.Employee_Number,Validators.required],
      email:[this.empData.Email,Validators.required],
      firstName:[this.empData.Employee_First_Name,Validators.required],
      middleName:[this.empData.Middle_Name],
      lastName:[this.empData.Last_Name,Validators.required],
      dateOfBirth:[formatDate(this.empData.DATE_OF_BIRTH,'yyyy-MM-dd','en'),Validators.required],
      phoneNumber:[this.empData.MOBILE_NO,Validators.required],
      location:[this.empData.JOB_LOCATION,Validators.required]
    });

    // this.updateForm.disable();

  }
  
  // toggleEdit(): void {
  //   this.isEditable = !this.isEditable;
  //   if (this.isEditable) {
  //     this.updateForm.enable();
  //   } else {
  //     this.updateForm.disable();
  //   }
  // }

  update(){

    this.submitted=true;

    const employeeNumber = this.updateForm.get('employeeNumber');
    console.log("name" ,employeeNumber.value);
    const id=employeeNumber.value;
    const empId=this.empData.Employee_id;
    console.log("empId",empId);
   
    const empdata ={
      Effective_Start_Date:this.updateForm.value['startDate'],
      Effective_End_Date:this.updateForm.value['endDate'],
      Worker_Type:this.updateForm.value['workerType'],
      Employee_Number:this.updateForm.value['employeeNumber'],
      Email:this.updateForm.value['email'],
      First_Name:this.updateForm.value['firstName'],
      Middle_Name:this.updateForm.value['middleName'],
      Last_Name:this.updateForm.value['lastName'],
      Date_Of_Birth:this.updateForm.value['dateOfBirth'],
      Mobile_No:this.updateForm.value['phoneNumber'],
      Job_Location:this.updateForm.value['location']
   }

   console.log("updateData",empdata);

    this.service.updateEmp(empdata,empId).subscribe((res:any)=>{
      console.log(res);
      console.log(res);
      if (res && res.message) {
        alert(res.message); 
      }
      this.ishide=true;

    },
    error=>{
      console.log(error);
      if (error.error && error.error.message) {
        console.log(error);
      // alert("update failure");
      alert(error.error.message); 
      }
    });
  }


// Employement Details

  form2(){
    this.employementForm=this.formbulider.group({
      effectiveStartDate:['',Validators.required],
      effectiveEndDate:['4712-12-31'],
      personType:[,Validators.required],
      status:['',Validators.required],
      organizationName:['',Validators.required],
      department:['',Validators.required],
      designation:['',Validators.required],
      confirmationDate:['',],
      dateOfJoining:['',Validators.required],
      currentAnnualSalary:['',Validators.required],
      currentCompanyExp:['',Validators.required],
      previousAnnualSalary:['',Validators.required],
      previousExp:['',Validators.required],
      totalExp:['',Validators.required],
      probationPeriod:['',Validators.required],
      noticePeriod:['',Validators.required],
    });

  }
  
  employementData(){
    console.log(this.employementForm.value);

    const data = {
      Effective_Start_Date:this.employementForm.value['effectiveStartDate'],
      Effective_End_Date:this.employementForm.value['effectiveEndDate'],
      Person_Type:this.employementForm.value['personType'],
      Status:this.employementForm.value['status'],
      Organization_Name:this.employementForm.value['organizationName'],
      Department:this.employementForm.value['department'],
      Designation:this.employementForm.value['designation'],
      Confirmation_Date:this.employementForm.value['confirmationDate'],
      Date_Of_Joining:this.employementForm.value['dateOfJoining'],
      Ctc:this.employementForm.value['currentAnnualSalary'],
      Current_Company_Experience:this.employementForm.value['currentCompanyExp'],
      Post_Annual_Salary:this.employementForm.value['previousAnnualSalary'],
      Previous_Experience:this.employementForm.value['previousExp'],
      Total_Experience:this.employementForm.value['totalExp'],
      Probation_Period:this.employementForm.value['probationPeriod'],
      Notice_Period:this.employementForm.value['noticePeriod']
    }

    console.log("data",data);

    this.service.empData(this.empData.Employee_id,data).subscribe((res:any)=>{

      if (res && res.message) {
        alert(res.message);
      }
    },
    error=>{
      console.log(error);
      if (error.error && error.error.message){
        alert(error.error.message)
      }
      else {
        console.log(error);
        alert("An error occurred: " + error.statusText);
      } 
    })
  }

  
}
