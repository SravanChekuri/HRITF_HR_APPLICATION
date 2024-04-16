import { Component, OnInit } from '@angular/core';
import { EmployeeAddService } from 'src/app/feature/Services/employee-add.service';

@Component({
  selector: 'employee-main',
  templateUrl: './employee-main.component.html',
  styleUrls: ['./employee-main.component.css']
})
export class EmployeeMainComponent implements OnInit{

  empData:any;
  allEmp:any=[];
  searchTxt:any;
  filteredEmp:any=[];

  constructor(private service:EmployeeAddService){}

  ngOnInit(){
    this.getAllperson();
    console.log(this.allEmp);
  }

  getAllperson(){
    this.service.getAllperson().subscribe(res=>{
      console.log(res);
      this.empData=res['data'];
      this.allEmp=res['data'];
      this.filteredEmp=res['data'];
    })
  }
  filtEmpRes(event:any){
    const filterValue=event.target.value;
    let filterValueLower=filterValue.toLowerCase();
    if (filterValue===''){
      this.filteredEmp=this.allEmp;
    }
    else{
      this.filteredEmp=this.allEmp.filter((employee)=>employee.Employee_First_Name.toLowerCase().includes(filterValueLower) ||
      employee.Employee_Number.toLowerCase().includes(filterValueLower)||
      employee.Last_Name.toLowerCase().includes(filterValueLower)||
      employee.Email.toLowerCase().includes(filterValueLower))
    }
  }

}
