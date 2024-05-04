import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { PageNotfoundComponent } from './core/page-notfound/page-notfound.component';
// import { SignupComponent } from './feature/login/sign-up/sign-up.component';
import { ForgotpasswordComponent } from './feature/login/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './feature/login/reset-password/reset-password.component';
const routes: Routes = [
  {path:'',component:LoginComponent},
  // {path:'signUp',component:SignupComponent},
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path: 'home', loadChildren: () => import('./feature/dashboard/dashboard.module').then(mod => mod.DashboardModule),},
  {path:'**',component:PageNotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
