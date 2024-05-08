import { Component, ViewChild } from '@angular/core';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  dropdownItems = [
    { name: 'Overview',route:'/home/employees',icon:'fa-clipboard' },
    { name:'Add new Employee',route:'/home/employees/addemp',icon: 'fa-user-plus'},
    { name:'Employee Profile',route:'/home/employees/empProfile',icon: 'fa-user'},
    { 
      name: 'Letters', 
      subItems: [
        { name: 'Generate Letters',route:'/home/employees/generate-letters',icon: 'fa-envelope'}, 
        { name: 'Letter Templates',route:'/home/employees/letter-templates',icon: 'fa-file-alt'}
      ],
      icon: 'fa-envelope' 
    },
    { name: 'Admin Settings',subItems:[
      {
        name:'Add a New User',
        route:'/home/employees/add-newrole',
        icon: 'fa-cog'}],
      icon: 'fa-cog'
    },
  ];

  @ViewChild(DropdownComponent) dropdownComponent: DropdownComponent;

  constructor() {
    // Populate dropdownItems
  }

  collapseEmployeesDropdown() {
    if (this.dropdownComponent) {
      this.dropdownComponent.collapseEmployeesDropdown();
    }
  }

}
