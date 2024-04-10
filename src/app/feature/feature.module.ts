import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee/add-employee.component';



@NgModule({
  declarations: [
    LoginComponent,
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FeatureModule { }
