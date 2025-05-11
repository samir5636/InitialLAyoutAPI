import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestEditorComponent } from './request-editor/request-editor.component';
import { RequestParamsComponent } from './request-params/request-params.component';
import { RequestAuthorizationComponent } from './request-authorization/request-authorization.component';
import { RequestHeadersComponent } from './request-headers/request-headers.component';
import { RequestBodyComponent } from './request-body/request-body.component';
import { RequestDocsComponent } from './request-docs/request-docs.component';


@NgModule({
  declarations: [
    RequestEditorComponent,
    RequestParamsComponent,
    RequestAuthorizationComponent,
    RequestHeadersComponent,
    RequestBodyComponent,
    RequestDocsComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule
  ]
})
export class RequestModule { }
