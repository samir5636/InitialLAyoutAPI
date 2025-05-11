import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    ResponseRoutingModule
  ]
})
export class ResponseModule { }
