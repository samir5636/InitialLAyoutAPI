import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseTestsComponent } from './response-tests.component';

describe('ResponseTestsComponent', () => {
  let component: ResponseTestsComponent;
  let fixture: ComponentFixture<ResponseTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseTestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
