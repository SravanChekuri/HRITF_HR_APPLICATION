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
      EmployeeNumber:this.employeeInfoForm.value['EmployeeNumber'],
      Title:this.employeeInfoForm.value['Title'],
      FirstName:this.employeeInfoForm.value['FirstName'],
      MiddleName:this.employeeInfoForm.value['MiddleName'],
      LastName:this.employeeInfoForm.value['LastName'],
      Gender:this.employeeInfoForm.value['Gender'],
      Email:this.employeeInfoForm.value['Email'],
      AnnualCTC:this.employeeInfoForm.value['AnnualCTC'],
      Department:this.employeeInfoForm.value['Department'],
      Designation:this.employeeInfoForm.value['Designation'],
      JobLocation:this.employeeInfoForm.value['JobLocation'],
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
      DateofJoining:this.joingDetailsForm.value['DateofJoining'],
      ConfirmationDate:this.joingDetailsForm.value['ConfirmationDate'],
      ProbationPeriod:this.joingDetailsForm.value['ProbationPeriod'],
      PreRevision:this.joingDetailsForm.value['PreRevision'],
      PostRevision:this.joingDetailsForm.value['PostRevision'],
      NoticePeriod:this.joingDetailsForm.value['NoticePeriod'],
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
        DateofBirth:this.personalDetailsForm.value['DateofBirth'],
        BloodGroup:this.personalDetailsForm.value['BloodGroup'],
        FatherName:this.personalDetailsForm.value['FatherName'],
        MaritalStatus:this.personalDetailsForm.value['MaritalStatus'],
        Nationality:this.personalDetailsForm.value['Nationality'],
        PersonalEmail:this.personalDetailsForm.value['PersonalEmail'],
        PlaceofBirth:this.personalDetailsForm.value['PlaceofBirth'],
        CountryofOrigin:this.personalDetailsForm.value['CountryofOrigin'],
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
