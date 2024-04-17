import { Component } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  dropdownItems = [
    { name: 'Overview',route:'/home/employees' },
    { name:'Add new Employee',route:'/home/employees/addemp'},
    { name:'Employee Profile',route:'/home/employees/empProfile'},
    { name: 'Letters', subItems: [{ name: 'Generate Letters' }, { name: 'Letter Templates',route:'/home/employees/empletters'}] },
    { name: 'Admin Settings' },
  ];

}
