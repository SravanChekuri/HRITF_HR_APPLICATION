import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { EmployeeMainComponent } from './employee-content/employee-main/employee-main.component';
import { EmployeeAddComponent } from './employee-content/employee-add/employee-add.component';
import { EmployeeDetailsComponent } from './employee-content/employee-details/employee-details.component';
import { EmployeeSearchComponent } from './employee-content/employee-search/employee-search.component';
import { EmployeeLettersTemplatesComponent } from './employee-content/employee-letters-templates/employee-letters.component';
import { EmployeeGenerateLettersComponent } from './employee-content/employee-generate-letters/employee-generate-letters.component';
import { EmployeeNewroleComponent } from './employee-content/employee-newrole/employee-newrole.component';
import { EmployeeViewallUsersComponent } from './employee-content/employee-viewall-users/employee-viewall-users.component';
import { EmployeeBackendDataSettingsComponent } from './employee-content/employee-backend-data-settings/employee-backend-data-settings.component';



@NgModule({
  declarations: [
    MainLayoutComponent,
    DashHomeComponent,
    EmployeeMainComponent,
    EmployeeAddComponent,
    EmployeeDetailsComponent,
    EmployeeSearchComponent,
    EmployeeLettersTemplatesComponent,
    EmployeeGenerateLettersComponent,
    EmployeeNewroleComponent,
    EmployeeViewallUsersComponent,
    EmployeeBackendDataSettingsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
})
export class DashboardModule { }
