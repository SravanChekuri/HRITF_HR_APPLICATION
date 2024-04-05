import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent {

  constructor(private router:Router){}

  gotohome(){
    this.router.navigate(['/home']);
  }
}
