import { formatDate } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDetailsService } from 'src/app/feature/Services/employee-details.service';
import { LettersService } from 'src/app/feature/Services/letters.service';


@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})


export class EmployeeDetailsComponent implements OnInit{
  empData:any;
  data:any;
  empDataDetails:any;
  updateForm:FormGroup;
  employeeForm:FormGroup; 

  
  constructor(private service:LettersService,private empdetailsseevice:EmployeeDetailsService,private formbulider:FormBuilder){
   
    this.empData = JSON.parse(localStorage.getItem('empData'));
    this.editemp();
    console.log('this.empData',this.empData);

  }
  ngOnInit(): void {
    this.form1();
  }

  form1(){
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
      endDate:[formatDate(this.empData.EFFECTIVE_END_DATE,'yyyy-MM-dd','en'),Validators.required]
    })
  }

  form2(){
    this.employeeForm=this.formbulider.group({
      assignmentId:[''],
      employeeId:[this.empData.Employee_id],
      organizationName:['',Validators.required],
      designation:['',Validators.required],
      confirmationDate:['',Validators.required],
      status:['',Validators.required],
      probationPeriod:['',Validators.required],
      noticePeriod:['',Validators.required],
      currentCompanyExp:['',Validators.required],
      previousExp:['',Validators.required],
      totalExp:['',Validators.required],
      preAnnualSalary:['',Validators.required],
      postAnnualSalary:['',Validators.required],
      EffectiveStartDate:['',Validators.required],
      effectiveEndDate:['4712-12-31']
    });
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

  employeeData(){
    console.log(this.employeeForm.value);
    const data={
    Assignment_Id:this.employeeForm.value['assignmentId'],
    Employee_Id:this.employeeForm.value['employeeId'],
    Organization_Name:this.employeeForm.value['organizationName'],
    Designation:this.employeeForm.value['designation'],
    Confirmation_Date:this.employeeForm.value['confirmationDate'],
    Status:this.employeeForm.value['status'],
    Probation_Period:this.employeeForm.value['probationPeriod'],
    Notice_Period:this.employeeForm.value['noticePeriod'],
    Current_Company_Experience:this.employeeForm.value['currentCompanyExp'],
    Previous_Experience:this.employeeForm.value['previousExp'],
    Total_Experience:this.employeeForm.value['totalExp'],
    Pre_Annual_Salary:this.employeeForm.value['preAnnualSalary'],
    Post_Annual_Salary:this.employeeForm.value['postAnnualSalary'],
    Effective_Start_Date:this.employeeForm.value['EffectiveStartDate'],
    Effective_End_Date:this.employeeForm.value['effectiveEndDate']
 }
 console.log("data",data);
 
 this.empdetailsseevice.empData(this.empData.Employee_id,data).subscribe((res)=>{
   alert("send data success")
 },
 error=>{
   alert("send data fail")
 });
  }

  editemp(){
    //  console.log("dfhk",this.data.Notice_Period);
     
      //alert("dgfhjk")
      // this.employeeForm=this.formbulider.group({
      //   employeeId:[this.empData.Employee_id],
      //   organizationName:['HRIT'],
      //   designation:['Developer'],
      this.empdetailsseevice.getEmpData(this.empData.Employee_id).subscribe((res)=>{
        console.log(this.empData.Employee_id);
       
        console.log("empDataDetails",res);
        this.empDataDetails=res['data']
   
        //console.log("empData",this.empDataDetails.ORGANIZATION_NAME);
        this.employeeForm=this.formbulider.group({
          assignmentId:[this.empDataDetails.ASSIGNMENT_ID],
          employeeId:[this.empData.Employee_id],
          organizationName:[this.empDataDetails.ORGANIZATION_NAME,Validators.required],
          designation:[this.empDataDetails.DESIGNATION,Validators.required],
          confirmationDate:[formatDate(this.empDataDetails.CONFIRMATION_DATE, 'yyyy-MM-dd','en'),Validators.required],
          status:[this.empDataDetails.STATUS,Validators.required],
          probationPeriod:[this.empDataDetails.PROBATION_PERIOD,Validators.required],
          noticePeriod:[this.empDataDetails.NOTICE_PERIOD,Validators.required],
          currentCompanyExp:[this.empDataDetails.CURRENT_COMPANY_EXPERIENCE,Validators.required],
          previousExp:[this.empDataDetails.PREVIOUS_EXPERIENCE,Validators.required],
          totalExp:[this.empDataDetails.TOTAL_EXPERIENCE,Validators.required],
          preAnnualSalary:[this.empDataDetails.PRE_ANNUAL_SALARY,Validators.required],
          postAnnualSalary:[this.empDataDetails.POST_ANNUAL_SALARY,Validators.required],
          EffectiveStartDate:[formatDate(this.empDataDetails.EFFECTIVE_START_DATE, 'yyyy-MM-dd','en'),Validators.required],
          effectiveEndDate:['4712-12-31']
     })

      });
    }
   
  
  
}
