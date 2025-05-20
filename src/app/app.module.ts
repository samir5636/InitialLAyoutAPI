import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { AngularSplitModule, SplitAreaComponent, SplitComponent } from 'angular-split';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { RequestModule } from './features/request/request.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    MatSidenavContainer,
    MatSidenavContent,
    AngularSplitModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatButtonToggleModule,
    MonacoEditorModule.forRoot(),
    SplitComponent,
    SplitAreaComponent,
    RequestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
