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



  constructor(private service:EmployeeAddService){

    this.textInput = '';
  }

  ngOnInit(){

  }

  // getAllperson(){
  //   this.service.getAllperson().subscribe(res=>{
  //     // console.log(res);
  //     this.empData=res['data'];
  //     this.allEmp=res['data'];
  //     this.filteredEmp=res['data'];
  //   })
  // }
  // filtEmpRes(event:any){
  //   const filterValue=event.target.value;
  //   let filterValueLower=filterValue.toLowerCase();
  //   if (filterValue===''){
  //     this.filteredEmp=this.allEmp;
  //   }
  //   else{
  //     this.filteredEmp=this.allEmp.filter((employee)=>employee.Employee_First_Name.toLowerCase().includes(filterValueLower) ||
  //     employee.Employee_Number.toLowerCase().includes(filterValueLower)||
  //     employee.Last_Name.toLowerCase().includes(filterValueLower)||
  //     employee.Email.toLowerCase().includes(filterValueLower))
  //   }
  // }


  updateEmp(filtemp,employementData,presentEmployeeAddress,permanentEmployeeAddress) {

    console.log("filtemp",filtemp);
    console.log("editdata",employementData);
    // console.log("editdata", filtemp);

    localStorage.removeItem('employementData');
    if (employementData !== undefined){
      localStorage.setItem('employementData',JSON.stringify(employementData));
      console.log("employementData form localstorage:",this.employementData);
      
    }

    localStorage.removeItem('presentAddress');
    if(presentEmployeeAddress !== undefined){
      localStorage.setItem('presentAddress',JSON.stringify(presentEmployeeAddress));
      console.log("employee present address from localstorage:",presentEmployeeAddress);
      
    }
    localStorage.removeItem('permanentAddress');
    if(permanentEmployeeAddress !== undefined){
      localStorage.setItem('permanentAddress',JSON.stringify(permanentEmployeeAddress));
      console.log("employee permanent address from localstorage:",permanentEmployeeAddress);
    }

    localStorage.setItem('empData', JSON.stringify(filtemp));
    console.log("empdata  from localstorage:",filtemp);
    

}

onStartDateChange(event:any){
  this.effStartDate = event.target.value;
  console.log("Start date:",this.effStartDate);
  localStorage.setItem('effectiveStartDate',this.effStartDate);
}

onEndDateChange(event:any){
  this.effEndDate = event.target.value;
  console.log("End date:", this.effEndDate);
}

onSubmit(){
  console.log("Input Textbox:",this.textInput);
  console.log(this.effStartDate);

  this.service.sendDateOrEmpnumber(this.textInput,this.effStartDate,this.effEndDate).subscribe((res)=>{
    console.log(res);
    console.log("responce",res['EMPLOYEE_DETAILS']);
    
    this.employeData = res['EMPLOYEE_DETAILS'];
    console.log("Employee data:",this.employeData);

    this.employementData = res['Employement_Details'];
    console.log("Employement Data:",this.employementData);

    this.permanentEmployeeAddress=res['Home_Address_Details']
    console.log("this.permanentEmployeeAddress", this.permanentEmployeeAddress);
    
    this.presentEmployeeAddress=res['Work_Address_Details']
    console.log("presentEmployeeAddress",this.presentEmployeeAddress);


    

  },error=>{
    console.log(error);
    Swal.fire({
      position: "top",
      icon: "error",
      title: "Failed ☹️",
      text: `${error.error.message}`,
      width:400,
    });

    
  })
  
}

}
