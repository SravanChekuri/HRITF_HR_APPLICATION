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

  displayedEmp: any = [];

  recordCount:any;

  initialRecordsCount: number = 10;

  totalRecordsCount: number = 0;

  currentPage: number = 1;

  totalPages: number = 0;
  

  constructor(private router:Router,private service:EmployeeAddService){}

  ngOnInit(){
    this.getAllperson();
    // console.log(this.allEmp);
  }

  getAllperson(){
    this.service.getAllperson().subscribe(res=>{
      // console.log(res);
      this.empData=res['data'];
      this.allEmp=res['data'];
      this.filteredEmp=res['data'];
      this.recordCount = this.empData.length;
      // console.log("emp count:",this.recordCount);
      this.totalRecordsCount = this.filteredEmp.length;
      // this.loadInitialRecords();
      this.totalPages = Math.ceil(this.totalRecordsCount / this.initialRecordsCount);
      this.loadRecords();
    });
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
    this.totalRecordsCount = this.filteredEmp.length;
    this.totalPages = Math.ceil(this.totalRecordsCount / this.initialRecordsCount);
    this.currentPage = 1;
    this.loadRecords();
  }

  addbtnclk(){
    this.router.navigate(['/home/employees/addemp']);
  }


  loadRecords() {
    const start = (this.currentPage - 1) * this.initialRecordsCount;
    const end = this.currentPage * this.initialRecordsCount;
    this.displayedEmp = this.filteredEmp.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadRecords();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRecords();
    }
  }


}


