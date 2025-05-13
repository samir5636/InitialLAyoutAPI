import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { MatTabsModule } from '@angular/material/tabs'; // For mat-tab-group
import { NgxMonacoEditorModule } from 'ngx-monaco-editor'; // For ngx-monaco-editor

import { ResponseRoutingModule } from './response-routing.module';
import { ResponseBodyComponent } from './response-body/response-body.component';
import { ResponseCookiesComponent } from './response-cookies/response-cookies.component';
import { ResponseHeadersComponent } from './response-headers/response-headers.component';
import { ResponseTestsComponent } from './response-tests/response-tests.component';


@NgModule({
  declarations: [
    ResponseBodyComponent,
    ResponseCookiesComponent,
    ResponseHeadersComponent,
    ResponseTestsComponent
  ],
  imports: [
    CommonModule,
    ResponseRoutingModule,
    FormsModule,
    MatTabsModule,
    NgxMonacoEditorModule.forRoot(), // Required if not already imported globally

  ]
})
export class ResponseModule { }
