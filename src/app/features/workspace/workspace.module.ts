import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceListComponent } from './workspace-list/workspace-list.component';
import { WorkspaceDetailComponent } from './workspace-detail/workspace-detail.component';


@NgModule({
  declarations: [
    WorkspaceListComponent,
    WorkspaceDetailComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule
  ]
})
export class WorkspaceModule { }
