import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { HeadSidenavWrapperComponent } from './core/Navigation-Content/head-sidenav-wrapper/head-sidenav-wrapper.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'Home',component:HeadSidenavWrapperComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
