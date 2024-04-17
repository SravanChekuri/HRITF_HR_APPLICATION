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
    { name: 'Letters', subItems: [{ name: 'Generate Letters',route:'/home/employees/generate-letters' }, { name: 'Letter Templates',route:'/home/employees/letter-templates'}] },
    { name: 'Admin Settings' },
  ];

}
