import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'emp-search',
  templateUrl: './emp-search.component.html',
  styleUrls: ['./emp-search.component.css']
})
export class EmpSearchComponent {

  constructor(private router:Router){}

  gotoAddEmp(){
    this.router.navigate(['/addEmp']);
  }
}
