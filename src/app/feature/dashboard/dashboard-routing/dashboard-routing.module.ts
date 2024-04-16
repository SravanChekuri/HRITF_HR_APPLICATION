import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { CommonModule } from '@angular/common';
import { DashHomeComponent } from '../dash-home/dash-home.component';
import { EmployeeMainComponent } from '../employee-content/employee-main/employee-main.component';
import { EmployeeSearchComponent } from '../employee-content/employee-search/employee-search.component';
import { EmployeeAddComponent } from '../employee-content/employee-add/employee-add.component';
import { EmployeeDetailsComponent } from '../employee-content/employee-details/employee-details.component';

const routes: Routes = [
  {path: "",
  component: MainLayoutComponent,
  children:[
      {path:'', component:DashHomeComponent},
      {path:'employees',
      component:EmployeeMainComponent,
      children: [
        {path: '', component:EmployeeSearchComponent},
        {path:'addemp',component:EmployeeAddComponent},
        {path:'empProfile',component:EmployeeMainComponent},
        {path:'empdetails',component:EmployeeDetailsComponent}
      ]
      }
  ]
}
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
