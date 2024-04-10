import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent {

  constructor(private router:Router){}

  addbtnclk(){
    this.router.navigate(['/home/employees/addemp']);
  }

}
