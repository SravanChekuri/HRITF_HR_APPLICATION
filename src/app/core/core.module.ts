import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { HeadbarComponent } from './navigation-content/headbar/headbar.component';
import { SidebarComponent } from './navigation-content/sidebar/sidebar.component';
import { HeadSideWapperComponent } from './navigation-content/head-side-wapper/head-side-wapper.component';



@NgModule({
  declarations: [
    PageNotfoundComponent,
    HeadbarComponent,
    SidebarComponent,
    HeadSideWapperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeadSideWapperComponent
  ]
})
export class CoreModule { }
