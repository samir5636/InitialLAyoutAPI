import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceDetailComponent } from './workspace-detail.component';

describe('WorkspaceDetailComponent', () => {
  let component: WorkspaceDetailComponent;
  let fixture: ComponentFixture<WorkspaceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
