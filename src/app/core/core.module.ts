import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopHeaderComponent } from './Navigation-Content/top-header/top-header.component';
import { SideNavComponent } from './Navigation-Content/side-nav/side-nav.component';
import { HeadSidenavWrapperComponent } from './Navigation-Content/head-sidenav-wrapper/head-sidenav-wrapper.component';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from './Navigation-Content/dashboard/dashboard.component';
//import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    TopHeaderComponent,
    SideNavComponent,
    HeadSidenavWrapperComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class CoreModule { }
