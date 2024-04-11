import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { HeadbarComponent } from './navigation-content/headbar/headbar.component';
import { SidebarComponent } from './navigation-content/sidebar/sidebar.component';
import { HeadSideWapperComponent } from './navigation-content/head-side-wapper/head-side-wapper.component';
import { DashboardRoutingModule } from '../feature/dashboard/dashboard-routing/dashboard-routing.module';
import { DropdownComponent } from './navigation-content/sidebar/dropdown/dropdown.component';
// import { FooterComponent } from './navigation-content/footer/footer.component';


@NgModule({
  declarations: [
    PageNotfoundComponent,
    HeadbarComponent,
    SidebarComponent,
    HeadSideWapperComponent,
    DropdownComponent,
    // FooterComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [
    HeadSideWapperComponent
  ]
})
export class CoreModule { }
