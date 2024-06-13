import { Component, ViewChild } from '@angular/core';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AuthService } from '../../../feature/Auth-Service/auth.service';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private AuthService:AuthService) {}

  onlogout(){
    this.AuthService.Logout();
  }


  dropdownItems = [

    { name: 'Overview',route:'/home/employees',icon:'fa-clipboard' },
    { name:'Add new Profile',route:'/home/employees/addemp',icon: 'fa-user-plus'},
    { name:'View Profiles',route:'/home/employees/empProfile',icon: 'fa-user'},
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
        icon: 'fa-user-plus'},
      {
        name: 'View all Users',
        route: '/home/employees/all-users',
        icon: 'fa-user'
      },
      // {
      //   name: 'Backend Data',
      //   route: '/home/employees/backend-data',
      //   icon: 'fa-cog'
      // }
    ],
      icon: 'fa-cog'
    },
  ];

  @ViewChild(DropdownComponent) dropdownComponent: DropdownComponent;


  collapseEmployeesDropdown() {
    if (this.dropdownComponent) {
      this.dropdownComponent.collapseEmployeesDropdown();
    }
  }


}
