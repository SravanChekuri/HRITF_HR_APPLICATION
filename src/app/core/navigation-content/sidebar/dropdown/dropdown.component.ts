import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {

  constructor(private router:Router){}
  
  @Input() items:any[];

  @Output() dropdownToggled = new EventEmitter<boolean>(); 

  isSubDropdownOpen:boolean=false;

  toggleSubDropdown(){
    this.isSubDropdownOpen=!this.isSubDropdownOpen;
    this.dropdownToggled.emit(this.isSubDropdownOpen);
  }

  collapseEmployeesDropdown() {
    this.isSubDropdownOpen = false;
  }
  
  onDropdownItemClick(item: any) {
    if (item.route) {
        this.router.navigate([item.route]);
    } else {
        item.isSubDropdownOpen = !item.isSubDropdownOpen;
    }
  }

  onSubDropdownItemClick(subItem:any){
    if(subItem.route){
      this.router.navigate([subItem.route]);
    }
  }
}
