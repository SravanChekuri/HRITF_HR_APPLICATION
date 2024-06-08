import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './login/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotpasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  exports:[
   
    LoginComponent
  ]
})
export class FeatureModule { }
