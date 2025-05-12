import {Component, OnInit, Type, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpMethod} from '../../../core/models/http-method.enum';
import { HttpClientService } from '../../../core/services/http-client.service';
import { KeyValuePair } from '../../../core/models/request.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-request-editor',
  templateUrl: './request-editor.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MonacoEditorModule,
    FormsModule,
    // If using ngx-monaco-editor
  ],
  styleUrls: ['./request-editor.component.css']
})
export class RequestEditorComponent implements OnInit {
  requestForm!: FormGroup;
  httpMethods = Object.values(HttpMethod);

  // Default empty arrays for headers and params
  headers: KeyValuePair[] = [{ key: '', value: '', enabled: true }];
  params: KeyValuePair[] = [{ key: '', value: '', enabled: true }];

  // Response data
  responseData: any = null;
  isLoading = false;
  bodyEditorOptions = { theme: 'vs-dark', language: 'json', automaticLayout: true };

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.requestForm = this.fb.group({
      url: ['', [Validators.required]],
      method: [HttpMethod.GET, [Validators.required]],
      body: ['']
    });
  }

  addHeader(): void {
    this.headers.push({ key: '', value: '', enabled: true });
  }

  removeHeader(index: number): void {
    this.headers.splice(index, 1);
    if (this.headers.length === 0) {
      this.addHeader();
    }
  }

  addParam(): void {
    this.params.push({ key: '', value: '', enabled: true });
  }

  removeParam(index: number): void {
    this.params.splice(index, 1);
    if (this.params.length === 0) {
      this.addParam();
    }
  }

  sendRequest(): void {
    if (this.requestForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.responseData = null;

    const formValue = this.requestForm.value;
    let body = null;

    // Try to parse the JSON body if it's not empty
    if (formValue.body && formValue.body.trim()) {
      try {
        body = JSON.parse(formValue.body);
      } catch (e) {
        console.error('Invalid JSON body', e);
        alert('The request body is not valid JSON');
        this.isLoading = false;
        return;
      }
    }

    this.httpClientService.sendRequest(
      formValue.url,
      formValue.method,
      this.headers,
      this.params,
      body
    ).subscribe({
      next: (response) => {
        this.responseData = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Request error', error);
        this.responseData = {
          error: true,
          message: error.message || 'An error occurred during the request',
          details: error
        };
        this.isLoading = false;
      }
    });
  }
}
