// request-editor.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpMethod } from '../../../core/models/http-method.enum';
import { HttpClientService } from '../../../core/services/http-client.service';
import { KeyValuePair } from '../../../core/models/request.model';
import {ResponseService} from '../../../core/services/response.service';

@Component({
  selector: 'app-request-editor',
  templateUrl: './request-editor.component.html',
  styleUrls: ['./request-editor.component.css'],
  standalone: false,
})
export class RequestEditorComponent implements OnInit {
  requestForm!: FormGroup;
  httpMethods = Object.values(HttpMethod);

  headers: KeyValuePair[] = [{ key: '', value: '', enabled: true }];
  params: KeyValuePair[] = [{ key: '', value: '', enabled: true }];

  responseData: any = null;
  isLoading = false;

  // Declare bodyType property
  bodyType: 'none' | 'json' | 'text' | 'form' = 'json'; // Default to JSON

  // Monaco editor options with improved configuration
  bodyEditorOptions = {
    theme: 'vs-dark',
    language: 'json', // Initial language
    automaticLayout: true, // Important for resizing
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    folding: true,
    lineNumbers: 'on',
    roundedSelection: true,
    contextmenu: true,
    wordWrap: 'on'
  };

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService,
    private responseService: ResponseService // Inject the new ResponseService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.setupDefaultHeaders();

    // Initial language setting based on default bodyType
    this.updateBodyEditorLanguage(this.bodyType);

    // Listen to global theme changes
    window.addEventListener('themeChange', (event: any) => {
      this.setMonacoTheme(event.detail);
    });

    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme === 'dark' ? 'vs-dark' : 'vs-light';
    this.setMonacoTheme(theme);
  }

  initForm(): void {
    this.requestForm = this.fb.group({
      url: ['https://simple-books-api.glitch.me', [Validators.required]],
      method: [HttpMethod.GET, [Validators.required]],
      body: ['{\n  "key": "value"\n}']
    });

    // React to method changes to update body validation
    this.requestForm.get('method')?.valueChanges.subscribe(method => {
      if (method === HttpMethod.GET) {
        this.requestForm.get('body')?.disable();
      } else {
        this.requestForm.get('body')?.enable();
      }
    });
  }

  // Method to update editor language dynamically
  updateBodyEditorLanguage(type: 'none' | 'json' | 'text' | 'form'): void {
    let language: string;
    switch (type) {
      case 'json':
        language = 'json';
        break;
      case 'text':
        language = 'plaintext';
        break;
      case 'form':
        language = 'plaintext'; // Or 'xml', 'html' if you expect certain form data formats
        break;
      case 'none':
      default:
        language = 'plaintext';
        break;
    }
    // Create a new options object to trigger change detection in ngx-monaco-editor
    this.bodyEditorOptions = { ...this.bodyEditorOptions, language: language };
  }

  setMonacoTheme(theme: 'vs-light' | 'vs-dark') {
    this.bodyEditorOptions = {
      ...this.bodyEditorOptions,
      theme
    };
  }


  setupDefaultHeaders(): void {
    this.headers = [
      { key: 'Content-Type', value: 'application/json', enabled: true },
      { key: 'Accept', value: 'application/json', enabled: true },
      { key: '', value: '', enabled: true }
    ];
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

    // Clear any previous response data
    this.responseService.clearResponseData();

    const formValue = this.requestForm.value;
    let body = null;

    // Try to parse the JSON body if it's not empty and not a GET request and bodyType is JSON
    if (formValue.method !== HttpMethod.GET && this.bodyType === 'json' && formValue.body && formValue.body.trim()) {
      try {
        body = JSON.parse(formValue.body);
      } catch (e) {
        console.error('Invalid JSON body', e);
        alert('The request body is not valid JSON');
        this.isLoading = false;
        return;
      }
    } else if (formValue.method !== HttpMethod.GET && (this.bodyType === 'text' || this.bodyType === 'form')) {
      body = formValue.body; // Send as plain text for 'text' or 'form' types
    }

    this.httpClientService.sendRequest(
      formValue.url,
      formValue.method,
      this.headers.filter(h => h.key.trim() !== ''),
      this.params.filter(p => p.key.trim() !== ''),
      body
    ).subscribe({
      next: (response) => {
        this.responseData = response;
        this.isLoading = false;
        console.log('Response received:', this.responseData);

        // Update the response data in the service
        this.responseService.updateResponseData(response);
      },
      error: (error) => {
        console.error('Request error', error);
        this.responseData = {
          error: true,
          message: error.message || 'An error occurred during the request',
          details: error
        };
        this.isLoading = false;

        // Also update the response service with error data
        this.responseService.updateResponseData(this.responseData);
      }
    });
  }

  sendRequestWithOptions(option1: string) {

  }
}
