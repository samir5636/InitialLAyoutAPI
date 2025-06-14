import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAuthorizationComponent } from './request-authorization.component';

describe('RequestAuthorizationComponent', () => {
  let component: RequestAuthorizationComponent;
  let fixture: ComponentFixture<RequestAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestAuthorizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
