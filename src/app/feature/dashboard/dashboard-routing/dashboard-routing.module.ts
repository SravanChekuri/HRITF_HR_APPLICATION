import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { CommonModule } from '@angular/common';
import { DashHomeComponent } from '../dash-home/dash-home.component';
import { EmployeeMainComponent } from '../employee-content/employee-main/employee-main.component';
import { EmployeeSearchComponent } from '../employee-content/employee-search/employee-search.component';
import { EmployeeAddComponent } from '../employee-content/employee-add/employee-add.component';
import { EmployeeDetailsComponent } from '../employee-content/employee-details/employee-details.component';
import { EmployeeLettersTemplatesComponent } from '../employee-content/employee-letters-templates/employee-letters.component';
import { EmployeeGenerateLettersComponent } from '../employee-content/employee-generate-letters/employee-generate-letters.component';
import { EmployeeNewroleComponent } from '../employee-content/employee-newrole/employee-newrole.component';
import { AuthGuard } from '../../Route-Guard/auth.guard';

const routes: Routes = [
  {path: "",
  component: MainLayoutComponent,
  canActivate:[AuthGuard],
  children:[
      {path:'', component:DashHomeComponent,canActivate:[AuthGuard]},
      {path:'employees',
      component:EmployeeMainComponent,
      canActivate:[AuthGuard],
      children: [
        {path: '', component:EmployeeSearchComponent , canActivate:[AuthGuard]},
        {path:'addemp',component:EmployeeAddComponent, canActivate:[AuthGuard]},
        {path:'empProfile',component:EmployeeMainComponent, canActivate:[AuthGuard]},
        {path:'add-newrole',component:EmployeeNewroleComponent, canActivate:[AuthGuard]},
        {path:'empdetails',component:EmployeeDetailsComponent, canActivate:[AuthGuard]},
        {path:'letter-templates',component:EmployeeLettersTemplatesComponent, canActivate:[AuthGuard]},
        {path:'generate-letters',component:EmployeeGenerateLettersComponent, canActivate:[AuthGuard]},
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
