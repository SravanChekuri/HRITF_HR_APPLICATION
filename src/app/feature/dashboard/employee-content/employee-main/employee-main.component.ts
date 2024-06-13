import { Component, OnInit } from '@angular/core';
import { EmployeeAddService } from 'src/app/feature/Services/employee-add.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'employee-main',
  templateUrl: './employee-main.component.html',
  styleUrls: ['./employee-main.component.css']
})
export class EmployeeMainComponent implements OnInit{

  empData:any;

  textInput: string | Date;

  effStartDate:any;

  effEndDate:any;

  employeData:any;

  employementData:any;

  presentEmployeeAddress:any;

  permanentEmployeeAddress:any;

  errorMessage: string = '';

  empAllData:any;

  onchangeText:any;

  editEmp:boolean=true;

  searchHide:boolean=true;

  constructor(private service:EmployeeAddService){

    this.textInput = '';

  }

  ngOnInit(){ }

updateEmp(filtemp,employementData,presentEmployeeAddress,permanentEmployeeAddress) {

    // console.log("filtemp",filtemp);
    // console.log("editdata",employementData);
    // console.log("editdata", filtemp);

    localStorage.removeItem('employementData');

    if (employementData !== undefined){
      localStorage.setItem('employementData',JSON.stringify(employementData));
      // console.log("employementData form localstorage:",this.employementData);
    }

    localStorage.removeItem('presentAddress');

    if(presentEmployeeAddress !== undefined){
      localStorage.setItem('presentAddress',JSON.stringify(presentEmployeeAddress));
      // console.log("employee present address from localstorage:",presentEmployeeAddress);  
    }

    localStorage.removeItem('permanentAddress');

    if(permanentEmployeeAddress !== undefined){
      localStorage.setItem('permanentAddress',JSON.stringify(permanentEmployeeAddress));
      // console.log("employee permanent address from localstorage:",permanentEmployeeAddress);
    }

    localStorage.setItem('empData', JSON.stringify(filtemp));
    // console.log("empdata  from localstorage:",filtemp);
}



onStartDateChange(event:any){

  this.effStartDate = event.target.value;
  // console.log("Start date:",this.effStartDate);
  localStorage.setItem('effectiveStartDate',this.effStartDate);
}

onEndDateChange(event:any){

  this.effEndDate = event.target.value;
  // console.log("End date:", this.effEndDate);
}

onSubmit(){
  this.editEmp=true;
  // console.log("Input Textbox:",this.textInput);
  // console.log(this.effStartDate);
  this.clearEmployeeData();

  this.service.sendDateOrEmpnumber(this.textInput,this.effStartDate,this.effEndDate).subscribe((res)=>{
    this.searchHide=false;
    // console.log("res",res);
    // console.log("responce",res['EMPLOYEE_DETAILS']);
    
    this.employeData = res['EMPLOYEE_DETAILS'];
    // console.log("Employee data:",this.employeData);

    this.employementData = res['Employement_Details'];
    // console.log("Employement Data:",this.employementData);

    this.permanentEmployeeAddress=res['Home_Address_Details']
    // console.log("this.permanentEmployeeAddress", this.permanentEmployeeAddress);
    
    this.presentEmployeeAddress=res['Work_Address_Details']
    // console.log("presentEmployeeAddress",this.presentEmployeeAddress);

    this.textInput = '';

    this.effStartDate = '';

    this.effEndDate = '';

  },error=>{

    // console.log(error);
    Swal.fire({
      position: "top",
      icon: "error",
      title: "Failed ☹️",
      text: `${error.error.message}`,
      width:400,
    });
  });
}

clearEmployeeData(): void {
  this.employeData = null;
  this.empAllData = [];
}

onEmployeeNumberEnter(event:any){

  const input = event.target as HTMLInputElement;

  this.editEmp=false;

  this.searchHide=true;

  if (input.value === '') {
    this.clearEmployeeData();
  }
  // console.log(event.target.value);
  this.onchangeText=event.target.value;

  this.service.getAllEmployeeDetails(this.onchangeText).subscribe((res)=>{
    // console.log("onchage res",res);

    this.empAllData=res;

    // console.log("length",this.empAllData);
    // console.log("this.empAllData", this.empAllData);

  },error=>{
    // console.log(error);

    this.empAllData = undefined;

      this.errorMessage=error.error.message;

      // console.log("this.errorMessage",this.errorMessage);
  });
}



}
