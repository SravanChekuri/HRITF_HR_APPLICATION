import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: "",
  component: MainLayoutComponent,}
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
