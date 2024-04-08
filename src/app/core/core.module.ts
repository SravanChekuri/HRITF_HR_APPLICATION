import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopHeaderComponent } from './Navigation-Content/top-header/top-header.component';
import { SideNavComponent } from './Navigation-Content/side-nav/side-nav.component';
import { HeadSidenavWrapperComponent } from './Navigation-Content/head-sidenav-wrapper/head-sidenav-wrapper.component';



@NgModule({
  declarations: [
    TopHeaderComponent,
    SideNavComponent,
    HeadSidenavWrapperComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
