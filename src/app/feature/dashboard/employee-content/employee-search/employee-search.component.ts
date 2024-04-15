import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeAddService } from 'src/app/feature/Services/employee-add.service';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit{

  empData:any;
  allEmp:any=[];
  searchTxt:any;
  filteredEmp:any=[];
  


  constructor(private router:Router,private service:EmployeeAddService){}

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

  addbtnclk(){
    this.router.navigate(['/home/employees/addemp']);
  }

}


