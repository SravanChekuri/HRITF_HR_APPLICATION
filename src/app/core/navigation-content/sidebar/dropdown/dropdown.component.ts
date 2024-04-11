import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {

  constructor(private router:Router){}
  @Input() items:any[];

  isSubDropdownOpen:boolean=false;

  toggleSubDropdown(){
    this.isSubDropdownOpen=!this.isSubDropdownOpen;
  }
  onDropdownItemClick(item: any) {
    if (item.route) {
        this.router.navigate([item.route]);
    } else {
        item.isSubDropdownOpen = !item.isSubDropdownOpen;
    }
  }
}
