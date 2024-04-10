import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    FeatureModule,
    SharedModule,
    // DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
