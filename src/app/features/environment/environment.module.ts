import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentRoutingModule } from './environment-routing.module';
import { EnvironmentListComponent } from './environment-list/environment-list.component';
import { EnvironmentDetailComponent } from './environment-detail/environment-detail.component';


@NgModule({
  declarations: [
    EnvironmentListComponent,
    EnvironmentDetailComponent
  ],
  imports: [
    CommonModule,
    EnvironmentRoutingModule
  ]
})
export class EnvironmentModule { }
