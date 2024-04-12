import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { EmployeeDetailsService } from 'src/app/feature/Services/employee-details.service';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit{

  employeeInfoForm:FormGroup;
  joingDetailsForm:FormGroup;
  personalDetailsForm:FormGroup;
  addressDetailsForm:FormGroup;

  // empAddressData:FormGroup;

  constructor(
              private formbuilder:FormBuilder,
              private service:EmployeeDetailsService
              ){}
  
  ngOnInit():void{
    this.empInfo();
    this.empJoiningDetails();
  }

  //Employee Information Start
  empInfo(){
    this.employeeInfoForm=this.formbuilder.group({
      EmployeeNumber:['',[]],
      Title:['',[]],
      FirstName:['',[]],
      MiddleName:['',[]],
      LastName:['',[]],
      Gender:['',[]],
      Email:['',[]],
      AnnualCTC:['',[]],
      Department:['',[]],
      Designation:['',[]],
      JobLocation:['',[]]
    })
  }
  submitEmpInfo(){
    console.log(this.employeeInfoForm.value);

    const empInfoData={
      Employee_Number:this.employeeInfoForm.value['EmployeeNumber'],
      Title:this.employeeInfoForm.value['Title'],
      First_Name:this.employeeInfoForm.value['FirstName'],
      Middle_Name:this.employeeInfoForm.value['MiddleName'],
      Last_Name:this.employeeInfoForm.value['LastName'],
      Gender:this.employeeInfoForm.value['Gender'],
      Email:this.employeeInfoForm.value['Email'],
      Annual_CTC:this.employeeInfoForm.value['AnnualCTC'],
      Department:this.employeeInfoForm.value['Department'],
      Designation:this.employeeInfoForm.value['Designation'],
      Job_Location:this.employeeInfoForm.value['JobLocation'],
    }
    console.log(empInfoData);
    //POST method
    this.service.updateEmployeeDetails1(empInfoData).subscribe(res =>{
      console.log(res);
    }, error=>{
      console.log(error); 
    }) 
    // //GET method
    this.service.updateEmployeeDetails2().subscribe(res=>{
      console.log(res);
    },error=>{
      console.log(error);
    })
  } 

 
  //Employee Information end

  //Employee Joining details Start
  empJoiningDetails(){
    this.joingDetailsForm=this.formbuilder.group({
      DateofJoining:['',[]],
      ConfirmationDate:['',[]],
      ProbationPeriod:['',[]],
      PreRevision:['',[]],
      PostRevision:['',[]],
      NoticePeriod:['',[]]
    })
  }
  submitEmpJoining(){
    console.log(this.joingDetailsForm.value);

    const empJoiningData={
      Date_of_Joining:this.joingDetailsForm.value['DateofJoining'],
      Confirmation_Date:this.joingDetailsForm.value['ConfirmationDate'],
      Probation_Period:this.joingDetailsForm.value['ProbationPeriod'],
      Pre_Revision:this.joingDetailsForm.value['PreRevision'],
      Post_Revision:this.joingDetailsForm.value['PostRevision'],
      Notice_Period:this.joingDetailsForm.value['NoticePeriod'],
    }
    console.log(empJoiningData);
    
    // //POST method
    this.service.empJoiningDetails1(empJoiningData).subscribe(res =>{
      console.log(res);
    }, error=>{
      console.log(error); 
    }) 
    // //GET method
    this.service.empJoiningDetails2().subscribe(res =>{
      console.log(res);
    }, error=>{
      console.log(error); 
    }) 
  }
  //Employee Joining details end

  //Employee Personal details Start
  empPersonalDetails(){
    this.personalDetailsForm=this.formbuilder.group({
      DateofBirth:['',[]],
      BloodGroup:['',[]],
      FatherName:['',[]],
      MaritalStatus:['',[]],
      Nationality:['',[]],
      PersonalEmail:['',[]],
      PlaceofBirth:['',[]],
      CountryofOrigin:['',[]],
      Religion:['',[]]
    })
  }

    submitPersonalDetails(){
      console.log(this.personalDetailsForm.value);

      const empPersonalData={
        Date_of_Birth:this.personalDetailsForm.value['DateofBirth'],
        Blood_Group:this.personalDetailsForm.value['BloodGroup'],
        Father_Name:this.personalDetailsForm.value['FatherName'],
        Marital_Status:this.personalDetailsForm.value['MaritalStatus'],
        Nationality:this.personalDetailsForm.value['Nationality'],
        Personal_Email:this.personalDetailsForm.value['PersonalEmail'],
        Place_of_Birth:this.personalDetailsForm.value['PlaceofBirth'],
        Country_of_Origin:this.personalDetailsForm.value['CountryofOrigin'],
        Religion:this.personalDetailsForm.value['Religion'],
      }
      console.log(empPersonalData);
      
      // //POST method
      this.service.empPersonalDetails1(empPersonalData).subscribe(res =>{
        console.log(res);
      }, error=>{
        console.log(error); 
      }) 
      // //GET method
      this.service.empPersonalDetails2().subscribe(res =>{
        console.log(res);
      }, error=>{
        console.log(error); 
      }) 
  
    }
  //Employee Personal details end


}
