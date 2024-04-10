import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { PageNotfoundComponent } from './core/page-notfound/page-notfound.component';
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path: 'home', loadChildren: () => import('./feature/dashboard/dashboard.module').then(mod => mod.DashboardModule),},
  {path:'**',component:PageNotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
